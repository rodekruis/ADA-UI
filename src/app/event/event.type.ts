import { Marker } from 'leaflet';

export enum EventType {
  typhoon = 'Typhoon',
  hurricane = 'Hurricane',
  storm = 'Storm',
  explosion = 'Explosion',
  eruption = 'Eruption',
}

export enum EventAccess {
  public = 'Public',
  restricted = 'Restricted',
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
  peopleAffected?: number;
  buildingsDamaged?: number;
  buildingsDamagedPercentage?: number;
  adminLevelLabels?: string;
  recent?: boolean;
  marker?: Marker;
}
