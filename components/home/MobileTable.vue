<script setup>

const router = useRouter()
const props = defineProps(['userName', 'userLastName', 'userId', 'userNb'])

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

<template>
    <div class="flex flex-col px-8" @click="navigateContact">
        <div class="flex items-center gap-2">
            <NuxtImg :src=imageUrl class="w-12 bg-slate-300 rounded-full p-0.5"></NuxtImg>
            <p class="text-xl">{{ fullName }}</p>
        </div>
    </div>
</template>