<template>
    <div class="flex h-[calc(100vh-57px)] font-poppins">
        <div class="basis-1/4 2xl:basis-1/5 border-r-2 border-slate-800 flex flex-col overflow-auto scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div class="flex justify-center p-8">
                <GroupsAddGroupDialog :contacts="contacts" :userId="userId" :token="token"></GroupsAddGroupDialog>
            </div>
            <div v-for="group in groups">
                <GroupsListComp :groupName="group.groupName" :groupMembers="group.groupMembers" :contacts="contacts" :groupId="group.groupId"></GroupsListComp>
            </div>
        </div>
        <div class="basis-3/4">
            <div class="flex justify-between">
                <div class="m-4">
                    <NuxtLink to="/about">
                        <div class="flex justify-center items-center gap-1 max-w-32 hover:text-slate-300 transition ease-in-out duration-300">
                            <NuxtImg src="/arrowup.svg" class="h-3 -rotate-90 translate-y-[1px]"></NuxtImg>
                            <p>Contact List</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="flex flex-col items-center gap-4">
                <NuxtImg :src="imageUrl(activeMembers[0].userNb)" class="h-32 bg-slate-300 rounded-full"></NuxtImg>
                <h1 class="text-4xl text-slate-300 font-bold">{{ activeGroup.groupName }}</h1>
                <h2 class="text-xl text-slate-400 font-semibold">{{ allNamesString }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
const userId = useCookie('userId')
const token = useCookie('token')

    const contacts = await $fetch('/api/getMembers', {
        query: {
            id: userId.value,
            token: token.value
        }
    })
    const groups = await $fetch('/api/getGroups', {
        query: {
            id: userId.value,
            token: token.value
        }
    })
    

const route = useRoute()
const id = route.params.groups

const [activeGroup] = groups.filter((group) => group.groupId === id)
const groupMembersId = activeGroup.groupMembers.map(key => key.userId)
const activeMembers = contacts.filter(contact => groupMembersId.includes(contact.userId))

const allNames = activeMembers.map((member) => member.userName)

const allNamesString = computed(() => {
    if(allNames.length <= 3) {
        const stringNames = allNames.join(', ')
        return stringNames
    } else {
        const stringNames = allNames.slice(0,3).join(', ')
        return stringNames + ' ' + 'and others'
    }
})

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
</script>