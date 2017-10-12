import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/company.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ICompany } from '../../shared/interfaces/company';
import 'rxjs/add/observable/of';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService) {

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
    this.isNewCompany ? this.companyService.saveCompany(company) : this.companyService.updateCompany(company);
  }

  deleteCompany(compny) {
    this.companyService.deleteCompany(compny);
  }
}
