<template>
    <div class="flex gap-4 px-8 py-3 items-center transition ease-in-out delay-50" :class="activeClass" @click="navigateContact">
        <NuxtImg :src=imageUrl class="h-12 bg-slate-300 rounded-full"></NuxtImg>
        <div class="flex flex-col">
            <h1 class="text-slate-300 font-semibold text-lg">{{ fullName }}</h1>
            <p>{{ userDesc }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['userName', 'userLastName', 'userDesc', 'userNb', 'userId'])
const router = useRouter()
const route = useRoute()

const activeClass = computed(() => {
    if(route.path === `/users/${props.userId}`) {
        return 'bg-slate-700'
    } else {
        return 'hover:bg-slate-800'
    }
})

const fullName = computed(() => {
    return props.userName + ' ' + props.userLastName
})

const navigateContact = function() {
    router.push(`/users/${props.userId}`)
}

const imageUrl = computed(() => {
    if(props.userNb === 1) return '../public/chameleon.svg'
    if(props.userNb === 2) return '../public/butterfly.svg'
    if(props.userNb === 3) return '../public/elk.svg'
    if(props.userNb === 4) return '../public/mianyang.svg'
    if(props.userNb === 5) return '../public/octopus.svg'
    if(props.userNb === 6) return '../public/rooster.svg'
    if(props.userNb === 7) return '../public/toucan.svg'
    if(props.userNb === 8) return '../public/turtle.svg'
    if(props.userNb === 9) return '../public/whale.svg'
    if(props.userNb === 10) return '../public/giraffe.svg'
})

</script>