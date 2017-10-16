import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.user$ = this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => this.router.navigate([`/company-list`]))
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`/about`]);
  }

}
