import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  public events = [
    {
      name: 'Storm ANA',
      country: 'Mozambique',
      date: '24 Jan 2022',
    },
    {
      name: 'Nyiragongo Eruption',
      country: 'Democratic Republic of Congo',
      date: '22 May 2021',
    },
    {
      name: 'Beirut Explosion',
      country: 'Lebanon',
      date: '4 Aug 2020',
    },
    {
      name: 'Typhoon Mangut',
      country: 'Philippines',
      date: '15 Sep 2018',
    },
  ];

  constructor() {}
}
