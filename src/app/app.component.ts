import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
    public overlayContainer: OverlayContainer) {
  }

  ngOnInit(): void {
    this.setTheme(this.theme);
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
