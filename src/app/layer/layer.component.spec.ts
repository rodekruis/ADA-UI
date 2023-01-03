import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { LayerComponent } from './layer.component';
import { ApiService } from '../api.service';

describe('LayerComponent', () => {
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getLayers']);
    apiServiceSpy.getLayers.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [LayerComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
