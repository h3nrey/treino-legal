import { Routes } from '@angular/router';
import { ListExercisesComponent } from './pages/list-exercises/list-exercises.component';

export const routes: Routes = [
    {path: "exercises/:musclegroup", component: ListExercisesComponent}
];
