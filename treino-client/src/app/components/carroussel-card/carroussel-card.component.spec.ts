import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrousselCardComponent } from './carroussel-card.component';

describe('CarrousselCardComponent', () => {
  let component: CarrousselCardComponent;
  let fixture: ComponentFixture<CarrousselCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrousselCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrousselCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
