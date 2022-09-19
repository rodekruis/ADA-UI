import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public sideMenu = 'ADA';
  public name = 'Automated Damage Assessment';

  constructor() {}
}
