import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../core/company.service';
import { ICompany } from '../../shared/interfaces/company';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dv-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<ICompany[]>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }

}
