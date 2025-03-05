import { Routes } from '@angular/router';
import { ListExercisesComponent } from './pages/list-exercises/list-exercises.component';
import { ExerciseDetailsComponent } from './pages/exercise-details/exercise-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ExerciseSectionComponent } from './pages/exercise-section/exercise-section.component';
import { ExercisesHomeComponent } from './pages/exercises-home/exercises-home.component';

export const routes: Routes = [
    // { path: "exercises/:musclegroup", component: ListExercisesComponent },
    { path: "", component: HomeComponent },
    { path: "exercises/:exercise", component: ExerciseDetailsComponent },
    { path: "exercises", component: ExercisesHomeComponent },
    { path: "exercises/section/:sectionType", component: ExerciseSectionComponent }

];
