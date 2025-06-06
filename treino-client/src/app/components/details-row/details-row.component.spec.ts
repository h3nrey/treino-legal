import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRowComponent } from './details-row.component';

describe('DetailsRowComponent', () => {
  let component: DetailsRowComponent;
  let fixture: ComponentFixture<DetailsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
