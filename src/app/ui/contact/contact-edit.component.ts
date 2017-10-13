import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/contact.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../../shared/interfaces/contact';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';

@Component({
  selector: 'dv-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  isNewContact: boolean;
  contactKey: string;
  contact$: FirebaseObjectObservable<IContact>;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) {

  }

  ngOnInit() {
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    this.isNewContact ? this.contact$ = Observable.of({}) as FirebaseObjectObservable<IContact> : this.getContact(this.contactKey);
  }

  getContact(key) {
    this.contact$ = this.contactService.getContact(key);
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
}
