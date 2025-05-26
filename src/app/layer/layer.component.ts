import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import debounce from 'lodash.debounce';
import { finalize } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { LOADING_DEBOUNCE_WAIT } from '../app.config';
import { Event } from '../event/event.type';
import { hasEventChanged } from '../event/event.utils';
import { PopupComponent } from '../popup/popup.component';
import {
    adminLayerNames,
    defaultLayers,
    Layer,
    layerIcon,
    layerLabel,
    LayerName,
} from './layer.type';

@Component({
    selector: 'app-layer',
    templateUrl: './layer.component.html',
    styleUrls: ['./layer.component.scss'],
    standalone: false,
})
export class LayerComponent implements OnChanges {
    @Input() event: Event;
    @Input() loading = true;
    @Output() toggleLayerEventEmitter = new EventEmitter<LayerName>();

    public layers = [];
    public debouncedLoading = this.loading;

    private setLoading = debounce(
        (loading) => (this.debouncedLoading = loading),
        LOADING_DEBOUNCE_WAIT,
    );

    constructor(
        private modalCtrl: ModalController,
        private apiService: ApiService,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if ('event' in changes) {
            if (!(this.event && this.event.id)) {
                this.layers = [];
                return;
            }

            if (hasEventChanged(changes)) {
                this.getLayers();
            }
        }

        if ('loading' in changes) {
            this.setLoading(changes.loading.currentValue);
        }
    }

    async openPopup(title: string, content: string, event: MouseEvent) {
        event.stopPropagation();

        const modal = await this.modalCtrl.create({
            component: PopupComponent,
            componentProps: { title, content },
            showBackdrop: true,
        });
        modal.present();
    }

    getLayers = () => {
        this.loading = true;
        this.apiService
            .getLayers(this.event.id)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe((layers) => this.onGetLayers(layers));
    };

    onGetLayers = (layers: Layer[]) => {
        this.layers = layers
            .filter((layer) => adminLayerNames.indexOf(layer.name) < 0)
            .map((layer) => this.fillLayer(layer));
        this.toggleDefaultLayers();
    };

    toggleDefaultLayers = () =>
        this.layers
            .filter((layer) => defaultLayers.includes(layer.name))
            .forEach(this.toggleLayer);

    toggleLayer = (layer: Layer) => {
        layer.active = !layer.active;
        this.toggleLayerEventEmitter.emit(layer.name);
    };

    fillLayer = (layer: Layer) => {
        const cachedLayer = this.layers.find(
            (_layer) => _layer.name === layer.name,
        );
        return {
            icon: layerIcon[layer.name],
            label: layerLabel[layer.name],
            active: cachedLayer && cachedLayer.active,
            ...layer,
        };
    };
}
