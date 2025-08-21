import { Injectable } from '@angular/core';
import { Exercise, ReqParams, Training } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { map, Observable } from 'rxjs';

interface TrainingRes {

}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  readonly apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }


  getPopularTrainings(params: ReqParams): Observable<{data: Training[]}>{
    let httpParams: HttpParams =  new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(val => {
          httpParams = httpParams.append(key, val);
        });
      } else {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<{data: Training[]}>(`${this.apiUrl}/trainings`, { params: httpParams})
  }

  getTraining(id: string): Observable<Training> {
    const url = `${this.apiUrl}/trainings/${id}`;
    
    return this.http.get<any>(url).pipe(
      map(res => {
        const data = res.data;
        console.log(data);
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
