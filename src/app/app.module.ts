import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@bluehalo/ngx-leaflet-markercluster';
import { MarkdownModule } from 'ngx-markdown';
import { AppRouter } from './app.router';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { MapComponent } from './map/map.component';
import { LayerComponent } from './layer/layer.component';
import { SummaryComponent } from './summary/summary.component';
import { PopupComponent } from './popup/popup.component';
import { HeaderComponent } from './header/header.component';
import { MarkerPopupComponent } from './marker-popup/marker-popup.component';
import { LoadingComponent } from './loading/loading.component';
import { AdminLevelComponent } from './admin-level/admin-level.component';

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
