import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { OverlayContainer } from '@angular/cdk/overlay';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = null;
  theme = 'black-theme';
  logo = require('../assets/angular-white-transparent.svg');
  checked = false;
  navigation = [
    { link: 'about', label: 'About' },
    { link: 'features', label: 'Features' },
    { link: 'examples', label: 'Examples' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  @HostBinding('class') componentCssClass;

  constructor(
    private db: AngularFireDatabase,
    public overlayContainer: OverlayContainer) {

    const observable = this.db.object(`test`);

    observable
      .take(1)
      .subscribe({
        next: value => this.title = value.$value,
        error: err => console.log('error' + err),
        complete: () => console.log('done')
      });
  }

  ngOnInit(): void {
    this.setTheme(this.theme);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  setTheme(theme) {
    this.theme = theme;
    this.componentCssClass = theme;
    this.overlayContainer.getContainerElement().classList.add(theme);
  }

  switchTheme(event) {
    if (event.checked === true) {
      this.theme = 'light-theme';
      this.setTheme(this.theme);
    } else {
      this.theme = 'black-theme';
      this.setTheme(this.theme);
    }
  }
}
