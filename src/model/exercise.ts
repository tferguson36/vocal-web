export type Exercise = {
    type: ExerciseType,
    date: Date,
    score: number
}

export enum ExerciseType {
    PHONETIC_FLUENCY = 'Phonetic Fluency',
    SEMANTIC_FLUENCY = 'Semantic Fluency',
    ASSOCIATION = 'Association',
    COMMONALITY = 'Commonality'
}

export const exerciseRoutes = new Map<ExerciseType, string>([
    [ExerciseType.PHONETIC_FLUENCY, '/phonetic'],
    [ExerciseType.SEMANTIC_FLUENCY, '/semantic'],
    [ExerciseType.ASSOCIATION, '/association'],
    [ExerciseType.COMMONALITY, '/commonality'],
])