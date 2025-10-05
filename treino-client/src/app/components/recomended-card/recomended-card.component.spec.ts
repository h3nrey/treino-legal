import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedCardComponent } from './recomended-card.component';

describe('RecomendedCardComponent', () => {
  let component: RecomendedCardComponent;
  let fixture: ComponentFixture<RecomendedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
