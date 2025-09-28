import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedExerciseCardComponent } from './selected-exercise-card.component';

describe('SelectedExerciseCardComponent', () => {
  let component: SelectedExerciseCardComponent;
  let fixture: ComponentFixture<SelectedExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedExerciseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
