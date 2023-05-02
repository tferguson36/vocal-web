<script setup lang="ts">
import { ExerciseType } from '@/model/exercise'
import ShuffledExercise from '@/components/ShuffledExercise.vue'
import { ref } from 'vue';
import getRandomFunc from '@/services/randomService'
import topics from '@/assets/topics.json'

const getUniqueRandom = getRandomFunc()

const prompts = ref([
    topics[getUniqueRandom(topics.length)],
    topics[getUniqueRandom(topics.length)]
])
</script>

<template>
    <ShuffledExercise 
        desc="Name as many things belonging to the given category:" 
        :prompts="prompts"
        :time="60"
        :rounds="2"
        :type="ExerciseType.SEMANTIC_FLUENCY"
    />
</template>