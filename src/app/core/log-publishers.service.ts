import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApiFire } from './log-publishers';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class LogPublisherService {
    constructor(private fireDb: AngularFireDatabase, private http: Http) {
        this.buildPublishers();
    }

    publishers: LogPublisher[] = [];

    buildPublishers(): void {
        let logPub: LogPublisher;

        this.getLoggers().subscribe(res => {
            res.forEach(pub => {
                if (pub.isActive === true) {
                    switch (pub.loggerName.toLowerCase()) {
                        case 'console':
                            logPub = new LogConsole();
                            break;
                        case 'localstorage':
                            logPub = new LogLocalStorage();
                            break;
                        case 'webapifire':
                            logPub = new LogWebApiFire(this.fireDb);
                            break;
                    }

                    // Set the location
                    logPub.location = pub.loggerLocation;
                    // Add publisher to the array
                    this.publishers.push(logPub);
                }
            });
        });
    }

    getLoggers(): any {
        return Observable.of(environment.logging);

    }

    private handleError(error) {
        // error service code
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'json server error');
    }
}
