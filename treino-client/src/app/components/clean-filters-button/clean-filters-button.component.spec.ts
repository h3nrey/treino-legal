import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanFiltersButtonComponent } from './clean-filters-button.component';

describe('CleanFiltersButtonComponent', () => {
  let component: CleanFiltersButtonComponent;
  let fixture: ComponentFixture<CleanFiltersButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanFiltersButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CleanFiltersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
