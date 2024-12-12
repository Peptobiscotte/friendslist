<template>
    <div class="flex gap-4 px-8 py-3 items-center transition ease-in-out delay-50 font-poppins" :class="activeClass" @click="navigateContact">
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
    if(props.userNb === 1) return '/chameleon.svg'
    if(props.userNb === 2) return '/butterfly.svg'
    if(props.userNb === 3) return '/elk.svg'
    if(props.userNb === 4) return '/mianyang.svg'
    if(props.userNb === 5) return '/octopus.svg'
    if(props.userNb === 6) return '/rooster.svg'
    if(props.userNb === 7) return '/toucan.svg'
    if(props.userNb === 8) return '/turtle.svg'
    if(props.userNb === 9) return '/whale.svg'
    if(props.userNb === 10) return '/giraffe.svg'
})

</script>