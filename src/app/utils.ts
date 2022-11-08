import { divIcon, latLng, marker, Marker, MarkerCluster, point } from 'leaflet';

const RECENT_WINDOW = 365; // 60

export const isRecent = (date: string | number | Date) => {
  const today = new Date();
  const eventDate = new Date(date);

  const daysSince = Math.floor(
    (today.getTime() - eventDate.getTime()) / 1000 / 60 / 60 / 24
  );

  return daysSince < RECENT_WINDOW;
};

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

const createEventMarkerPopup = (
  event
): string => `<div>${event.type} ${event.name}</div>
<div>${event.startDate}</div>
<div>${event.isRecent}</div>
<div>${event.access}</div>`;

export const createEventMarker = (event) =>
  marker(latLng(event.geometry.coordinates), {
    icon: divIcon({
      className: 'event-marker' + (event.isRecent ? ' recent' : ''),
      iconSize: point(25, 41),
    }),
  }).bindPopup(createEventMarkerPopup(event), {
    className: 'event-marker-popup',
  });

export default { isRecent, markerClusterIconCreateFunction, createEventMarker };
