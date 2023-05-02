<script setup lang="ts">
import type { ExerciseType } from '@/model/exercise'
import { useExerciseStore } from '@/stores/exerciseStore'
import { computed, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
    desc: string,
    prompts?: string[],
    shuffle?: () => string,
    rounds: number,
    type: ExerciseType,
    time?: number
}>()

const router = useRouter()
const excerciseStore = useExerciseStore()

const count = ref(0)
const timeSec = ref(props.time)
const rounds = props.rounds
const currentPrompt = ref(props.prompts?.pop() || (props.shuffle && props.shuffle()))
const roundsCount = ref(0)
const scores = ref([] as number[])
const started = ref(false)
const clockInterval = ref(0)

const descDisp = computed(() => `${roundsCount.value + 1}/${rounds} - ${props.desc}`)

const timeDisp = computed(() => {
    if (!timeSec.value) return ''

    const minute = Math.floor(timeSec.value / 60) || ''
    const remainder = timeSec.value % 60
    const remainderStr = remainder === 0
        ? '00'
        : remainder < 10
            ? '0' + remainder
            : remainder

    return `${minute}:${remainderStr}`
})

function increment() {
    if (!started.value && props.time) {
        started.value = true
        clockInterval.value = setInterval(countDown, 1000)
        return
    }

    count.value++

    if (props.shuffle) {
        currentPrompt.value = props.shuffle()
    }
}

function decrement() {
    if (count.value) count.value--
}

function countDown() {
    if (timeSec.value) {
        timeSec.value--
    }
    if (!timeSec.value) {
        clearInterval(clockInterval.value)
        roundDone()
    }
}

function roundDone() {
    scores.value.push(count.value)

    // alerts are stopping page refresh
    if (++roundsCount.value === rounds) {
        setTimeout(done, 100)
    } else {
        const roundsLeft = rounds - roundsCount.value
        setTimeout(() => {
            alert(`You scored ${count.value}.\n\n${roundsLeft} round${roundsLeft > 1 ? 's' : ''} left.\n\nProceed when ready.`)
            prepareNextRound()
        }, 100)
    }

}

function prepareNextRound() {
    count.value = 0
    currentPrompt.value = props.prompts?.pop() || (props.shuffle && props.shuffle())
    timeSec.value = props.time
    clockInterval.value = setInterval(countDown, 1000)
}

function done() {
    const totalScore = scores.value.reduce((prev, curr) => prev + curr, 0) / scores.value.length
    let alertStr = `Total score: ${totalScore} (per ${props.time} sec)\n\n`
    scores.value.forEach((val, idx) => alertStr += `Round ${idx + 1}: ${val}\n`)
    alert(alertStr)


    excerciseStore.addExercise({
        type: props.type,
        date: new Date(),
        score: totalScore
    })

    router.push('/')
}

onUnmounted(() => clearInterval(clockInterval.value))
</script>

<template>
    <main class="flex-1 flex flex-col justify-between items-center pt-10 pb-2 w-4/5 sm:w-2/5 mx-auto">

        <div class="flex-1 flex flex-col justify-between items-center mb-12">
            <p>{{ descDisp }}</p>

            <h1 class="text-accent text-2xl font-bold" v-html="currentPrompt"></h1>

            <div>
                <h2 class="text-xl">Score: {{ count }}</h2>
                <span class="text-sm">{{ timeDisp }}</span>
            </div>
        </div>

        <button v-if="!shuffle" class="btn btn-accent w-full h-1/6 text-6xl" :class="{ invisible: !started }" @click="decrement">
            -
        </button>
        <button class="btn btn-primary w-full h-2/6 text-4xl" @click="increment">
            {{ !started && time ? 'Start' : 'Next' }}
        </button>
    </main>
</template>