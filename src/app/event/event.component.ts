import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { Event } from './event.type';
import { isRecent } from './event.utils';
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

    private eventsLoaded = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService,
    ) {}

    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.onRouteChange());

        this.onRouteChange();
    }

    onRouteChange = () => {
        this.preview =
            this.activatedRoute.snapshot.queryParamMap.get('preview') ===
            'true';

        const eventId = this.activatedRoute.snapshot.paramMap.get('eventId');

        // if worldView and event have not been fetched
        if ((this.preview || !eventId) && !this.eventsLoaded) {
            this.getEvents();
        } else {
            this.toggleEvent();
        }
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
        this.eventsLoaded = true;
        this.toggleEvent();
    };

    getEvent = (eventId: string) => {
        this.loading = true;
        this.apiService
            .getEvent(eventId)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (event) => this.onGetEvent(event),
                () => this.onGetEventError(),
            );
    };

    onGetEvent = (event: Event) => (this.event = event);

    onGetEventError = () => this.router.navigate(['/events']);

    toggleEvent = () => {
        const eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
        // if eventView
        if (eventId) {
            if (this.preview) {
                // use fetched event details for popup
                this.event = {
                    ...this.events.find((event) => event.id === eventId),
                };
            } else {
                // fetch event for all details
                this.getEvent(eventId);
            }
        } else {
            // clear event for worldView
            delete this.event;
        }
    };
}
