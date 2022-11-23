import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, finalize, map } from 'rxjs/operators';
import { Event } from './event.type';
import { isRecent } from './event.utils';
import { rootRoute } from '../app.router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  public events: Event[] = [];
  public event: Event;
  public preview = false;
  public loading = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => rootRoute(this.activatedRoute))
      )
      .subscribe(this.onRouteChange);

    this.getEvents();
  }

  onRouteChange = (route: ActivatedRoute) => {
    this.preview = route.snapshot.queryParamMap.get('preview') === 'true';

    const eventId = route.snapshot.paramMap.get('eventId');
    this.event = {
      ...this.events.find((event: Event) => event.id === eventId),
    };
  };

  getEvents = () => {
    this.loading = true;
    this.apiService
      .getEvents()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((events) => this.onGetEvents(events));
  };

  onGetEvents = (events: Event[]) => {
    this.events = events.map((a: Event) => ({
      ...a,
      recent: isRecent(a.startDate),
    }));

    this.onRouteChange(rootRoute(this.activatedRoute));
  };
}
