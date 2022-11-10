import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Input() events = [];

  constructor(private modalCtrl: ModalController) {}

  async openPopup() {
    const modal = await this.modalCtrl.create({
      component: PopupComponent,
      showBackdrop: false,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }
}
