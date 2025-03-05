import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesHomeComponent } from './exercises-home.component';

describe('ExercisesHomeComponent', () => {
  let component: ExercisesHomeComponent;
  let fixture: ComponentFixture<ExercisesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
