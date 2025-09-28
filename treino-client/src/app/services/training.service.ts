import { Injectable } from '@angular/core';
import { Exercise, ReqParams, Training, TrainingResponse, User } from '../utils/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { map, Observable, switchMap } from 'rxjs';
import { buildHttpParams } from '../utils/utils';
import { UserService } from './users.service.ts.service';

interface TrainingRes {}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  readonly apiUrl = environment.apiUrl;
  user: User | null = null;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

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

  createTraininig(training: Training) {
    console.log('training service');
    return this.userService.getUser().pipe(
      map((res) => ({
        ...training,
        duration: Number(training.duration),
        exercises: training.exercises.map((e) => ({ exerciseId: e.id })),
        userId: res?.id,
      })),
      switchMap((formattedTraining) =>
        this.http.post(`${this.apiUrl}/trainings/`, formattedTraining)
      )
    );
  }
}
