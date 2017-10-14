import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { IContact } from '../shared/interfaces/contact';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
    contacts$: FirebaseListObservable<IContact[]>;
    subject$ = new BehaviorSubject<string>(undefined);

    constructor(public db: AngularFireDatabase) {
        this.contacts$ = this.db.list(`contacts`);
    }

    getContact(contactKey: string) {
        return this.db.object(`/contacts/${contactKey}`);
    }

    saveContact(contact: IContact) {
        return this.contacts$.push(contact)
            .then(_ => console.log('success save'))
            .catch(this.handleError);
    }

    updateContact(contact: IContact) {
        return this.contacts$.update(contact.$key, contact)
            .then(_ => console.log('success update'))
            .catch(this.handleError);
    }

    deleteContact(contact: IContact) {
        return this.contacts$.remove(contact.$key)
            .then(_ => console.log('success delete'))
            .catch(this.handleError);
    }

    getContacts() {
        return this.db.list(`contacts`, {
            query: {
                orderByChild: 'companyKey',
                equalTo: this.subject$
            }
        });
    }

    private handleError(error) {
        // error service code
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'json server error');
    }
}
