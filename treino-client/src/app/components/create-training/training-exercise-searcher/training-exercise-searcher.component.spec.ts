import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExerciseSearcherComponent } from './training-exercise-searcher.component';

describe('TrainingExerciseSearcherComponent', () => {
  let component: TrainingExerciseSearcherComponent;
  let fixture: ComponentFixture<TrainingExerciseSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingExerciseSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingExerciseSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
