import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CompanyService } from '../../core/company.service';
import { ICompany } from '../../shared/interfaces/company';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/app-state';
import * as companyActions from './../../actions/company.actions';

@Component({
  selector: 'dv-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<ICompany[]>;

  constructor(private store: Store<AppState>) {
    this.companies$ = this.store.select(state => state.companies);
  }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.store.dispatch(new companyActions.LoadCompaniesAction());
  }

}
