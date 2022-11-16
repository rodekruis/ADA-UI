import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
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
export class AppModule {}
