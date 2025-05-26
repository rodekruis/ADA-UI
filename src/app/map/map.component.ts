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
import { geoJSON, LatLngBounds, MarkerClusterGroup } from 'leaflet';
import {
    createAdminPopup,
    createMarker,
    getAdminLayerMaximum,
    iconCreateFunction,
    LeafletPane,
} from './map.utils';
import {
    leafletOptions,
    layerErrorMessageDelimiter,
    assessmentAreaFitBoundsOptions,
    FIT_BOUNDS_DELAY,
} from './map.config';
import { LegendService } from './legend.service';
import { ApiService } from '../api.service';
import { Event } from '../event/event.type';
import { Layer, LayerName } from '../layer/layer.type';
import { adminLayerStyle, getLayerStyle } from './layer.style';
import { TOAST_OPTIONS, TOAST_DELAY } from '../app.config';
import { AdminLevelFill } from '../admin-level/admin-level.type';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    standalone: false,
})
export class MapComponent implements AfterViewChecked, OnChanges {
    @Input() events = [];
    @Input() event: Event;
    @Input() preview = false;
    @Input() loading = true;

    public leafletMap: L.Map;

    public leafletOptions = leafletOptions;
    public eventView = false;
    public adminDisabled = {};

    private markerClusterGroup: MarkerClusterGroup;
    private adminLayer: L.GeoJSON;
    private layers: { [layerName: string]: L.GeoJSON } = {};
    private adminLevelFill: AdminLevelFill;

    constructor(
        private menuCtrl: MenuController,
        private toastController: ToastController,
        private router: Router,
        private ngZone: NgZone,
        private apiService: ApiService,
        private legendService: LegendService,
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

    onMapReady = (leafletMapReady: L.Map) => {
        this.leafletMap = leafletMapReady;
        this.legendService.setLeafletMap(this.leafletMap);
        this.leafletMap.createPane(LeafletPane.adminArea);
        this.leafletMap.createPane(LeafletPane.assessmentArea);
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
            this.onAdminChange(LayerName.admin1);
        } else if (this.adminLayer) {
            Object.keys(this.layers).forEach(this.removeLayer);
            this.onAdminFillChange(null);
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

    onAdminChange = (adminLayerName: LayerName) => {
        this.loading = true;
        this.apiService
            .getLayer(this.event.id, adminLayerName)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe(
                (adminLayer) => this.onGetAdminLayer(adminLayer),
                (error) => this.onGetLayerError(adminLayerName, error),
            );
    };

    onGetAdminLayer = (adminLayer: Layer) => {
        if (this.adminLayer) {
            this.leafletMap.removeLayer(this.adminLayer);
            this.adminLayer = null;
        }

        this.adminLayer = geoJSON(adminLayer.geojson, {
            pane: LeafletPane.adminArea,
            onEachFeature: (feature, element) => {
                element.bindPopup(createAdminPopup(feature.properties));
                element.on('click', (leafletMouseEvent: L.LeafletMouseEvent) =>
                    element.openPopup(leafletMouseEvent.latlng),
                );
            },
        });
        this.onAdminFillChange(this.adminLevelFill);
        this.leafletMap.addLayer(this.adminLayer);
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
            this.removeLayer(layer.name);
        } else {
            this.layers[layer.name] = geoJSON(layer.geojson, {
                interactive: layer.name !== LayerName.assessmentArea,
                style: getLayerStyle(layer.name),
                pane:
                    layer.name === LayerName.assessmentArea
                        ? LeafletPane.assessmentArea
                        : LeafletPane.overlay,
            });
            this.leafletMap.addLayer(this.layers[layer.name]);
            this.legendService.showLegend(layer.name);

            if (layer.name === LayerName.assessmentArea) {
                const latLngBounds = this.layers[layer.name].getBounds();
                this.zoomToLayer(latLngBounds);
            }
        }
    };

    zoomToLayer = (latLngBounds: LatLngBounds) => {
        this.leafletMap.invalidateSize();
        setTimeout(() => {
            this.leafletMap.fitBounds(
                latLngBounds,
                assessmentAreaFitBoundsOptions,
            );
        }, FIT_BOUNDS_DELAY);
    };

    onGetLayerError = async (layerName: LayerName, error: any) => {
        this.adminDisabled[layerName] = true;

        const message = `${error.error.message.join(
            layerErrorMessageDelimiter,
        )}: ${layerName}`;

        const toast = await this.toastController.create({
            ...TOAST_OPTIONS,
            message,
        });

        await new Promise((resolve) => {
            setTimeout(() => resolve(toast.present()), TOAST_DELAY);
        });
    };

    onAdminFillChange = (adminLevelFill: AdminLevelFill) => {
        this.adminLevelFill = adminLevelFill;

        const maximum = getAdminLayerMaximum(
            this.adminLayer.toGeoJSON() as GeoJSON.FeatureCollection,
            this.adminLevelFill,
        );
        this.adminLayer.setStyle(adminLayerStyle(this.adminLevelFill, maximum));

        if (adminLevelFill) {
            this.legendService.showAdminLegend(this.adminLevelFill, maximum);
        } else {
            this.legendService.hideAdminLegend();
        }
    };

    removeLayer = (layerName: LayerName) => {
        if (this.layers[layerName]) {
            this.leafletMap.removeLayer(this.layers[layerName]);
            this.layers[layerName] = null;
            this.legendService.hideLegend(layerName);
        }
    };
}
