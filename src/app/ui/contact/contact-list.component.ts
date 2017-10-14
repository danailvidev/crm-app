import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/contact.service';
import { IContact } from '../../shared/interfaces/contact';
import { CompanyService } from '../../core/company.service';
import { ICompany } from '../../shared/interfaces/company';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dv-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  companies$: Observable<ICompany[]>;
  contacts$: Observable<IContact[]>;

  constructor(
    public contactService: ContactService,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.getContacts();
    this.getCompanies();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }
}
