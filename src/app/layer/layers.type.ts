/* eslint-disable @typescript-eslint/naming-convention */

import ColorScale from 'color-scales';

/*
    HDX Dataset Deep Dive: Data for Good at Meta’s Relative Wealth Index

    Range: -10 and +10 (Effective: -2 and +2)
    https://youtu.be/MImFR0_NSxQ

    #542788 RWI -1.0 / #FFFFFF RWI +0.0 / #B35806 RWI +1.0
    http://www.povertymaps.net/assets/key-color.svg
*/
const wealthIndexColorScale = new ColorScale(-1, +1, [
    '#542788',
    '#FFFFFF',
    '#B35806',
]);

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
    'people-affected':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'population-density':
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'wealth-index': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'damage-admin-1': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'damage-admin-2': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'damage-admin-3': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'damage-admin-4': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    'damage-admin-5': 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
};

export const layerLabel = {
    'buildings-damage-none': 'No Building Damage',
    'buildings-damage-light': 'Light Building Damage',
    'buildings-damage-moderate': 'Moderate Building Damage',
    'buildings-damage-heavy': 'Heavy Building Damage',
    buildings: 'Buildings',
    'assessment-area': 'Assessment Area',
    'people-affected': 'People Affected',
    'population-density': 'Population Density',
    'wealth-index': 'Wealth Index',
    'damage-admin-1': 'Damage Admin 1',
    'damage-admin-2': 'Damage Admin 2',
    'damage-admin-3': 'Damage Admin 3',
    'damage-admin-4': 'Damage Admin 4',
    'damage-admin-5': 'Damage Admin 5',
};

export const layerStyle = {
    'admin-1': { color: '#969696', weight: 1, fillOpacity: 0 },
    'admin-2': { color: '#969696', weight: 1, fillOpacity: 0 },
    'admin-3': { color: '#969696', weight: 1, fillOpacity: 0 },
    'admin-4': { color: '#969696', weight: 1, fillOpacity: 0 },
    'admin-5': { color: '#969696', weight: 1, fillOpacity: 0 },
    'buildings-damage-none': { color: '#2ad062', weight: 1, fillOpacity: 0.4 },
    'buildings-damage-light': { color: '#faff03', weight: 1, fillOpacity: 0.4 },
    'buildings-damage-moderate': {
        color: '#ffb30f',
        weight: 1,
        fillOpacity: 0.4,
    },
    'buildings-damage-heavy': { color: '#f5333f', weight: 1, fillOpacity: 0.4 },
    buildings: { color: '#969696', weight: 1, fillOpacity: 0.4 },
    'assessment-area': { color: '#f5333f', weight: 1, fillOpacity: 0 },
    'people-affected': { color: '#969696', weight: 1, fillOpacity: 0 },
    'population-density': { color: '#969696', weight: 1, fillOpacity: 0 },
    'wealth-index': (geojson: GeoJSON.Feature) => ({
        color: wealthIndexColorScale
            .getColor(geojson.properties.rwi)
            .toHexString(),
        weight: 0,
        fillOpacity: 0.5,
    }),
    'damage-admin-1': { color: '#969696', weight: 1, fillOpacity: 0 },
    'damage-admin-2': { color: '#969696', weight: 1, fillOpacity: 0 },
    'damage-admin-3': { color: '#969696', weight: 1, fillOpacity: 0 },
    'damage-admin-4': { color: '#969696', weight: 1, fillOpacity: 0 },
    'damage-admin-5': { color: '#969696', weight: 1, fillOpacity: 0 },
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
    peopleAffected = 'people-affected',
    populationDensity = 'population-density',
    wealthIndex = 'wealth-index',
    damageAdmin1 = 'damage-admin-1',
    damageAdmin2 = 'damage-admin-2',
    damageAdmin3 = 'damage-admin-3',
    damageAdmin4 = 'damage-admin-4',
    damageAdmin5 = 'damage-admin-5',
}

export const adminLayerNames = [
    LayerName.admin1,
    LayerName.admin2,
    LayerName.admin3,
    LayerName.admin4,
    LayerName.admin5,
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
