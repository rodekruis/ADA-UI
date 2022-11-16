import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SummaryComponent } from './summary/summary.component';
import { PopupComponent } from './popup/popup.component';
import { EventComponent } from './event/event.component';
import { HeaderComponent } from './header/header.component';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    MapComponent,
    LayerComponent,
    CalendarComponent,
    SummaryComponent,
    PopupComponent,
    HeaderComponent,
    MarkerPopupComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    LeafletModule,
    LeafletMarkerClusterModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    AppRouter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    customElements.define(
      'marker-popup-element',
      createCustomElement(MarkerPopupComponent, { injector })
    );
  }
}
