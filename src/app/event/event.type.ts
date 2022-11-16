import { Marker } from 'leaflet';

export enum EventType {
  typhoon = 'Typhoon',
  hurricane = 'Hurricane',
  storm = 'Storm',
  explosion = 'Explosion',
}

export enum EventAccess {
  public = 'Public',
  private = 'Private',
}

export class Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  name: string;
  type: EventType;
  country: string;
  geometry: GeoJSON.Point;
  startDate: string;
  endDate: string | null;
  access: EventAccess;
  recent?: boolean;
  marker?: Marker;
}
