import { tileLayer, latLng, latLngBounds } from 'leaflet';

const LEAFLET_MAP_URL_TEMPLATE =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const LEAFLET_MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">Carto</a>';

export const leafletOptions = {
  layers: [
    tileLayer(LEAFLET_MAP_URL_TEMPLATE, {
      maxZoom: 18,
      attribution: LEAFLET_MAP_ATTRIBUTION,
    }),
  ],
  zoom: 2,
  minZoom: 2,
  center: latLng(0, 0),
  maxBounds: latLngBounds([
    [-90, -180],
    [90, 180],
  ]),
  noWrap: true,
};
