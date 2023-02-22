import { NgElement, WithProperties } from '@angular/elements';
import {
    divIcon,
    latLng,
    Layer,
    marker,
    Marker,
    MarkerCluster,
    point,
} from 'leaflet';
import kebabCase from 'lodash.kebabcase';
import {
    markerIconSize,
    markerPopupOptions,
    MARKER_CLUSTER_SIZE_WEIGHT,
} from './map.config';
import { formatNumber, formatPercentage } from '../app.utils';
import {
    AdminLevelFill,
    adminLevelFillLabel,
} from '../admin-level/admin-level.type';
import { Event } from '../event/event.type';
import { MarkerPopupComponent } from '../marker-popup/marker-popup.component';

export const enum LeafletPane {
    overlay = 'overlayPane',
    assessmentArea = 'assessment-area',
    adminArea = 'admin-area',
}

const isRecentEventInCluster = (cluster: MarkerCluster) =>
    cluster
        .getAllChildMarkers()
        .findIndex((clusterMarker: Marker) =>
            clusterMarker.options.icon.options.className.includes('recent'),
        ) >= 0;

export const iconCreateFunction = (cluster: MarkerCluster) =>
    divIcon({
        html: '<b>' + cluster.getChildCount() + '</b>',
        className: `marker-cluster ${
            isRecentEventInCluster(cluster) ? 'recent' : ''
        }`,
        iconSize: point(
            cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT,
            cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT,
        ),
    });

const createMarkerPopup = (event: Event) => (layer: Layer) => {
    const markerPopupElement: NgElement & WithProperties<MarkerPopupComponent> =
        document.createElement('marker-popup-element') as any;

    markerPopupElement.addEventListener('closed', () =>
        document.body.removeChild(markerPopupElement),
    );
    markerPopupElement.event = event;

    document.body.appendChild(markerPopupElement);
    return markerPopupElement;
};

export const createMarker = (event: Event, onMarkerClick: () => void) =>
    marker(latLng.apply(this, event.geometry.coordinates), {
        icon: divIcon({
            className: `marker marker-${kebabCase(event.type)} ${
                event.recent ? 'recent' : ''
            }`,
            iconSize: markerIconSize,
        }),
    })
        .on('click', onMarkerClick)
        .bindPopup(createMarkerPopup(event), markerPopupOptions);

export const createAdminPopup = (
    properties: GeoJSON.GeoJsonProperties,
) => `<div class="ion-padding line-height-1-8">
    <ion-label class="text-bold">${properties.name}</ion-label><br />
    <ion-label>${
        adminLevelFillLabel[AdminLevelFill.peopleAffected]
    }: ${formatNumber(
    properties[AdminLevelFill.peopleAffected],
)}</ion-label><br />
    <ion-label>${
        adminLevelFillLabel[AdminLevelFill.peopleAffectedPercentage]
    }: ${formatPercentage(
    properties[AdminLevelFill.peopleAffectedPercentage],
)}</ion-label><br />
    <ion-label>${
        adminLevelFillLabel[AdminLevelFill.buildingDamage]
    }: ${formatNumber(
    properties[AdminLevelFill.buildingDamage],
)}</ion-label><br />
    <ion-label>${
        adminLevelFillLabel[AdminLevelFill.buildingDamagePercentage]
    }: ${formatPercentage(
    properties[AdminLevelFill.buildingDamagePercentage],
)}</ion-label>
    </div>`;

export const getAdminLayerMaximum = (
    geojson: GeoJSON.FeatureCollection,
    property: string,
) =>
    Math.max(
        1,
        ...geojson.features.map(
            (feature) => feature.properties[property] as number,
        ),
    );

export default {
    iconCreateFunction,
    createMarker,
    createAdminPopup,
    getAdminLayerMaximum,
};
