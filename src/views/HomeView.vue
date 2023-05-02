<script setup lang="ts">
import HomeMenuItem from '@/components/HomeMenuItem.vue'
import { ExerciseType } from '@/model/exercise';
import type { MenuItem } from '@/model/menuItem';
import { ExerciseStatus } from '@/model/status'
import { useExerciseStore } from '@/stores/exerciseStore';
import {exerciseRoutes} from '@/model/exercise';

const exerciseStore = useExerciseStore()
const todaysExercises = exerciseStore.todaysExercises
const previousExercises = exerciseStore.previousExercises

const menuItems: MenuItem[] = Object.values(ExerciseType)
    .map(type => ({
        type,
        status: !todaysExercises.get(type) 
            ? ExerciseStatus.TODO
            : !previousExercises.get(type) || todaysExercises.get(type)!.score >= previousExercises.get(type)!.score
                ? ExerciseStatus.BETTER_RESULTS
                : ExerciseStatus.WORSE_RESULTS,
        score: todaysExercises.get(type)?.score,
        route: exerciseRoutes.get(type) as string
    }))
</script>

<template>
    <main class="flex flex-col justify-center items-center">

        <h1 class="mt-10 mb-5 text-primary text-2xl font-bold">
            Today's Scorecard
        </h1>

        <div class="w-4/5 sm:w-1/5">
            <HomeMenuItem v-for="item in menuItems"
                :status="item.status"
                :score="item.score"
                :title="item.type"
                :route="item.route"
            />
        </div>
    </main>
</template>
