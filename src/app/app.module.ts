import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CalendarComponent,
    SummaryComponent,
  ],
  imports: [BrowserModule, IonicModule.forRoot(), LeafletModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
