import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/company.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICompany } from '../../shared/interfaces/company';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/app-state';
import * as companyActions from './../../actions/company.actions';

@Component({
  selector: 'dv-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  companyKey: string;
  company$: FirebaseObjectObservable<ICompany>;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.companyKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    this.isNewCompany ? this.company$ = Observable.of({}) as FirebaseObjectObservable<ICompany> : this.getCompany(this.companyKey);
  }

  getCompany(key) {
    this.company$ = this.companyService.getCompany(key);
  }

  saveCompany(company) {
    const save = this.isNewCompany
      ? this.companyService.saveCompany(company)
      : this.companyService.updateCompany(company);

    save.then(_ => this.location.back()); // or this.router.navigate([`company-list`]);
  }

  deleteCompany(company) {
    this.store.dispatch(new companyActions.DeleteCompanyAction(company));
    // this.companyService.deleteCompany(compny)
    //   .then(_ => this.location.back());
  }
}
