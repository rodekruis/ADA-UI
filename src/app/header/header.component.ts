import { Component, Input, OnChanges } from '@angular/core';
import { Event } from '../event/event.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() event: Event;

  public title = $localize`ADA PORTAL`;
  public showWorldView = false;

  constructor() {}

  ngOnChanges() {
    this.showWorldView = this.event && Object.keys(this.event).length > 0;
  }
}
