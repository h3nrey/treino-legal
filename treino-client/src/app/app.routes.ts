import { Routes } from '@angular/router';
import { ListExercisesComponent } from './pages/list-exercises/list-exercises.component';
import { ExerciseDetailsComponent } from './pages/exercise-details/exercise-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ExerciseSectionComponent } from './pages/exercise-section/exercise-section.component';

export const routes: Routes = [
    // { path: "exercises/:musclegroup", component: ListExercisesComponent },
    { path: "exercises/:exercise", component: ExerciseDetailsComponent },
    { path: "exercises", component: HomeComponent },
    { path: "exercises/section/:sectionType", component: ExerciseSectionComponent }

];
