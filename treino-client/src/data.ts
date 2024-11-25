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
        name: "supino horizontal barra",
        type: types.chest,
        level: difficulty.advance,
        coverUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
    {
        name: "supino horizontal barra",
        type: types.chest,
        level: difficulty.advance,
        coverUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
    {
        name: "triceps na polia",
        type: types.triceps,
        level: difficulty.advance,
        coverUrl: "https://totalpass.com/wp-content/uploads/2024/07/supino-reto.jpg"
    },
]
