import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ExerciseType, type Exercise } from '@/model/exercise'

const LOCAL_STORAGE_KEY = 'exercises'

export const useExerciseStore = defineStore('exercise', () => {
    const rawExercises = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as Exercise[]
    rawExercises.forEach(ex => ex.date = new Date(ex.date))

    const exercises = ref(rawExercises)

    function addExercise(exercise: Exercise) {
        const existing = exercises.value.findIndex((ex) => isToday(ex.date) && ex.type === exercise.type)
        if (existing > -1) {
            exercises.value.splice(existing, 1)
        }

        exercises.value.push(exercise)

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(exercises.value))
    }

    const todaysExercises = computed(() => {
        const todaysExercises = new Map<ExerciseType, Exercise>()

        exercises.value.filter((ex) => isToday(ex.date)).forEach((ex) => todaysExercises.set(ex.type, ex))

        return todaysExercises
    })

    const previousExercises = computed(() => {
        const previousExercises = new Map<ExerciseType, Exercise>()

        Object.values(ExerciseType).forEach((type) => {
            let i = exercises.value.length - 1
            while (i > -1) {
                const ex = exercises.value[i--]
                if (ex.type === type && !isToday(ex.date)) {
                    previousExercises.set(ex.type, ex)
                    break
                }
            }
        })

        return previousExercises
    })

    return { todaysExercises, previousExercises, addExercise }
})

function isToday(someDate: Date) {
    const today = new Date()
    return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear()
}
