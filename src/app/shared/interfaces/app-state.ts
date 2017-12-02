import { ICompany } from './company';
import { IContact } from './contact';

export interface AppState {
    companies: ICompany[];
    contacts: IContact[];
}
