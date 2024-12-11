<template>
        <tr class="border-t border-slate-700 hover:bg-slate-800 px-4 transition ease-in-out delay-50" @click="navigateContact">
            <td class="py-4 pl-8 text-slate-300 flex items-center gap-2">
                <NuxtImg :src=imageUrl class="w-8 bg-slate-300 rounded-full p-0.5"></NuxtImg>
                {{ fullName }}
            </td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="/mail.svg" class="w-4"></NuxtImg>{{ userEmail }}</div></td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="/phone.svg" class="w-4"></NuxtImg>{{ userPhone }}</div></td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="/family.svg" class="w-4"></NuxtImg>{{ userType }}</div></td>
        </tr>
</template>

<script setup>

const router = useRouter()
const props = defineProps(['userName', 'userLastName', 'userDesc', 'userEmail', 'userPhone', 'userType', 'userId', 'userNb'])

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