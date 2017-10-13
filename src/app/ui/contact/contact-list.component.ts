import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../core/contact.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { IContact } from '../../shared/interfaces/contact';

@Component({
  selector: 'dv-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts$: FirebaseListObservable<IContact[]>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
  }

}
