import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SummaryComponent } from './summary.component';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';

describe('SummaryComponent', () => {
    let component: SummaryComponent;
    let fixture: ComponentFixture<SummaryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SummaryComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule.forRoot()],
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
