import { HttpClient } from '@angular/common/http';
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

  constructor(
    private modalCtrl: ModalController,
    private httpClient: HttpClient
  ) {}

  openPopup(title: string, contentPath: string) {
    this.httpClient
      .get(contentPath, { responseType: 'text' })
      .subscribe((content) => this.showPopup(title, content));
  }

  async showPopup(title: string, content: string) {
    const modal = await this.modalCtrl.create({
      component: PopupComponent,
      componentProps: { title, content },
      showBackdrop: true,
    });
    modal.present();
  }
}
