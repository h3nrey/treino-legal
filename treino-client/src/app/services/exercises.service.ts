import { Injectable } from '@angular/core';
import { exercises } from '../../data';
import { Observable, of } from 'rxjs';
import { Equipament, Exercise, Muscle } from '../utils/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  readonly apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  async listMusclesByMuscleGroup(muscleGroup: string) {
    console.log(muscleGroup);
    const exercisesList = exercises.filter(exercise => exercise.type == muscleGroup)
    console.log(exercisesList)
    return exercisesList;
  }

  getPopularExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises?sort_by=popularity`)
  }

  getExerciseById(id: string): Observable<any> {
    const exercise = this.http.get(`${this.apiUrl}/exercises/${id}`)
    return exercise;
  }

  getMuscles(): Observable<Muscle[]> {
    return this.http.get<Muscle[]>(`${this.apiUrl}/muscles`)
  }

  getEquipaments(): Observable<Equipament[]> {
    return this.http.get<Equipament[]>(`${this.apiUrl}/equipaments`)
  }

  // searchExercises(searchTerm): Observable<any> {
  //   // const data =
  // }
}
