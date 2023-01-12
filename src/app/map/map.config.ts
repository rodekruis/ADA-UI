import {
    tileLayer,
    latLng,
    latLngBounds,
    Point,
    point,
    icon,
    Marker,
} from 'leaflet';

const LEAFLET_MAP_URL_TEMPLATE =
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const LEAFLET_MAP_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">Carto</a>';

export const MARKER_CLUSTER_SIZE_WEIGHT = 20;

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

export const markerPopupOptions = {
    autoPanPadding: new Point(64, 256),
    closeButton: false,
};

export const markerIconSize = point(25, 41);

Marker.prototype.options.icon = icon({
    iconUrl: 'assets/map/marker.svg',
    iconSize: markerIconSize,
});
