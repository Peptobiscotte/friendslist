<template>
    <div class="py-3 px-8 flex items-center gap-4 transition ease-in-out duration-300 font-poppins" :class="activeClass" @click="goToMessages">
        <NuxtImg src="/giraffe.svg" class="w-12 bg-slate-300 rounded-full border-2 border-slate-900"></NuxtImg>
        <h1 class="text-slate-300 font-semibold text-lg truncate">{{ name }}</h1>
    </div>
</template>

<script setup>
    const route = useRoute()
    const props = defineProps(['id', 'loggedId', 'name'])

const goToMessages = function() {
    navigateTo(`/${props.loggedId}/messages/${props.id}`)
}

const activeClass = computed(() => {
    if(route.path === `/${props.loggedId}/messages/${props.id}`) {
        return 'bg-slate-700'
    } else {
        return 'hover:bg-slate-800'
    }
})

</script>