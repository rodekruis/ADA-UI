import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LayerName } from '../layer/layer.type';
import { AdminLevelFill, adminLevelFillLabel } from './admin-level.type';

@Component({
    selector: 'app-admin-level',
    templateUrl: './admin-level.component.html',
    styleUrls: ['./admin-level.component.scss'],
    standalone: false,
})
export class AdminLevelComponent {
    @Input() adminLevelLabels = [];
    @Input() loading = true;
    @Input() adminDisabled = {};
    @Output() adminChangeEvent = new EventEmitter<LayerName>();
    @Output() adminFillChangeEvent = new EventEmitter<AdminLevelFill>();

    public adminLayerNames = LayerName;
    public adminLevelFill = AdminLevelFill;
    public adminLevelFillLabel = adminLevelFillLabel;
    public adminLevelFillValue: AdminLevelFill;

    constructor() {}

    onAdminChange = (event: any) => {
        this.adminChangeEvent.emit(event.detail.value);
    };

    onAdminFillChange = (event: any) => {
        this.adminLevelFillValue = event.detail.value;
        this.adminFillChangeEvent.emit(event.detail.value);
    };
}
