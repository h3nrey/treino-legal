import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearchresultsComponent } from './header-searchresults.component';

describe('HeaderSearchresultsComponent', () => {
  let component: HeaderSearchresultsComponent;
  let fixture: ComponentFixture<HeaderSearchresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderSearchresultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSearchresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
