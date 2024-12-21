import { Injectable } from '@angular/core';
import { exercises } from '../../data';
import { Observable, of } from 'rxjs';
import { Exercise } from '../utils/interfaces';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  readonly apiUrl = 'localhost'
  // constructor(private http: HttpClient) { }

  async listMusclesByMuscleGroup(muscleGroup: string) {
    console.log(muscleGroup);
    const exercisesList = exercises.filter(exercise => exercise.type == muscleGroup)
    console.log(exercisesList)
    return exercisesList;
  }

  getExerciseById(id: string): Observable<any> {
    const data = exercises.find(exercise => exercise.name == id);
    return of(data);
    // return this.http.get(`${}`)
  }

  // searchExercises(searchTerm): Observable<any> {
  //   // const data =
  // }
}
