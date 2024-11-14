<template>
        <tr class="border-t border-slate-700 hover:bg-slate-800 px-4 transition ease-in-out delay-50" @click="navigateContact">
            <td class="py-4 pl-8 text-slate-300 flex items-center gap-2">
                <NuxtImg :src=imageUrl class="w-8 bg-slate-300 rounded-full p-0.5"></NuxtImg>
                {{ fullName }}
            </td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="../public//mail.svg" class="w-4"></NuxtImg>{{ userEmail }}</div></td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="../public//phone.svg" class="w-4"></NuxtImg>{{ userPhone }}</div></td>
            <td class="text-slate-300"><div class="flex gap-2"><NuxtImg src="../public//family.svg" class="w-4"></NuxtImg>{{ userType }}</div></td>
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