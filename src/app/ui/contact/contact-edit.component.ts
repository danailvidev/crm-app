import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/contact.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../../shared/interfaces/contact';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';
import { CompanyService } from '../../core/company.service';
import { ICompany } from '../../shared/interfaces/company';

@Component({
  selector: 'dv-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  companies$: Observable<ICompany[]>;
  isNewContact: boolean;
  contactKey: string;
  contact = {name: ''} as IContact;
  selectedCompany: IContact;
  contactCompanies = [];

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private companyService: CompanyService) {

  }

  ngOnInit() {
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    if (!this.isNewContact) {
      this.getContact(this.contactKey);
    }
    this.companies$ = this.companyService.getCompanies();
  }

  getContact(key) {
    this.contactService.getContact(key)
      .subscribe((contact) => {
        this.contact = contact;
        this.setContactCompanies();
      });
  }

  setContactCompanies() {
    if (this.contact.contactCompanies == null) { this.contact.contactCompanies = {}; }
    this.contactCompanies = Object.keys(this.contact.contactCompanies).map(key => this.contact.contactCompanies[key]);
  }

  saveContact(contact) {
    const save = this.isNewContact
      ? this.contactService.saveContact(contact)
      : this.contactService.updateContact(contact);

    save.then(_ => this.location.back()); // or this.router.navigate([`contact-list`]);
  }

  deleteContact(compny) {
    this.contactService.deleteContact(compny)
      .then(_ => this.location.back());
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }
}
