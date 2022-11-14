import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent {
  public layers = [
    {
      label: 'No Damage',
      name: 'buildings-damage-none',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'No Damage Popup Information',
    },
    {
      label: 'Light Damage',
      name: 'buildings-damage-light',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Light Damage Popup Information',
    },
    {
      label: 'Moderate Damage',
      name: 'buildings-damage-moderate',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Moderate Damage Popup Information',
    },
    {
      label: 'Heavy Damage',
      name: 'buildings-damage-heavy',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Heavy Damage Popup Information',
    },
    {
      label: 'Buildings',
      name: 'buildings',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Buildings Popup Information',
    },
    {
      label: 'Satellite',
      name: 'satellite-view',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Satellite Popup Information',
    },
    {
      label: 'People Affected',
      name: 'people-affected',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'People Affected Popup Information',
    },
    {
      label: 'Population Density',
      name: 'population-density',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Population Density Popup Information',
    },
    {
      label: 'Wealth Index',
      name: 'wealth-index',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Wealth Index Popup Information',
    },
    {
      label: 'Admin 1 Damage',
      name: 'damage-admin-1',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Admin 1 Damage Popup Information',
    },
    {
      label: 'Admin 2 Damage',
      name: 'damage-admin-2',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Admin 2 Damage Popup Information',
    },
    {
      label: 'Admin 3 Damage',
      name: 'damage-admin-3',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Admin 3 Damage Popup Information',
    },
    {
      label: 'Admin 4 Damage',
      name: 'damage-admin-4',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Admin 4 Damage Popup Information',
    },
    {
      label: 'Admin 5 Damage',
      name: 'damage-admin-5',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
      information: 'Admin 5 Damage Popup Information',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  async openPopup(title: string, content: string) {
    const modal = await this.modalCtrl.create({
      component: PopupComponent,
      componentProps: { title, content },
      showBackdrop: true,
    });
    modal.present();
  }
}
