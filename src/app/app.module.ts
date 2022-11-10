import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SummaryComponent } from './summary/summary.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LayerComponent,
    CalendarComponent,
    SummaryComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    LeafletModule,
    LeafletMarkerClusterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
