/* eslint-disable @typescript-eslint/naming-convention */

export const layerIcon = {
    'buildings-damage-none':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'buildings-damage-light':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'buildings-damage-moderate':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'buildings-damage-heavy':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    buildings: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'assessment-area':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'population-density':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'wealth-index': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
};

export const layerLabel = {
    'buildings-damage-none': 'No Building Damage',
    'buildings-damage-light': 'Light Building Damage',
    'buildings-damage-moderate': 'Moderate Building Damage',
    'buildings-damage-heavy': 'Heavy Building Damage',
    buildings: 'Buildings',
    'assessment-area': 'Assessment Area',
    'population-density': 'Population Density',
    'wealth-index': 'Wealth Index',
};

export enum LayerName {
    admin1 = 'admin-1',
    admin2 = 'admin-2',
    admin3 = 'admin-3',
    admin4 = 'admin-4',
    admin5 = 'admin-5',
    buildingsDamageNone = 'buildings-damage-none',
    buildingsDamageLight = 'buildings-damage-light',
    buildingsDamageModerate = 'buildings-damage-moderate',
    buildingsDamageHeavy = 'buildings-damage-heavy',
    buildings = 'buildings',
    assessmentArea = 'assessment-area',
    populationDensity = 'population-density',
    wealthIndex = 'wealth-index',
}

export const adminLayerNames = [
    LayerName.admin1,
    LayerName.admin2,
    LayerName.admin3,
    LayerName.admin4,
    LayerName.admin5,
];

export const buildingsLayerNames = [
    LayerName.buildings,
    LayerName.buildingsDamageHeavy,
    LayerName.buildingsDamageModerate,
    LayerName.buildingsDamageLight,
    LayerName.buildingsDamageNone,
];

export class Layer {
    icon: string;
    label: string;
    name: LayerName;
    image: string;
    information: string;
    geojson?: GeoJSON.FeatureCollection;
    active?: boolean;
}
