import { Component, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PopupComponent } from '../popup/popup.component';
import { Event } from '../event/event.type';
import { Layer } from './layers.type';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnChanges {
  @Input() event: Event;
  @Input() loading = true;

  public layers = [];

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService
  ) {}

  ngOnChanges() {
    if (!(this.event && this.event.id)) {
      return;
    }

    this.getLayers();
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
    this.layers = layers;
  };

  toggleLayer = (layer: Layer) => {
    layer.active = !layer.active;
  };
}
