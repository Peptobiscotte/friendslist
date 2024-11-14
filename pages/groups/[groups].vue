<template>
    <div class="flex h-[calc(100vh-57px)]">
        <div class="basis-1/4 border-r-2 border-slate-800 flex flex-col overflow-auto scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div class="flex justify-center p-8">
                <GroupsAddGroupDialog :contacts="contacts"></GroupsAddGroupDialog>
            </div>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
            <GroupsListComp></GroupsListComp>
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
        </div>
    </div>
</template>

<script setup>
const contacts = await $fetch('/api/getMembers')
</script>