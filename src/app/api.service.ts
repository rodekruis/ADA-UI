import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { events, layers } from './mock';
import { Event, EventAccess } from './event/event.type';
import { Layer } from './layer/layers.type';
import { SESSION_STORAGE_TOKEN_KEY } from './app.config';

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
        const event = events.find((_event) => _event.id === eventId);
        const adminLevelCount = event.adminLevelLabels.split(',').length;
        const allowedLayers = [
          'buildings-damage-none',
          'buildings-damage-light',
          'buildings-damage-moderate',
          'buildings-damage-heavy',
          'buildings',
          'satellite-view',
          'people-affected',
          'population-density',
          'wealth-index',
        ];
        const adminLayers = [
          'damage-admin-1',
          'damage-admin-2',
          'damage-admin-3',
          'damage-admin-4',
          'damage-admin-5',
        ];
        subscriber.next(
          layers.filter(
            (layer) =>
              allowedLayers.includes(layer.name) ||
              adminLayers.slice(0, adminLevelCount).includes(layer.name)
          )
        );
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
        const token = sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY);
        const event = events.find((_event) => _event.id === eventId);
        if (
          (event && event.access === EventAccess.public) ||
          (token && token.includes(eventId))
        ) {
          subscriber.next(events.find((_event) => _event.id === eventId));
          subscriber.complete();
        } else {
          subscriber.error('Forbidden');
        }
      }, TIMEOUT_MILLISECONDS);
    });
}
