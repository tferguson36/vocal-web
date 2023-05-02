<script setup lang="ts">
import ShuffledExercise from '@/components/ShuffledExercise.vue';
import { ExerciseType } from '@/model/exercise';
import { ref } from 'vue';
import getRandomFunc from '@/services/randomService'
import nouns from '@/assets/nouns.json'

const getUniqueRandom = getRandomFunc()

const prompts = ref([
    nouns[getUniqueRandom(nouns.length)],
    nouns[getUniqueRandom(nouns.length)]
])
</script>

<template>
    <ShuffledExercise
        desc="Chain words of association:" 
        :prompts="prompts"
        :time="60"
        :rounds="2"
        :type="ExerciseType.ASSOCIATION"
    />
</template>