import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public sideMenu = $localize`ADA`;
  public name = $localize`Automated Damage Assessment`;

  constructor() {}
}
