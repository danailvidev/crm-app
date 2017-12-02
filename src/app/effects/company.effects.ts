import { Injectable } from '@angular/core';
import { CompanyService } from '../core/company.service';
import { Effect, Actions } from '@ngrx/effects';
import * as companyActions from './../actions/company.actions';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
@Injectable()
export class CompanyEffects {

    constructor(
        private companyService: CompanyService,
        private actions$: Actions,
        private router: Router) { }

    @Effect() loadCompanies$ = this.actions$
        .ofType(companyActions.LOAD_COMPANIES)
        .switchMap(() => this.companyService.getCompanies()
            .map(companies => (new companyActions.LoadCompaniesSuccessAction(companies))));

    @Effect() deleteCompany$ = this.actions$
        .ofType(companyActions.DELETE_COMPANY)
        .switchMap((action: companyActions.DeleteCompanyAction) => this.companyService.deleteCompany(action.payload)
            .then(company => (new companyActions.DeleteCompanySuccessAction(action.payload)))
        )
        .do(action => {
            this.router.navigate(['/company-list']);
        });
}
