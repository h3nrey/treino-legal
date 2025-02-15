import { Exercise } from "./app/utils/interfaces"

const types = {
    triceps: "triceps",
    biceps: "biceps",
    chest: "peitoral",
    quads: "quadriceps"
}

const difficulty = {
    novice: "FRANGO",
    bigginer: "iniciante",
    intermediary: "intermediário",
    advance: "avançado"
}

export const exercises: Exercise[] = [
    {
        id: 0,
        name: "supino horizontal barra",
        type: types.chest,
        level: difficulty.advance,
        thumbnailUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
    {
        id: 1,
        name: "supino horizontal barra",
        type: types.chest,
        level: difficulty.advance,
        thumbnailUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
    {
        id: 2,
        name: "triceps na polia",
        type: types.triceps,
        level: difficulty.advance,
        thumbnailUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
]
