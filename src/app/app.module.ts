import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MarkdownModule } from 'ngx-markdown';
import { NgxLiquidCacheModule } from 'ngx-liquid-cache';
import { AppRouter } from './app.router';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SummaryComponent } from './summary/summary.component';
import { PopupComponent } from './popup/popup.component';
import { HeaderComponent } from './header/header.component';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { LoadingComponent } from './loading/loading.component';

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
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        LeafletModule,
        LeafletMarkerClusterModule,
        HttpClientModule,
        MarkdownModule.forRoot(),
        AppRouter,
        FormsModule,
        ReactiveFormsModule,
        NgxLiquidCacheModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(injector: Injector) {
        customElements.define(
            'marker-popup-element',
            createCustomElement(MarkerPopupComponent, { injector }),
        );
    }
}
