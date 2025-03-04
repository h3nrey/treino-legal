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
}

export interface Equipament {
    id: number,
    name: string
}

export interface ReqParams {
    page: number,
    count: number,
    sortBy: string
}
