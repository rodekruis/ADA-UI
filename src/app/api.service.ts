import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { events, layers } from './mock';
import { Event } from './event/event.type';
import { Layer } from './layer/layers.type';

const TIMEOUT_MILLISECONDS = 3000;
const EVENT_CODE = 'qwerty';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getEvents = (): Observable<Event[]> =>
    new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(events);
        subscriber.complete();
      }, TIMEOUT_MILLISECONDS);
    });

  getLayers = (eventId: string): Observable<Layer[]> =>
    new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(layers);
        subscriber.complete();
      }, TIMEOUT_MILLISECONDS);
    });

  getEventToken = (eventId: string, code: string): Observable<string> =>
    new Observable((subscriber) => {
      setTimeout(() => {
        if (code === EVENT_CODE) {
          subscriber.next(`$ey${eventId}x${code}x${code}x`);
          subscriber.complete();
        } else {
          subscriber.error('Event Code is invalid');
        }
      }, TIMEOUT_MILLISECONDS);
    });

  getEvent = (eventId: string): Observable<Event> =>
    new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(events.find((event) => (event.id = eventId)));
        subscriber.complete();
      }, TIMEOUT_MILLISECONDS);
    });
}
