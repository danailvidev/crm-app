import { Component, Input } from '@angular/core';

@Component({
  selector: 'dv-loading-spinner',
  template: `<mat-spinner *ngIf="loading" color="accent"></mat-spinner>`
})
export class LoadingSpinnerComponent {
  @Input() loading: boolean;

}
