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