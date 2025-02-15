import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWrapperComponent } from './info-wrapper.component';

describe('InfoWrapperComponent', () => {
  let component: InfoWrapperComponent;
  let fixture: ComponentFixture<InfoWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
