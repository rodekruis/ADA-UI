import {
  Component,
  AfterViewChecked,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Map, MarkerClusterGroup } from 'leaflet';
import { createMarker, iconCreateFunction } from './map.utils';
import { Event } from '../event/event.type';
import { leafletOptions } from './map.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewChecked, OnChanges {
  @Input() events = [];
  @Input() event: Event;
  @Input() preview = false;
  @Input() loading = true;

  public leafletMap: Map;

  public leafletOptions = leafletOptions;
  public eventView = false;

  private markerClusterGroup: MarkerClusterGroup;

  constructor() {}

  ngAfterViewChecked() {
    // Trigger a resize to fill the container-element:
    window.dispatchEvent(new UIEvent('resize'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.leafletMap) {
      return;
    }

    if ('events' in changes) {
      this.loadEvents();
    }

    if ('event' in changes) {
      this.onEventChange();
    }
  }

  onMapReady = (leafletMapReady: Map) => {
    this.leafletMap = leafletMapReady;
  };

  onEventChange = () => {
    this.eventView =
      !this.preview && this.event && Object.keys(this.event).length > 0;

    if (this.leafletMap) {
      this.toggleMarkerClusterGroup();
    }

    if (!this.eventView && this.event && this.event.marker) {
      this.openEventPopup();
    }
  };

  loadEvents = () => {
    const markerClusterGroupOptions = { iconCreateFunction };

    this.markerClusterGroup = new MarkerClusterGroup(markerClusterGroupOptions);

    this.events.forEach((event: Event) => {
      event.marker = createMarker(event);
      this.markerClusterGroup.addLayer(event.marker);
    });

    this.leafletMap.addLayer(this.markerClusterGroup);

    this.event = this.events.find((event: Event) => event.id === this.event.id);
    this.onEventChange();
  };

  openEventPopup = () => {
    // https://github.com/Leaflet/Leaflet.markercluster/issues/72#issuecomment-9020739
    this.markerClusterGroup.zoomToShowLayer(this.event.marker, () => {
      this.event.marker.openPopup();
    });
  };

  toggleMarkerClusterGroup = () => {
    if (this.eventView) {
      if (this.leafletMap.hasLayer(this.markerClusterGroup)) {
        this.leafletMap.removeLayer(this.markerClusterGroup);
      }
    } else {
      if (!this.leafletMap.hasLayer(this.markerClusterGroup)) {
        this.leafletMap.addLayer(this.markerClusterGroup);
      }
    }
  };
}
