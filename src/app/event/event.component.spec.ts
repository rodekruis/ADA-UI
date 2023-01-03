import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { EventComponent } from './event.component';
import { ApiService } from '../api.service';
import { Event } from './event.type';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>([
      'getEvents',
      'getEvent',
    ]);
    apiServiceSpy.getEvents.and.returnValue(of([]));
    apiServiceSpy.getEvent.and.returnValue(of(new Event()));

    TestBed.configureTestingModule({
      declarations: [EventComponent],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
