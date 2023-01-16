/* eslint-disable @typescript-eslint/naming-convention */

import { ControlOptions, DomUtil } from 'leaflet';
import { layerLabel, LayerName, layerStyle } from '../layer/layers.type';

export const controlOptions: ControlOptions = { position: 'bottomright' };

interface ShowBuildingControl {
    [key: string]: boolean;
}

export const onAddControl =
    (layerName: LayerName, showBuildingControl: ShowBuildingControl) => () => {
        const div = DomUtil.create('div', 'legend');
        div.innerHTML += getLayerLegend(layerName, showBuildingControl);
        return div;
    };

const getLayerLegend = (
    layerName: LayerName,
    showBuildingControl: ShowBuildingControl,
) => {
    if (layerName === LayerName.wealthIndex) {
        return wealthIndexLegend;
    }
    if (buildingsLayerNames.includes(layerName)) {
        return getBuildingsLegend(showBuildingControl);
    }
    return getLegendEntry(layerStyle[layerName].color, layerLabel[layerName]);
};

const getLegendEntry = (color: string, label: string) =>
    `<i style="background:${color}"></i> ${label}`;

const legendEntryDelimiter = '<br />';

// Wealth Index

const wealthIndexLegendProperties = [
    { color: '#b358067f', label: '+1.0' },
    { color: '#ffffff7f', label: '+0.0' },
    { color: '#5427887f', label: '-1.0' },
];

const wealthIndexLegend = [
    'Wealth Index',
    ...wealthIndexLegendProperties.map((wealthIndex) =>
        getLegendEntry(wealthIndex.color, wealthIndex.label),
    ),
].join(legendEntryDelimiter);

// Buildings

export const buildingsLayerNames = [
    LayerName.buildings,
    LayerName.buildingsDamageHeavy,
    LayerName.buildingsDamageModerate,
    LayerName.buildingsDamageLight,
    LayerName.buildingsDamageNone,
];

const buildingsLegendProperties = {
    buildings: { color: '#969696', label: 'All Buildings' },
    'buildings-damage-none': { color: '#2ad062', label: 'No Damage' },
    'buildings-damage-light': { color: '#faff03', label: 'Light Damage' },
    'buildings-damage-moderate': { color: '#ffb30f', label: 'Moderate Damage' },
    'buildings-damage-heavy': { color: '#f5333f', label: 'Heavy Damage' },
};

const getBuildingsLegend = (showBuildingControl: ShowBuildingControl) =>
    [
        'Buildings',
        ...buildingsLayerNames
            .filter(
                (buildingsLayerName) => showBuildingControl[buildingsLayerName],
            )
            .map((buildingsLayerName) =>
                getLegendEntry(
                    buildingsLegendProperties[buildingsLayerName].color,
                    buildingsLegendProperties[buildingsLayerName].label,
                ),
            ),
    ].join(legendEntryDelimiter);
