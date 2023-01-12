import {
    Component,
    AfterViewChecked,
    Input,
    OnChanges,
    SimpleChanges,
    NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { geoJSON, Map, MarkerClusterGroup, FeatureGroup } from 'leaflet';
import { createMarker, iconCreateFunction } from './map.utils';
import { leafletOptions } from './map.config';
import { ApiService } from '../api.service';
import { Event } from '../event/event.type';
import { Layer, LayerName, layerStyle } from '../layer/layers.type';
import { TOAST_OPTIONS, TOAST_DELAY } from '../app.config';

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
    private layers: Layer[] = [];

    constructor(
        private menuCtrl: MenuController,
        private toastController: ToastController,
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
                (error) =>
                    this.onGetLayerError(adminChangeEvent.detail.value, error),
            );
    };

    onGetAdminLayer = (adminLayer: Layer) => {
        let isInitialLoad = true;

        if (this.adminLayer) {
            this.leafletMap.removeLayer(this.adminLayer);
            this.adminLayer = null;
            isInitialLoad = false;
        }

        this.adminLayer = geoJSON(adminLayer.geojson, {
            style: layerStyle[adminLayer.name],
        });
        this.leafletMap.addLayer(this.adminLayer);

        if (isInitialLoad && adminLayer.name === LayerName.admin1) {
            this.leafletMap.fitBounds(this.adminLayer.getBounds());
        }
    };

    onLayerToggle = (layerName: LayerName) => {
        this.loading = true;
        this.apiService
            .getLayer(this.event.id, layerName)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (layer) => this.onGetLayer(layer),
                (error) => this.onGetLayerError(layerName, error),
            );
    };

    onGetLayer = (layer: Layer) => {
        if (this.layers[layer.name]) {
            this.leafletMap.removeLayer(this.layers[layer.name]);
            this.layers[layer.name] = null;
        } else {
            this.layers[layer.name] = geoJSON(layer.geojson, {
                style: layerStyle[layer.name],
            });
            this.leafletMap.addLayer(this.layers[layer.name]);
        }
    };

    onGetLayerError = async (layerName: LayerName, error: any) => {
        this.adminDisabled[layerName] = true;

        const message = `${error.error.message.join('<br/>')}: ${layerName}`;

        const toast = await this.toastController.create({
            ...TOAST_OPTIONS,
            message,
        });

        await new Promise((resolve) => {
            setTimeout(() => resolve(toast.present()), TOAST_DELAY);
        });
    };
}
