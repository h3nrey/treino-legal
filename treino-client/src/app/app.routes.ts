import { Routes } from '@angular/router';
import { ListExercisesComponent } from './pages/list-exercises/list-exercises.component';
import { ExerciseDetailsComponent } from './pages/exercise-details/exercise-details.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    // { path: "exercises/:musclegroup", component: ListExercisesComponent },
    { path: "exercise/:exercise", component: ExerciseDetailsComponent },
    { path: "", component: HomeComponent}

];
