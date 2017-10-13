import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './ui/about/about.component';
import { CompanyEditComponent } from './ui/company/company-edit.component';
import { CompanyListComponent } from './ui/company/company-list.component';
import { ContactListComponent } from './ui/contact/contact-list.component';
import { ContactEditComponent } from './ui/contact/contact-edit.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'company-list', component: CompanyListComponent },
    { path: 'company-edit/:id', component: CompanyEditComponent },
    { path: 'contact-list', component: ContactListComponent },
    { path: 'contact-edit/:id', component: ContactEditComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/about' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [
        AboutComponent,
        CompanyEditComponent,
        CompanyListComponent,
        ContactListComponent,
        ContactEditComponent
    ];
}
