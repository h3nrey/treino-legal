import { Injectable } from '@angular/core';
import { Exercise, ReqParams, Training, TrainingResponse } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { buildHttpParams } from '../utils/utils';

interface TrainingRes {

}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  readonly apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }


  getPopularTrainings(params: ReqParams): Observable<TrainingResponse>{
    const httpParams = buildHttpParams({...params});

    return this.http.get<TrainingResponse>(`${this.apiUrl}/trainings`, { params: httpParams})
  }

  getTraining(id: string): Observable<Training> {
    const url = `${this.apiUrl}/trainings/${id}`;
    
    return this.http.get<any>(url).pipe(
      map(res => {
        const data = res.data;
        return {
          ...data,
          exercises: data.TraningExercises.map((exercise: {exercise: Exercise, reps: number, sets: number}) => ({
            ...exercise.exercise,
            reps: exercise.reps,
            sets: exercise.sets
          })),
        } as Training;
      })
    );
  } 
}
