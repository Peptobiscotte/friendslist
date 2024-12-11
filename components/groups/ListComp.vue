<template>
    <div class="py-3 px-8 flex items-center hover:bg-slate-800 gap-2" :class="activeClass" @click="navigateContact">
        <div class="flex" v-for="member in activeMembersTruncate">
            <NuxtImg :src="imageUrl(member.userNb)" class="w-12 bg-slate-300 rounded-full border-2 border-slate-900 transistion ease-in-out duration-150 hover:scale-110 hover:z-10"></NuxtImg>
        </div>
        <div class="flex flex-col">
            <h1 class="text-slate-300 font-semibold text-lg truncate">{{ groupName }}</h1>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['groupName', 'groupMembers', 'contacts', 'groupId'])


const groupMembersId = props.groupMembers.map(obj => obj.userId)

const activeMembers = props.contacts.filter(contact => groupMembersId.includes(contact.userId))

const activeMembersTruncate = activeMembers.slice(0, 3)

const imageUrl = function(num) {
    if(num === 1) return '/chameleon.svg'
    if(num === 2) return '/butterfly.svg'
    if(num === 3) return '/elk.svg'
    if(num === 4) return '/mianyang.svg'
    if(num === 5) return '/octopus.svg'
    if(num === 6) return '/rooster.svg'
    if(num === 7) return '/toucan.svg'
    if(num === 8) return '/turtle.svg'
    if(num === 9) return '/whale.svg'
    if(num === 10) return '/giraffe.svg'
}

const route = useRoute()

const activeClass = computed(() => {
    if(route.path === `/groups/${props.groupId}`) {
        return 'bg-slate-700'
    } else {
        return 'hover:bg-slate-800'
    }
})

const router = useRouter()

const navigateContact = function() {
    router.push(`/groups/${props.groupId}`)
}
</script>