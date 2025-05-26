import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    standalone: false,
})
export class PopupComponent {
    @Input() title = 'Title';
    @Input() content = 'Content';

    constructor(public modalCtrl: ModalController) {}
}
