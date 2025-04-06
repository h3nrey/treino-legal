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
    description?: string
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
    count: number,
    search?: string,
    sortBy?: string
}

export interface User {
    username: string,
    email: string,
}