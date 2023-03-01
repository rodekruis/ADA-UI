/* eslint-disable @typescript-eslint/naming-convention */

export const layerIcon = {
    'buildings-damage-none': '/assets/icon/favicon.svg',
    'buildings-damage-light': '/assets/icon/favicon.svg',
    'buildings-damage-moderate': '/assets/icon/favicon.svg',
    'buildings-damage-heavy': '/assets/icon/favicon.svg',
    'buildings-damage-none-and-light': '/assets/icon/favicon.svg',
    'buildings-damage-moderate-and-heavy': '/assets/icon/favicon.svg',
    buildings: '/assets/icon/favicon.svg',
    'assessment-area': '/assets/icon/favicon.svg',
    'population-density': '/assets/icon/favicon.svg',
    'wealth-index': '/assets/icon/favicon.svg',
};

export const layerLabel = {
    'buildings-damage-none': 'No Building Damage',
    'buildings-damage-light': 'Light Building Damage',
    'buildings-damage-moderate': 'Moderate Building Damage',
    'buildings-damage-heavy': 'Heavy Building Damage',
    'buildings-damage-none-and-light': 'No / Light Building Damage',
    'buildings-damage-moderate-and-heavy': 'Moderate / Heavy Building Damage',
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
    buildingsDamageNoneAndLight = 'buildings-damage-none-and-light',
    buildingsDamageModerateAndHeavy = 'buildings-damage-moderate-and-heavy',
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
    LayerName.buildingsDamageNoneAndLight,
    LayerName.buildingsDamageModerateAndHeavy,
];

export const defaultLayers = [LayerName.assessmentArea];

export class Layer {
    icon: string;
    label: string;
    name: LayerName;
    image: string;
    information: string;
    geojson?: GeoJSON.FeatureCollection;
    active?: boolean;
}
