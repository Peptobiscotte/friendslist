<template>
    <div class="flex h-[calc(100vh-57px)]">
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
                            <NuxtImg src="../public/arrowup.svg" class="h-3 -rotate-90 translate-y-[1px]"></NuxtImg>
                            <p>Contact List</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
            <div class="flex flex-col items-center gap-4">
                <h1>This is your groups</h1>
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
</script>