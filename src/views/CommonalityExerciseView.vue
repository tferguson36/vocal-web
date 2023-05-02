<script setup lang="ts">
import ShuffledExercise from '@/components/ShuffledExercise.vue'
import { ExerciseType } from '@/model/exercise'
import { ref } from 'vue';
import getRandomFunc from '@/services/randomService'
import nouns from '@/assets/nouns.json'

const getUniqueRandom = getRandomFunc()
const getPrompt = () => `${nouns[getUniqueRandom(nouns.length)]}<br/><br/>${nouns[getUniqueRandom(nouns.length)]}`
</script>

<template>
    <ShuffledExercise 
        desc="Name a word in common with the following words:" 
        :shuffle="getPrompt"
        :time="60"
        :rounds="2"
        :type="ExerciseType.ASSOCIATION"
    />
</template>