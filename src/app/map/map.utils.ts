import { formatDate } from '@angular/common';
import {
  divIcon,
  latLng,
  marker,
  Marker,
  MarkerCluster,
  Point,
  point,
} from 'leaflet';
import { Event, EventAccess } from '../event/event.type';

const MARKER_CLUSTER_SIZE_WEIGHT = 20;

const isRecentEventInCluster = (cluster: MarkerCluster) =>
  cluster
    .getAllChildMarkers()
    .findIndex((clusterMarker: Marker) =>
      clusterMarker.options.icon.options.className.includes('recent')
    ) >= 0;

export const markerClusterIconCreateFunction = (cluster: MarkerCluster) =>
  divIcon({
    html: '<b>' + cluster.getChildCount() + '</b>',
    className:
      'event-cluster' + (isRecentEventInCluster(cluster) ? ' recent' : ''),
    iconSize: point(
      cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT,
      cluster.getChildCount() * MARKER_CLUSTER_SIZE_WEIGHT
    ),
  });

const createEventMarkerPopupHeader = (
  event: Event
) => `<ion-header class="ion-no-border">
<ion-toolbar color="${
  event.recent ? 'danger' : 'ibf-primary'
}" class="font-montserrat">
  <div class="title text-bold">
    ${event.type} ${event.name}
  </div>
  <div class="subtitle">
    ${formatDate(event.startDate, 'mediumDate', 'en-US')}
  </div>
  <ion-buttons slot="end">
    <ion-button class="close-button">
      <ion-icon slot="icon-only" name="close"></ion-icon>
    </ion-button>
  </ion-buttons>
</ion-toolbar>
</ion-header>`;

const createEventMarkerPopupFooter = (
  event: Event
) => `<ion-footer class="ion-no-border">
<ion-toolbar color="${event.recent ? 'danger' : 'ibf-primary'}">
  <ion-text slot="end">
    Access: <b>${
      event.access === EventAccess.private ? 'Restricted' : event.access
    }</b>
    <ion-icon name="${
      event.access === EventAccess.private ? 'eye-off' : 'eye'
    }" size="small"></ion-icon>
  </ion-text>
</ion-toolbar>
</ion-footer>`;

const createEventMarkerPopupContent = (
  event: Event
) => `<div class="content ion-padding">${
  event.access === EventAccess.private
    ? '<div>Enter the access code to view the damage assessment. \
  <ion-item> \
    <ion-input type="password" placeholder="Enter the access code"></ion-input> \
    <ion-note slot="error"><ion-icon name="warning-outline"></ion-icon> Incorrect Code</ion-note> \
  </ion-item> \
</div>'
    : '<div>Click the "View Event" button to view the damage assessment.</div>'
}
<ion-button
  expand="block"
  fill="solid"
  shape="round"
  color="ibf-primary"
  disabled="${event.access === EventAccess.private}"
  href="/event/${event.id}"
  >View Event</ion-button>
</div>`;

const createEventMarkerPopup = (event: Event) => `<article>
${createEventMarkerPopupHeader(event)}
${createEventMarkerPopupContent(event)}
${createEventMarkerPopupFooter(event)}
</article>`;

const onPopupOpen = (popupOpenEvent) =>
  popupOpenEvent.target
    .getPopup()
    .getElement()
    .querySelector('.close-button')
    .addEventListener('click', () => {
      popupOpenEvent.target.closePopup();
    });

export const createEventMarker = (event: Event) =>
  marker(latLng.apply(this, event.geometry.coordinates), {
    icon: divIcon({
      className: 'event-marker' + (event.recent ? ' recent' : ''),
      iconSize: point(25, 41),
    }),
  })
    .bindPopup(createEventMarkerPopup(event), {
      className: 'event-marker-popup' + (event.recent ? ' recent' : ''),
      autoPanPadding: new Point(64, 256),
      closeButton: false,
    })
    .on('popupopen', onPopupOpen);

export default { markerClusterIconCreateFunction, createEventMarker };
