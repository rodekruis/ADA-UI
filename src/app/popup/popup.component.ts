import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  title = 'Title';
  content = 'Content';

  constructor(private modalCtrl: ModalController) {}

  close() {
    return this.modalCtrl.dismiss(null, 'close');
  }
}
