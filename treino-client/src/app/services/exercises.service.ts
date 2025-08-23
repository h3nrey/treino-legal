import { Injectable } from '@angular/core';
import { exercises } from '../../data';
import { Observable, of } from 'rxjs';
import { Equipament, Exercise, ExerciseResponse, Muscle, ReqParams } from '../utils/interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './users.service.ts.service';
import { environment } from '../../enviroments/enviroment';
import { buildHttpParams } from '../utils/utils';



export interface ExerciseParams extends ReqParams {
  equipament?: string,
  muscle?: string,
  experienceLevel?: string
}

interface DefaultRes {
  currentPage: number,
  data: any,
  totalCount: number,
}

export interface ExerciseReponse extends DefaultRes {
  data: Exercise[]
}
@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  readonly apiUrl = environment.apiUrl
  constructor(private http: HttpClient, private userService: UserService) { }

  async listMusclesByMuscleGroup(muscleGroup: string) {
    const exercisesList = exercises.filter(exercise => exercise.type == muscleGroup)
    return exercisesList;
  }

  getPopularExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises?sort_by=popularity&page=0&count=3`)
  }

  getExercises(params: ExerciseParams): Observable<ExerciseResponse> {
    const httpParams = buildHttpParams({ ...params});
    return this.http.get<ExerciseResponse>(`${this.apiUrl}/exercises`, { params: httpParams })
  }

  getFavoritedExercises() {
    return this.http.get<Exercise[]>(`${this.apiUrl}/users/me/favorites`)
  }

  favoriteExercise(exerciseId: number) {
    const token = this.userService.getToken()
    if (!token) return of(false);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post(`${this.apiUrl}/users/me/favorites/${exerciseId}`, null, { headers });
  }

  unFavoriteExercise(exerciseId: number) {
    const token = this.userService.getToken();
    if (!token) return of([])
    return this.http.delete(`${this.apiUrl}/users/me/favorites/${exerciseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
