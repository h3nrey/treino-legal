import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTooltipComponent } from './user-tooltip.component';

describe('UserTooltipComponent', () => {
  let component: UserTooltipComponent;
  let fixture: ComponentFixture<UserTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
