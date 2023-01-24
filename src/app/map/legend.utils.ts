/* eslint-disable @typescript-eslint/naming-convention */

import { ControlOptions, DomUtil } from 'leaflet';
import { AdminLevelFill } from '../admin-level/admin-level.type';
import {
    assessmentAreaLayerStyle,
    buildingsLayerNames,
    layerLabel,
    LayerName,
} from '../layer/layers.type';

export const controlOptions: ControlOptions = { position: 'bottomright' };

interface ShowBuildingControl {
    [key: string]: boolean;
}

export const onAddControl =
    (
        layerName: LayerName,
        showBuildingControl: ShowBuildingControl = {},
        adminLevelFill: AdminLevelFill = null,
    ) =>
    () => {
        const div = DomUtil.create('div', 'legend');
        div.innerHTML += getLayerLegend(
            layerName,
            showBuildingControl,
            adminLevelFill,
        );
        return div;
    };

const getLayerLegend = (
    layerName: LayerName,
    showBuildingControl: ShowBuildingControl,
    adminLevelFill: AdminLevelFill,
) => {
    if (layerName === LayerName.admin1) {
        if (adminLevelFill === AdminLevelFill.peopleAffected) {
            return peopleAffectedLegend;
        } else if (adminLevelFill === AdminLevelFill.buildingDamage) {
            return buildingDamageLegend;
        }
    }
    if (layerName === LayerName.wealthIndex) {
        return wealthIndexLegend;
    }
    if (layerName === LayerName.populationDensity) {
        return populationDensityLegend;
    }
    if (buildingsLayerNames.includes(layerName)) {
        return getBuildingsLegend(showBuildingControl);
    }
    return getLegendEntry(
        assessmentAreaLayerStyle.color,
        layerLabel[layerName],
    );
};

const getLegendEntry = (color: string, label: string) =>
    `<i style="background:${color}"></i> ${label}`;

const legendEntryDelimiter = '<br />';

// Admin Level : People Affected

const peopleAffectedLegendProperties = [
    { color: '#9696961a', label: '0 - 10K' },
    { color: '#9696964d', label: '10K - 100K' },
    { color: '#96969680', label: '100K - 500K' },
    { color: '#969696b3', label: '500K - 1M' },
    { color: '#969696e6', label: '1M+' },
];

const peopleAffectedLegend = [
    'People Affected',
    ...peopleAffectedLegendProperties.map((peopleAffectedLegendEntry) =>
        getLegendEntry(
            peopleAffectedLegendEntry.color,
            peopleAffectedLegendEntry.label,
        ),
    ),
].join(legendEntryDelimiter);

// Admin Level : Building Damage

const buildingDamageLegendProperties = [
    { color: '#9696961a', label: '0 - 100' },
    { color: '#9696964d', label: '101 - 1K' },
    { color: '#96969680', label: '1K - 5K' },
    { color: '#969696b3', label: '5K - 10K' },
    { color: '#969696e6', label: '10K+' },
];

const buildingDamageLegend = [
    'Building Damage',
    ...buildingDamageLegendProperties.map((buildingDamageLegendEntry) =>
        getLegendEntry(
            buildingDamageLegendEntry.color,
            buildingDamageLegendEntry.label,
        ),
    ),
].join(legendEntryDelimiter);

// Wealth Index

const wealthIndexLegendProperties = [
    { color: '#b358067f', label: '+1.0' },
    { color: '#ffffff7f', label: '+0.0' },
    { color: '#5427887f', label: '-1.0' },
];

const wealthIndexLegend = [
    'Wealth Index',
    ...wealthIndexLegendProperties.map((wealthIndexLegendEntry) =>
        getLegendEntry(
            wealthIndexLegendEntry.color,
            wealthIndexLegendEntry.label,
        ),
    ),
].join(legendEntryDelimiter);

// Population Density

const populationDensityLegendProperties = [
    { color: '#0000ff7f', label: '1' },
    { color: '#0080007f', label: '5' },
    { color: '#ffd7007f', label: '8' },
    { color: '#ffa5007f', label: '16' },
    { color: '#ff00007f', label: '120+' },
];

const populationDensityLegend = [
    'Population Density',
    ...populationDensityLegendProperties.map((populationDensityLegendEntry) =>
        getLegendEntry(
            populationDensityLegendEntry.color,
            populationDensityLegendEntry.label,
        ),
    ),
].join(legendEntryDelimiter);

// Buildings

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
