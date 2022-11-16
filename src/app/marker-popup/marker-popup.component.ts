import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Event, EventAccess } from '../event/event.type';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
})
export class MarkerPopupComponent implements OnInit {
  @Input() event: Event;

  @HostBinding('class.recent') recent = false;

  public restricted = false;
  public startDate: string;

  constructor() {}

  ngOnInit() {
    this.recent = this.event.recent;
    this.restricted = this.event.access === EventAccess.private;
    this.startDate = formatDate(this.event.startDate, 'mediumDate', 'en-US');
  }
}
