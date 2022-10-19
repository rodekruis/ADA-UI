import { Component, AfterViewChecked } from '@angular/core';
import { latLng, tileLayer, Map } from 'leaflet';

const LEAFLET_MAP_URL_TEMPLATE =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const LEAFLET_MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">Carto</a>';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewChecked {
  public map: Map;

  leafletOptions = {
    layers: [
      tileLayer(LEAFLET_MAP_URL_TEMPLATE, {
        maxZoom: 18,
        attribution: LEAFLET_MAP_ATTRIBUTION,
      }),
    ],
    zoom: 16,
    center: latLng(40.6333389, 14.6028963),
  };

  constructor() {}

  ngAfterViewChecked(): void {
    // Trigger a resize to fill the container-element:
    window.dispatchEvent(new UIEvent('resize'));
  }

  onMapReady(map: Map) {
    this.map = map;
  }
}
