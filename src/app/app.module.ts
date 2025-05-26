import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';

import { AdminLevelComponent } from './admin-level/admin-level.component';
import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { EventComponent } from './event/event.component';
import { HeaderComponent } from './header/header.component';
import { LayerComponent } from './layer/layer.component';
import { LoadingComponent } from './loading/loading.component';
import { MapComponent } from './map/map.component';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { PopupComponent } from './popup/popup.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
    declarations: [
        AppComponent,
        EventComponent,
        MapComponent,
        LayerComponent,
        SummaryComponent,
        PopupComponent,
        HeaderComponent,
        MarkerPopupComponent,
        LoadingComponent,
        AdminLevelComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        LeafletModule,
        LeafletMarkerClusterModule,
        MarkdownModule.forRoot(),
        AppRouter,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {
    constructor(injector: Injector) {
        customElements.define(
            'marker-popup-element',
            createCustomElement(MarkerPopupComponent, { injector }),
        );
    }
}
