import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ICompany } from '../shared/interfaces/company';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {
    companies$: FirebaseListObservable<ICompany[]>;

    constructor(public db: AngularFireDatabase) {
        this.companies$ = this.db.list(`companies`, {});
    }

    getCompany(companyKey: string) {
        return this.db.object(`/companies/${companyKey}`);
    }

    saveCompany(company: ICompany) {
        this.companies$.push(company)
            .then(_ => console.log('success save'))
            .catch(this.handleError);
    }
    updateCompany(company: ICompany) {
        this.companies$.update(company.$key, company)
            .then(_ => console.log('success update'))
            .catch(this.handleError);
    }
    deleteCompany(company: ICompany) {
        this.companies$.remove(company.$key)
            .then(_ => console.log('success delete'))
            .catch(this.handleError);
    }

    getCompanies() {
        return this.companies$;
    }
    private handleError(error: any) {
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
