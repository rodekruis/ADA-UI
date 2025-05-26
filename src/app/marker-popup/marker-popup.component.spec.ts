import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ApiService } from '../api.service';
import { Event } from '../event/event.type';
import { MarkerPopupComponent } from './marker-popup.component';

describe('MarkerPopupComponent', () => {
    let component: MarkerPopupComponent;
    let fixture: ComponentFixture<MarkerPopupComponent>;

    beforeEach(() => {
        const apiServiceSpy = jasmine.createSpyObj<ApiService>([
            'getEventToken',
        ]);
        apiServiceSpy.getEventToken.and.returnValue(
            of({ message: 'test_token' }),
        );

        TestBed.configureTestingModule({
            declarations: [MarkerPopupComponent],
            imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
            providers: [{ provide: ApiService, useValue: apiServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(MarkerPopupComponent);
        component = fixture.componentInstance;
        const event = new Event();
        event.startDate = new Date().toISOString();
        component.event = event;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
