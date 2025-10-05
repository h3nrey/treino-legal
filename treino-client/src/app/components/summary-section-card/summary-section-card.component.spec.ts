import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySectionCardComponent } from './summary-section-card.component';

describe('SummarySectionCardComponent', () => {
  let component: SummarySectionCardComponent;
  let fixture: ComponentFixture<SummarySectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarySectionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarySectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
