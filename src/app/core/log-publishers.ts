import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LogEntry } from './logging.service';
import { Response } from '@angular/http';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

export abstract class LogPublisher {
    location: string;

    abstract log(record: LogEntry): Observable<boolean>;
    abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
    log(record: LogEntry): Observable<boolean> {
        console.log(record.buildLogString());

        return Observable.of(true);
    }

    clear(): Observable<boolean> {
        console.clear();

        return Observable.of(true);
    }
}

export class LogLocalStorage extends LogPublisher {
    constructor() {
        super();

        this.location = 'logging';
    }

    /*
    Component method implementation:

    logEntries: LogEntry[];
    let tmp = this.logger.publishers.find(p => p.consrtuctor.name === 'LogLocalStorage')
    if (tmp != null) {
        let local = tmp as LogLocaleStorage
        local.getAll().subscribe(res => {
            this.logEntries = response;
        })
    }
    */
    getAll(): Observable<LogEntry[]> {
        let values: LogEntry[];

        // Retrieve all values from localStorage
        values = JSON.parse(localStorage.getItem(this.location)) || [];

        return Observable.of(values);
    }

    log(record: LogEntry): Observable<boolean> {
        let ret: boolean = false;
        let values: LogEntry[];

        try {
            values = JSON.parse(localStorage.getItem(this.location)) || [];
            // Add new log entry to the array
            values.push(record);
            // Store the complete array into the localStorage
            localStorage.setItem(this.location, JSON.stringify(values));
            // Set the return value
            ret = true;
        } catch (ex) {
            console.log(ex);
        }

        return Observable.of(ret);
    }

    clear(): Observable<boolean> {
        localStorage.removeItem(this.location);
        return Observable.of(true);
    }
}

export class LogWebApiFire extends LogPublisher {
    logs$: FirebaseListObservable<LogEntry[]>;
    constructor(public db: AngularFireDatabase) {
        super();

        this.location = 'logs';
        this.logs$ = this.db.list(this.location);
    }

    getAll(): Observable<LogEntry[]> {
        return this.logs$;
    }

    log(record: LogEntry): Observable<boolean> {
        const fireObj = this.firebaseMap(record);
        return this.logs$.push(fireObj)
            .then(_ => console.log(fireObj))
            .catch(this.handleError);
    }

    clear(): any {
        return this.logs$.remove()
            .then(_ => console.log('success clear logs'))
            .catch(this.handleError);
    }

    private firebaseMap(record: LogEntry): any {
        const fireObj = {
            entryDate: record.entryDate.toString(),
            message: record.message,
            level: record.level,
            extraInfo: record.extraInfo,
            logWithDate: record.logWithDate
        };

        return fireObj;
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
