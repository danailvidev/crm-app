import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// services
import { CompanyService, ContactService, LoggingService, LogPublisherService } from './index';
import { AuthService } from '../auth/auth.service';

// system
import { EnsureModuleLoadedOnceGuard } from '../shared/module-import-guard';
import { environment } from '../../environments/environment';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuard } from '../auth/auth.guard';


@NgModule({
    imports: [
        HttpModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule],
    providers: [
        CompanyService,
        ContactService,
        AuthService,
        AuthGuard,
        LoggingService,
        LogPublisherService
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
