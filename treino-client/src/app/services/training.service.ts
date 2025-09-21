import { Injectable } from '@angular/core';
import { Exercise, ReqParams, Training, TrainingResponse } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { buildHttpParams } from '../utils/utils';

interface TrainingRes {}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  favoritetraining(id: number) {
    return this.http.post(`${this.apiUrl}/trainings/${id}/favorites`, {});
  }
  unFavoritetraining(id: number) {
    return this.http.delete(`${this.apiUrl}/trainings/${id}/favorites`);
  }

  getPopularTrainings(params: ReqParams): Observable<TrainingResponse> {
    const httpParams = buildHttpParams({ ...params });

    return this.http.get<TrainingResponse>(`${this.apiUrl}/trainings`, { params: httpParams });
  }

  getRelatedTrainings(id: string): Observable<Training[]> {
    const url = `${this.apiUrl}/trainings/${id}/related`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        const data = res.data;
        return data;
      })
    );
  }

  getTraining(id: string): Observable<Training> {
    const url = `${this.apiUrl}/trainings/${id}`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        const data = res.data;
        console.log(data);
        return {
          ...data,
          exercises: data.exercises,
        } as Training;
      })
    );
  }
}
