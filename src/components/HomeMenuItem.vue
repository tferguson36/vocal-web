<script setup lang="ts">
import {ExerciseStatus} from '@/model/status.js'
import Checkmark from './icons/Checkmark.vue'
import router from '@/router'

const {status, route, score} = defineProps<{
    status: ExerciseStatus,
    route: string,
    title: string,
    score?: number
}>()

const bgColor = {
    'bg-base-300': status == ExerciseStatus.TODO,
    'bg-red-200': status == ExerciseStatus.WORSE_RESULTS,
    'bg-green-200': status == ExerciseStatus.BETTER_RESULTS
}

const visibility = {
    'visible': status !== ExerciseStatus.TODO,
    'invisible': status == ExerciseStatus.TODO
}

function navigate() {
    router.push(route)
}
</script>

<template>
    <div 
        class="px-6 py-3 sm:px-12 sm:py-6 bg-base-300 flex justify-between cursor-pointer"
        :class="bgColor"
        @click="navigate"
    >
        <Checkmark :class="visibility" />
        <div>{{ title }}</div>
        <div :class="visibility">{{ score || '00' }}</div>
    </div>
</template>