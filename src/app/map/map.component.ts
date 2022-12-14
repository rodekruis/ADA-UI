import {
    Component,
    AfterViewChecked,
    Input,
    OnChanges,
    SimpleChanges,
    NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { geoJSON, Map, MarkerClusterGroup, FeatureGroup } from 'leaflet';
import { createMarker, iconCreateFunction } from './map.utils';
import { adminLayerStyle, leafletOptions } from './map.config';
import { ApiService } from '../api.service';
import { Event } from '../event/event.type';
import { Layer, LayerName } from '../layer/layers.type';

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
    public adminDisabled = {};

    private markerClusterGroup: MarkerClusterGroup;
    private adminLayer: FeatureGroup;

    constructor(
        private menuCtrl: MenuController,
        private router: Router,
        private ngZone: NgZone,
        private apiService: ApiService,
    ) {}

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
        this.adminDisabled = {};

        this.eventView =
            !this.preview && this.event && Object.keys(this.event).length > 0;

        if (this.leafletMap && this.markerClusterGroup) {
            this.toggleMarkerClusterGroup();
        }

        if (!this.eventView && this.event && this.event.marker) {
            this.openEventPopup();
        }

        this.menuCtrl.close();

        if (this.eventView) {
            this.onAdminChange({ detail: { value: LayerName.admin1 } });
        } else if (this.adminLayer) {
            this.leafletMap.removeLayer(this.adminLayer);
            delete this.adminLayer;
        }
    };

    loadEvents = () => {
        const markerClusterGroupOptions = { iconCreateFunction };

        this.markerClusterGroup = new MarkerClusterGroup(
            markerClusterGroupOptions,
        );

        this.events.forEach((event: Event) => {
            event.marker = createMarker(event, () =>
                this.ngZone.run(() =>
                    this.router.navigate(['/events', event.id], {
                        queryParams: { preview: true },
                    }),
                ),
            );
            this.markerClusterGroup.addLayer(event.marker);
        });

        this.leafletMap.addLayer(this.markerClusterGroup);

        this.event = this.events.find(
            (event) => this.event && event.id === this.event.id,
        );
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
                this.leafletMap.setView(
                    leafletOptions.center,
                    leafletOptions.zoom,
                );
            }
        }
    };

    onAdminChange = (adminChangeEvent: any) => {
        this.loading = true;
        this.apiService
            .getLayer(this.event.id, adminChangeEvent.detail.value)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (adminLayer) => this.onGetAdminLayer(adminLayer),
                () => this.onGetAdminLayerError(adminChangeEvent.detail.value),
            );
    };

    onGetAdminLayer = (adminLayer: Layer) => {
        let isInitialLoad = true;

        if (this.adminLayer) {
            this.leafletMap.removeLayer(this.adminLayer);
            isInitialLoad = false;
        }

        this.adminLayer = geoJSON(adminLayer.geojson, {
            style: adminLayerStyle,
        });
        this.leafletMap.addLayer(this.adminLayer);

        if (isInitialLoad && adminLayer.name === LayerName.admin1) {
            this.leafletMap.fitBounds(this.adminLayer.getBounds());
        }
    };

    onGetAdminLayerError = (layerName: LayerName) =>
        (this.adminDisabled[layerName] = true);
}
