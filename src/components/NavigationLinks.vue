<script setup lang="ts">
import { exerciseRoutes } from '@/model/exercise'
</script>

<template>
    <li>
        <RouterLink to="/">Home</RouterLink>
    </li>
    <li v-for="type in exerciseRoutes.keys()">
        <RouterLink :to="exerciseRoutes.get(type) as string">
            {{ type }}
        </RouterLink>
    </li>
</template>