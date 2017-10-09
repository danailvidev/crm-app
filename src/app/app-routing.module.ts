import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    // useHash supports github.io demo page, remove in your app
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
