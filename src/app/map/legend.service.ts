import { Injectable } from '@angular/core';
import { Map, Control } from 'leaflet';
import { LayerName } from '../layer/layers.type';
import {
    buildingsLayerNames,
    controlOptions,
    onAddControl,
} from './legend.utils';

@Injectable({ providedIn: 'root' })
export class LegendService {
    private controls = {};
    private showBuildingControl = {};
    private leafletMap: Map;

    setLeafletMap = (leafletMap: Map) => (this.leafletMap = leafletMap);

    showLegend = (layerName: LayerName) => {
        if (buildingsLayerNames.includes(layerName)) {
            this.showBuildingControl[layerName] = true;
            this.clearBuildingControls();
        }
        this.controls[layerName] = this.createControl(layerName);
        this.leafletMap.addControl(this.controls[layerName]);
    };

    hideLegend = (layerName: LayerName) => {
        if (buildingsLayerNames.includes(layerName)) {
            this.showBuildingControl[layerName] = false;
        }
        this.leafletMap.removeControl(this.controls[layerName]);
        delete this.controls[layerName];
        this.showFallbackBuildingControl();
    };

    createControl = (layerName: LayerName) => {
        const control = new Control(controlOptions);
        control.onAdd = onAddControl(layerName, this.showBuildingControl);
        return control;
    };

    clearBuildingControls = () => {
        buildingsLayerNames.forEach((buildingsLayerName) => {
            if (this.controls[buildingsLayerName]) {
                this.leafletMap.removeControl(
                    this.controls[buildingsLayerName],
                );
            }
        });
    };

    showFallbackBuildingControl = () => {
        const filteredBuildingLayerNames = buildingsLayerNames.filter(
            (buildingsLayerName) =>
                this.showBuildingControl[buildingsLayerName],
        );
        if (filteredBuildingLayerNames.length) {
            this.showLegend(filteredBuildingLayerNames[0]);
        }
    };
}
