import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { events, layers } from './mock';
import { Event } from './event/event.type';
import { Layer } from './layer/layers.type';

const TIMEOUT_MILLISECONDS = 3000;

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
}
