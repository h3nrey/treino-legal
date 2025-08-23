export interface PaginatedResponse<T> {
    data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  sort?: {
    sortBy: string;
    order: 'asc' | 'desc';
  };
}

export interface ExerciseResponse extends PaginatedResponse<Exercise> {}

export interface Training {
    id: number,
    title: string,
    description: string,
    type: string,
    duration: number,
    experienceLevel: string,
    exercises: TrainingExercise[],
    thumbnailUrl: string,

}

export interface TrainingExercise extends Exercise {
    reps: number,
    sets: number,
}

export interface Exercise {
    id: number,
    name: string,
    description?: string,
    thumbnailUrl?: string,
    tutorialUrl?: string,
    type: string,
    level: string,
}

export interface Muscle {
    id: number,
    name: string
    technicalName: string,
    motorAction:string,
    description?: string
    synergists: string,
    antagonists: string
    imageUrl?: string
}

export interface Equipament {
    id: number,
    name: string
    description?: string,
    imageUrl?: string
}

export interface ReqParams {
    page: number,
    count?: number,
    search?: string,
    sortBy?: string
}

export interface User {
    username: string,
    email: string,
    id: string,
}

export interface Enviroment {
    production: boolean,
    apiUrl: string,
}