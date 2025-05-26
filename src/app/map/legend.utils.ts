/* eslint-disable @typescript-eslint/naming-convention */

import { ControlOptions, DomUtil } from 'leaflet';

import {
    AdminLevelFill,
    adminLevelFillLabel,
} from '../admin-level/admin-level.type';
import { formatNumber, formatPercentage } from '../app.utils';
import {
    buildingsLayerNames,
    layerLabel,
    LayerName,
} from '../layer/layer.type';
import { assessmentAreaLayerStyle } from './layer.style';

export const controlOptions: ControlOptions = { position: 'bottomright' };

export const onAddControl =
    (
        layerName: LayerName,
        showBuildingControl: ShowBuildingControl = {},
        adminLevelFill: AdminLevelFill = null,
        maximum = 0,
    ) =>
    () => {
        const div = DomUtil.create('div', 'legend');
        div.innerHTML += getLayerLegend(
            layerName,
            showBuildingControl,
            adminLevelFill,
            maximum,
        );
        return div;
    };

const getLayerLegend = (
    layerName: LayerName,
    showBuildingControl: ShowBuildingControl,
    adminLevelFill: AdminLevelFill,
    maximum: number,
) => {
    if (layerName === LayerName.admin1) {
        const isPercentageAdminLevelFill = [
            AdminLevelFill.buildingDamagePercentage,
            AdminLevelFill.peopleAffectedPercentage,
        ].includes(adminLevelFill);
        return getGradedLegend(
            maximum,
            adminLevelFillLabel[adminLevelFill],
            isPercentageAdminLevelFill,
        );
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

// Admin Level Fill

const hexCodeAlphaSuffixes = ['1a', '4d', '80', 'b3', 'e6'];

const getGradedLegendEntryLabel = (
    maximum: number,
    percentage: boolean,
    index: number,
    lastIndex: boolean,
) => {
    const formatFunction = percentage ? formatPercentage : formatNumber;
    const start = formatFunction((maximum * index) / 5);
    const end = formatFunction((maximum * (index + 1)) / 5);
    return lastIndex ? `${start}+` : `${start} - ${end}`;
};

const getGradedLegend = (
    maximum = 0,
    title = 'Legend',
    percentage = false,
    color = '#969696',
) =>
    [
        title,
        ...(maximum > 0
            ? hexCodeAlphaSuffixes.map((hexCodeAlphaSuffix, index) => {
                  const colorWithAlpha = `${color}${hexCodeAlphaSuffix}`;
                  const label = getGradedLegendEntryLabel(
                      maximum,
                      percentage,
                      index,
                      hexCodeAlphaSuffixes.length - 1 === index,
                  );
                  return getLegendEntry(colorWithAlpha, label);
              })
            : [getLegendEntry('#9696961a', 'No Data')]),
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

interface ShowBuildingControl {
    [key: string]: boolean;
}

const buildingsLegendProperties = {
    buildings: { color: '#969696', label: 'All Buildings' },
    'buildings-damage-none': { color: '#2ad062', label: 'No Damage' },
    'buildings-damage-light': { color: '#faff03', label: 'Light Damage' },
    'buildings-damage-moderate': { color: '#ffb30f', label: 'Moderate Damage' },
    'buildings-damage-heavy': { color: '#f5333f', label: 'Heavy Damage' },
    'buildings-damage-none-and-light': {
        color: '#faff03',
        label: 'No / Light Damage',
    },
    'buildings-damage-moderate-and-heavy': {
        color: '#f5333f',
        label: 'Moderate / Heavy Damage',
    },
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
