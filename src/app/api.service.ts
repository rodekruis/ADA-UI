import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ROOT_URL, SESSION_STORAGE_TOKEN_KEY } from './app.config';
import { Event } from './event/event.type';
import { Layer, LayerName } from './layer/layer.type';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {}

    getLayer(eventId: string, layerName: LayerName): Observable<Layer> {
        return this.http.get<Layer>(
            this.rootUrl(`/events/${eventId}/layers/${layerName}`),
            { headers: this.getHeaders() },
        );
    }

    rootUrl = (url: string) => `${API_ROOT_URL}${url}`;

    getHeaders = () => {
        const headers = new HttpHeaders();
        return headers.set(
            'Authorization',
            `Bearer ${sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY)}`,
        );
    };

    getEvents = (): Observable<Event[]> =>
        this.http.get<Event[]>(this.rootUrl('/events'), {
            params: { sort: '-startDate' },
        });

    getEventToken = (
        eventId: string,
        code: string,
    ): Observable<{ message: string }> =>
        this.http.post<{ message: string }>(
            this.rootUrl(`/events/${eventId}/code`),
            { code },
        );

    getEvent = (eventId: string): Observable<Event> =>
        this.http.get<Event>(this.rootUrl(`/events/${eventId}`), {
            headers: this.getHeaders(),
        });

    getLayers = (eventId: string): Observable<Layer[]> =>
        this.http.get<Layer[]>(this.rootUrl(`/events/${eventId}/layers`), {
            headers: this.getHeaders(),
        });
}
