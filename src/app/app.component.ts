import { Component } from '@angular/core';
import { isRecent } from './utils';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public title = $localize`ADA PORTAL`;

  public events = [
    {
      id: '13de0f11-e3bf-4d93-bd56-9300194452e9',
      createdAt: '2022-10-31T14:45:59.173Z',
      updatedAt: '2022-10-31T14:45:59.173Z',
      version: 1,
      name: 'ANA',
      type: 'Storm',
      country: 'Mozambique',
      geometry: { type: 'Point', coordinates: [-18.4214294, 26.7694166] },
      startDate: '2022-01-24T00:00:00.000Z',
      endDate: null,
      access: 'Public',
    },
    {
      id: '13de0f11-e3bf-4d93-bd56-9300194452e8',
      createdAt: '2022-10-31T14:45:59.173Z',
      updatedAt: '2022-10-31T14:45:59.173Z',
      version: 1,
      name: 'Nyiragongo',
      type: 'Eruption',
      country: 'Democratic Republic of Congo',
      geometry: { type: 'Point', coordinates: [-0.6851186, 5.5534151] },
      startDate: '2021-05-22T00:00:00.000Z',
      endDate: '2023-12-31T00:00:00.000Z',
      access: 'Private',
    },
    {
      id: '13de0f11-e3bf-4d93-bd56-9300194452e7',
      createdAt: '2022-10-31T14:45:59.173Z',
      updatedAt: '2022-10-31T14:45:59.173Z',
      version: 1,
      name: 'Beirut',
      type: 'Explosion',
      country: 'Lebanon',
      geometry: { type: 'Point', coordinates: [33.8684808, 34.726183] },
      startDate: '2020-08-04T00:00:00.000Z',
      endDate: '2020-08-04T00:00:00.000Z',
      access: 'Private',
    },
    {
      id: '13de0f11-e3bf-4d93-bd56-9300194452e6',
      createdAt: '2022-10-31T14:45:59.173Z',
      updatedAt: '2022-10-31T14:45:59.173Z',
      version: 1,
      name: 'Mangut',
      type: 'Typhoon',
      country: 'Philippines',
      geometry: { type: 'Point', coordinates: [11.5563095, 113.5767003] },
      startDate: '2018-09-15T00:00:00.000Z',
      endDate: '2018-10-15T00:00:00.000Z',
      access: 'Public',
    },
    {
      id: '13de0f11-e3bf-4d93-bd56-9300194452e5',
      createdAt: '2022-10-31T14:45:59.173Z',
      updatedAt: '2022-10-31T14:45:59.173Z',
      version: 1,
      name: 'Irma',
      type: 'Hurricane',
      country: 'Sint-Maarten',
      geometry: { type: 'Point', coordinates: [52.7551415, 4.7154208] },
      startDate: '2021-12-31T00:00:00.000Z',
      endDate: '2021-12-31T00:00:00.000Z',
      access: 'Public',
    },
  ]
    .sort((a, b) => {
      const aStartDate = new Date(a.startDate) as any;
      const bStartDate = new Date(b.startDate) as any;
      return bStartDate - aStartDate;
    })
    .map((a) => ({ ...a, isRecent: isRecent(a.startDate) }));

  constructor() {}
}
