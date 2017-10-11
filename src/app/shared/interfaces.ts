import { ModuleWithProviders } from '@angular/core';

export interface ICompany {
    id?: string;
    name?: string;
}

export interface IRouting {
    routes: ModuleWithProviders;
    components: any[];
}
