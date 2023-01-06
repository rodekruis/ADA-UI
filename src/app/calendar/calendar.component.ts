import { Component } from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    public today = $localize`TODAY`;
    currentDate = new Date();

    public day = this.currentDate.toLocaleString('en', { weekday: 'short' });
    public date = this.currentDate.toLocaleString('en', { day: '2-digit' });
    public month = this.currentDate.toLocaleString('en', { month: 'short' });
    public year = this.currentDate.toLocaleString('en', { year: 'numeric' });

    constructor() {}
}
