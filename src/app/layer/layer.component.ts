import { Component } from '@angular/core';

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
    },
    {
      label: 'Light Damage',
      name: 'buildings-damage-light',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Moderate Damage',
      name: 'buildings-damage-moderate',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Heavy Damage',
      name: 'buildings-damage-heavy',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Buildings',
      name: 'buildings',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Satellite',
      name: 'satellite-view',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'People Affected',
      name: 'people-affected',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Population Density',
      name: 'population-density',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Wealth Index',
      name: 'wealth-index',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Admin 1 Damage',
      name: 'damage-admin-1',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Admin 2 Damage',
      name: 'damage-admin-2',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Admin 3 Damage',
      name: 'damage-admin-3',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Admin 4 Damage',
      name: 'damage-admin-4',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
    {
      label: 'Admin 5 Damage',
      name: 'damage-admin-5',
      image: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    },
  ];

  constructor() {}
}
