import { Exercise } from "./app/utils/interfaces"

const types = {
    triceps: "triceps",
    biceps: "biceps",
    chest: "peitoral",
    quads: "quadriceps"
}

export const equipaments = [
    { value: 1, label: "Halteres" },
    { value: 2, label: "Supino" },
    { value: 3, label: "Máquina" },
    { value: 4, label: "Smith" }
]

export const muscles = [
    { value: 1, label: "BÍCEPS" },
    { value: 2, label: "TRÍCEPS" },
    { value: 3, label: "PEITORAL" },
    { value: 4, label: "QUADRÍCEPS" }
]


const difficulty = {
    novice: "FRANGO",
    bigginer: "iniciante",
    intermediary: "intermediário",
    advance: "avançado"
}

export const goals = [
    { value: "STRENGTH_GAIN", label: "FORÇA" },
    { value: "CARDIO", label: "CARDIO" },
    { value: "MUSCLE_GAIN", label: "HIPERTROFIA" },
    { value: "WEIGHT_LOSS", label: "PERDA DE PESO" }
]