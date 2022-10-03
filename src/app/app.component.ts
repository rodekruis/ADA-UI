import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public title = $localize`ADA PORTAL`;
  public summary = $localize`Summary Component`;
  public map = $localize`Map Component`;

  constructor() {}
}
