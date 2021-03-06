import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { IContact } from '../shared/interfaces/contact';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
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
        const updateContact = {};
        updateContact[`contacts/${contact.$key}`] = contact;
        Object.keys(contact.contactCompanies).forEach(companyKey => {
            updateContact[`companyContacts/${companyKey}/${contact.$key}`] = {name: contact.name};
        });
        return this.db.object('/').update(updateContact)
            .then(_ => console.log('success update'))
            .catch(this.handleError);
    }

    deleteContact(contact: IContact) {
        const deleteContact = {};
        deleteContact[`contacts/${contact.$key}`] = null;
        Object.keys(contact.contactCompanies).forEach(companyKey => {
            deleteContact[`companyContacts/${companyKey}/${contact.$key}`] = null;
        });
        return this.db.object('/').update(deleteContact)
            .then(_ => console.log('success delete'))
            .catch(this.handleError);
    }

    getContacts() {
        return this.subject$
            .switchMap(companyKey => companyKey === undefined
                ? this.contacts$
                : this.db.list(`companyContacts/${companyKey}`))
            .catch(this.handleError);
    }

    // obs$: Observable<Observable[]>
    companyContactsJoin(companyKey) {
        return this.db.list(`companyContacts/${companyKey}`)
            .map(contactKeys => contactKeys
                .map(contact => this.db.object(`contacts/${contact.$key}`)))
            .switchMap(contactObsArray => contactObsArray.length >= 1
                ? Observable.combineLatest(contactObsArray)
                : Observable.of([]))
            .catch(this.handleError);
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
