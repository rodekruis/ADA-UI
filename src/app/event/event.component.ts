import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Event } from './event.type';
import { isRecent } from './event.utils';
import { rootRoute } from '../app.router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  public events: Event[];
  public event: Event;
  public preview = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.events = [
      {
        id: '13de0f11-e3bf-4d93-bd56-9300194452e9',
        createdAt: '2022-10-31T14:45:59.173Z',
        updatedAt: '2022-10-31T14:45:59.173Z',
        version: 1,
        name: 'ANA',
        type: 'Storm',
        country: 'Mozambique',
        geometry: { type: 'Point', coordinates: [-25.9704569, 32.5727348] },
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
        geometry: { type: 'Point', coordinates: [-1.5220377, 29.2406804] },
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
        geometry: { type: 'Point', coordinates: [33.8908586, 35.4945584] },
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
        geometry: { type: 'Point', coordinates: [14.6152545, 121.0052082] },
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
        geometry: { type: 'Point', coordinates: [18.0291075, -63.0591] },
        startDate: '2021-12-31T00:00:00.000Z',
        endDate: '2021-12-31T00:00:00.000Z',
        access: 'Private',
      },
    ]
      .sort((a: Event, b: Event) => {
        const aStartDate = new Date(a.startDate) as any;
        const bStartDate = new Date(b.startDate) as any;
        return bStartDate - aStartDate;
      })
      .map((a: Event) => ({ ...a, recent: isRecent(a.startDate) }));
  }

  ngOnInit() {
    this.onRouteChange(rootRoute(this.activatedRoute));

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => rootRoute(this.activatedRoute))
      )
      .subscribe(this.onRouteChange);
  }

  onRouteChange = (route: ActivatedRoute) => {
    this.preview = route.snapshot.queryParamMap.get('preview') === 'true';

    const eventId = route.snapshot.paramMap.get('eventId');
    this.event = {
      ...this.events.find((event: Event) => event.id === eventId),
    };
  };
}
