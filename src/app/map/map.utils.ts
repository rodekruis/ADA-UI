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
import { Event } from '../event/event.type';
import { MarkerPopupComponent } from '../marker-popup/marker-popup.component';
import {
  markerIconSize,
  markerPopupOptions,
  MARKER_CLUSTER_SIZE_WEIGHT,
} from './map.config';

const isRecentEventInCluster = (cluster: MarkerCluster) =>
  cluster
    .getAllChildMarkers()
    .findIndex((clusterMarker: Marker) =>
      clusterMarker.options.icon.options.className.includes('recent')
    ) >= 0;

export const iconCreateFunction = (cluster: MarkerCluster) =>
  divIcon({
    html: '<b>' + cluster.getChildCount() + '</b>',
    className: `marker-cluster ${
      isRecentEventInCluster(cluster) ? 'recent' : ''
    }`,
    iconSize: point(
      cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT,
      cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT
    ),
  });

const createMarkerPopup = (event: Event) => (layer: Layer) => {
  const markerPopupElement: NgElement & WithProperties<MarkerPopupComponent> =
    document.createElement('marker-popup-element') as any;

  markerPopupElement.addEventListener('closed', () =>
    document.body.removeChild(markerPopupElement)
  );
  markerPopupElement.event = event;

  document.body.appendChild(markerPopupElement);
  return markerPopupElement;
};

export const createMarker = (event: Event, onMarkerClick: () => void) =>
  marker(latLng.apply(this, event.geometry.coordinates), {
    icon: divIcon({
      className: `marker marker-${event.type.toLowerCase()} ${
        event.recent ? 'recent' : ''
      }`,
      iconSize: markerIconSize,
    }),
  })
    .on('click', onMarkerClick)
    .bindPopup(createMarkerPopup(event), markerPopupOptions);

export default { iconCreateFunction, createMarker };
