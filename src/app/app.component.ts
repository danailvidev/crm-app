import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import 'rxjs/add/operator/take';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './core/logging.service';

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
    { link: 'company-list', label: 'Companies' },
    { link: 'contact-list', label: 'Contacts' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  @HostBinding('class') componentCssClass;

  constructor(
    public authService: AuthService,
    public overlayContainer: OverlayContainer,
    private logger: LoggingService) {
  }

  ngOnInit(): void {
    this.setTheme(this.theme);
  }

  setTheme(theme) {
    this.theme = this.componentCssClass = theme;
    this.overlayContainer.getContainerElement().classList.add(theme);
  }

  switchTheme(event) {
    event.checked === true ? this.setTheme('light-theme') : this.setTheme('black-theme');
  }

  testlog() {
    this.logger.log('msg');
  }
}
