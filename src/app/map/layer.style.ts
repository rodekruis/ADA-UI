import ColorScale from 'color-scales';

import { AdminLevelFill } from '../admin-level/admin-level.type';
import { buildingsLayerNames, LayerName } from '../layer/layer.type';

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
    (adminLevelFill: AdminLevelFill = null, maximum = 0) =>
    (geojson: GeoJSON.Feature) => {
        const fillOpacity = adminLevelFill
            ? getAdminLevelFillOpacity(geojson.properties[adminLevelFill], [
                  maximum * 0.25,
                  maximum * 0.5,
                  maximum * 0.75,
                  maximum,
              ])
            : 0;
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
            case LayerName.buildingsDamageNoneAndLight:
                color = '#faff03';
                break;
            case LayerName.buildingsDamageModerateAndHeavy:
                color = '#f5333f';
                break;
        }

        return { color, weight: 1, fillOpacity: 0.4 };
    };

const getPopulationDensityColor = (value: number) => {
    if (value > 119) {
        return '#ff0000';
    }
    if (value > 15) {
        return '#ffa500';
    }
    if (value > 7) {
        return '#ffd700';
    }
    if (value > 4) {
        return '#008000';
    }
    if (value > 0) {
        return '#0000ff';
    }
    return '#ffffff00';
};

const populationDensityLayerStyle = (geojson: GeoJSON.Feature) => ({
    color: getPopulationDensityColor(geojson.properties.population_density),
    weight: 1,
    opacity: 0.5,
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
