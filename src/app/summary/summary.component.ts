import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import indefinite from 'indefinite';

import {
    AdminLevelFill,
    adminLevelFillLabel,
} from '../admin-level/admin-level.type';
import { formatNumber, formatPercentage } from '../app.utils';
import { Event } from '../event/event.type';
import { PopupComponent } from '../popup/popup.component';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    standalone: false,
})
export class SummaryComponent implements OnChanges {
    @Input() events = [];
    @Input() event: Event;
    @Input() loading = true;

    public hideEvents = false;

    public formatNumber = formatNumber;
    public formatPercentage = formatPercentage;
    public indefinite = indefinite;

    public adminLevelFill = AdminLevelFill;
    public adminLevelFillLabel = adminLevelFillLabel;

    constructor(
        private modalCtrl: ModalController,
        private httpClient: HttpClient,
    ) {}

    ngOnChanges() {
        this.hideEvents = this.event && Object.keys(this.event).length > 0;
    }

    openPopup = (title: string, contentPath: string) => {
        this.httpClient
            .get(contentPath, { responseType: 'text' })
            .subscribe((content) => this.showPopup(title, content));
    };

    showPopup = async (title: string, content: string) => {
        const modal = await this.modalCtrl.create({
            component: PopupComponent,
            componentProps: { title, content },
            showBackdrop: true,
        });
        modal.present();
    };
}
