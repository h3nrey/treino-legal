import { Injectable } from '@angular/core';
import { exercises } from '../../data';
import { Observable, of } from 'rxjs';
import { Equipament, Exercise, Muscle, ReqParams } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';



export interface ExerciseParams extends ReqParams {
  equipament?: string,
  muscle?: string,
  experienceLevel?: string
}

interface DefaultRes {
  currentPage: number,
  totalCount: number,
  data: any,
}

export interface ExerciseReponse extends DefaultRes {
  data: Exercise[]
}

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  readonly apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  async listMusclesByMuscleGroup(muscleGroup: string) {
    const exercisesList = exercises.filter(exercise => exercise.type == muscleGroup)
    return exercisesList;
  }

  getPopularExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises?sort_by=popularity&page=0&count=3`)
  }

  getExercises(params: ExerciseParams): Observable<ExerciseReponse> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => {
          httpParams = httpParams.append(key, val);
        });
      } else {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<ExerciseReponse>(`${this.apiUrl}/exercises`, { params: httpParams })
  }

  getExerciseById(id: string): Observable<any> {
    const exercise = this.http.get(`${this.apiUrl}/exercises/${id}`)
    return exercise;
  }

  getMuscles(): Observable<Muscle[]> {
    return this.http.get<Muscle[]>(`${this.apiUrl}/muscles`)
  }
  getMuscle(muscleName: string): Observable<Muscle> {
    return this.http.get<Muscle>(`${this.apiUrl}/muscles/${muscleName}`)
  }

  getEquipaments(equipament: string = ''): Observable<Equipament[]> {
    return this.http.get<Equipament[]>(`${this.apiUrl}/equipaments?name=${equipament}`)
  }

  // searchExercises(searchTerm): Observable<any> {
  //   // const data =
  // }
}
