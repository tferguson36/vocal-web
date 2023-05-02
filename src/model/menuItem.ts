import type { ExerciseType } from './exercise'
import type { ExerciseStatus } from './status'

export type MenuItem = {
    type: ExerciseType
    status: ExerciseStatus
    score: number | undefined
    route: string
}