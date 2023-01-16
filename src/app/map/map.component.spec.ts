import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MapComponent } from './map.component';
import { LegendService } from './legend.service';
import { ApiService } from '../api.service';
import { Layer } from '../layer/layers.type';

describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;

    beforeEach(() => {
        const legendServiceSpy = jasmine.createSpyObj<LegendService>([
            'setLeafletMap',
        ]);
        const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getLayer']);
        apiServiceSpy.getLayer.and.returnValue(of(new Layer()));

        TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [
                IonicModule.forRoot(),
                LeafletModule,
                LeafletMarkerClusterModule,
            ],
            providers: [
                { provide: ApiService, useValue: apiServiceSpy },
                { provide: LegendService, useValue: legendServiceSpy },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(MapComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
