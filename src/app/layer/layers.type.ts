export const layerIcon = {
    buildingsDamageNone:
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    buildingsDamageLight:
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    buildingsDamageModerate:
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    buildingsDamageHeavy:
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    buildings: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    assessmentArea: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    peopleAffected: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    populationDensity:
        'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    wealthIndex: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    damageAdmin1: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    damageAdmin2: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    damageAdmin3: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    damageAdmin4: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
    damageAdmin5: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
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

export class Layer {
    label: string;
    name: LayerName;
    image: string;
    information: string;
    geojson?: GeoJSON.FeatureCollection;
    active?: boolean;
}
