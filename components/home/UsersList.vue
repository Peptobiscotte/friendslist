<template>
    <div class="flex flex-col items-center border-2 border-slate-700 py-8 px-8 rounded-md">
        <h1 class="text-4xl font-semibold">{{ fullName }}</h1>
        <p class="italic text-2xl">{{ userDesc }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['userName', 'userLastName', 'userDesc'])

const fullName = computed(() => {
    return props.userName + ' ' + props.userLastName
})

</script>