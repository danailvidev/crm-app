import { ICompany } from '../shared/interfaces/company';
import { Action } from '@ngrx/store';
export const LOAD_COMPANIES = 'LOAD_COMPANIES;';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS;';
export const DELETE_COMPANY = 'DELETE_COMPANY;';
export const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS;';

export class LoadCompaniesAction {
    readonly type = LOAD_COMPANIES;
    constructor() { }
}

export class LoadCompaniesSuccessAction {
    readonly type = LOAD_COMPANIES_SUCCESS;
    constructor(public payload: ICompany[]) { }
}

export class DeleteCompanyAction {
    readonly type = DELETE_COMPANY;
    constructor(public payload?: ICompany) { }
}

export class DeleteCompanySuccessAction {
    readonly type = DELETE_COMPANY_SUCCESS;
    constructor(public payload?: any) { }
}

export type Action
    = LoadCompaniesAction
    | LoadCompaniesSuccessAction
    | DeleteCompanyAction
    | DeleteCompanySuccessAction;
