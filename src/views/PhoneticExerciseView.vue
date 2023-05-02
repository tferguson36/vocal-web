<script setup lang="ts">
import { ExerciseType } from '@/model/exercise'
import ShuffledExercise from '@/components/ShuffledExercise.vue';
import { ref } from 'vue';
import getRandomFunc from '@/services/randomService'

const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getUniqueRandom = getRandomFunc()

const prompts = ref([
    alpha[getUniqueRandom(26)],
    alpha[getUniqueRandom(26)]
])
</script>

<template>
    <ShuffledExercise 
        desc="Name as many words as you can beginning with the letter:" 
        :prompts="prompts"
        :time="60"
        :rounds="2"
        :type="ExerciseType.PHONETIC_FLUENCY"
    />
</template>