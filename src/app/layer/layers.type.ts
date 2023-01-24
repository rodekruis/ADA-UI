/* eslint-disable @typescript-eslint/naming-convention */

import ColorScale from 'color-scales';
import { AdminLevelFill } from '../admin-level/admin-level.type';

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

const getAdminLevelFillOpacity = (value: number, stops: number[]) => {
    let fillOpacity = 0.1;
    stops.forEach((stop) => {
        if (value > stop) {
            fillOpacity += 0.2;
        }
    });
    return fillOpacity;
};

export const adminLayerStyle =
    (fillProperty: AdminLevelFill = null) =>
    (geojson: GeoJSON.Feature) => {
        let fillOpacity = 0;
        if (fillProperty === AdminLevelFill.buildingDamage) {
            // 0.1 - 0 - 100
            // 0.3 - 101 - 1000
            // 0.5 - 1001 - 5000
            // 0.7 - 5001 - 10000
            // 0.9 - 10000+
            fillOpacity = getAdminLevelFillOpacity(
                geojson.properties[AdminLevelFill.buildingDamage],
                [100, 1000, 5000, 10000],
            );
        } else if (fillProperty === AdminLevelFill.peopleAffected) {
            // 0.1 - 0 - 10000
            // 0.3 - 10001 - 100000
            // 0.5 - 100001 - 500000
            // 0.7 - 500001 - 1000000
            // 0.9 - 1000000+
            fillOpacity = getAdminLevelFillOpacity(
                geojson.properties[AdminLevelFill.peopleAffected],
                [10000, 100000, 500000, 1000000],
            );
        }
        return {
            color: '#969696',
            weight: 1,
            fillColor: '#969696',
            fillOpacity,
        };
    };

const buildingLayerStyle =
    (layerName: LayerName) => (geojson: GeoJSON.Feature) => {
        let color = '#969696';
        switch (layerName) {
            case LayerName.buildingsDamageNone:
                color = '#2ad062';
                break;
            case LayerName.buildingsDamageLight:
                color = '#faff03';
                break;
            case LayerName.buildingsDamageModerate:
                color = '#ffb30f';
                break;
            case LayerName.buildingsDamageHeavy:
                color = '#f5333f';
                break;
        }

        return {
            color,
            weight: 1,
            fillOpacity: 0.4,
        };
    };

const populationDensityLayerStyle = (geojson: GeoJSON.Feature) => ({
    color: (() => {
        if (geojson.properties.DN > 119) {
            return '#ff0000';
        }
        if (geojson.properties.DN > 15) {
            return '#ffa500';
        }
        if (geojson.properties.DN > 7) {
            return '#ffd700';
        }
        if (geojson.properties.DN > 4) {
            return '#008000';
        }
        if (geojson.properties.DN > 0) {
            return '#0000ff';
        }
        return 'transparent';
    })(),
    weight: 0,
    fillOpacity: 1,
});

export const assessmentAreaLayerStyle = {
    color: '#f5333f',
    weight: 1,
    fillOpacity: 0,
};

const wealthIndexLayerStyle = (geojson: GeoJSON.Feature) => ({
    color: wealthIndexColorScale.getColor(geojson.properties.rwi).toHexString(),
    weight: 0,
    fillOpacity: 0.5,
});

export const getLayerStyle = (layerName: LayerName) => {
    if (buildingsLayerNames.includes(layerName)) {
        return buildingLayerStyle(layerName);
    }
    if (layerName === LayerName.wealthIndex) {
        return wealthIndexLayerStyle;
    }
    if (layerName === LayerName.populationDensity) {
        return populationDensityLayerStyle;
    }
    if (layerName === LayerName.assessmentArea) {
        return assessmentAreaLayerStyle;
    }
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
