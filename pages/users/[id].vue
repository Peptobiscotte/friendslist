<template>
    <div class="flex h-[calc(100vh-57px)]">
        <div class="basis-1/4 border-r-2 border-slate-800 flex flex-col overflow-auto pt-8 scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent max-h-screen">
            <div v-for="contact in dataSorted">
                <HomeContactDetailList :userName="contact.userName" :userLastName="contact.userLastName" :userDesc="contact.userDesc" :userNb="contact.userNb" :userId="contact.userId"></HomeContactDetailList>
            </div>
        </div>
        <div class="basis-3/4 max-h-screen">
            <div class="flex justify-between">
                <div class="m-4">
                    <NuxtLink to="/about">
                        <div class="flex justify-center items-center gap-1 max-w-32 hover:text-slate-300 transition ease-in-out duration-300">
                            <NuxtImg src="../public/arrowup.svg" class="h-3 -rotate-90 translate-y-[1px]"></NuxtImg>
                            <p>Contact List</p>
                        </div>
                    </NuxtLink>
                </div>
                <div class="flex pr-8 gap-4">
                    <HomeEditModal :userName="member.userName" :userLastName="member.userLastName" :userDesc="member.userDesc" :userEmail="member.userEmail" :userPhone="member.userPhone" :userType="member.userType" :userNb="member.userNb" :userId="member.userId"></HomeEditModal>
                    <HomeDeleteModal ></HomeDeleteModal>
                </div>
            </div>
            <div class="flex flex-col items-center gap-4">
                <NuxtImg :src=imageUrl class="h-32 bg-slate-300 rounded-full"></NuxtImg>
                <h1 class="text-4xl text-slate-300 font-bold">{{ fullName }}</h1>
                <h2 class="text-xl text-slate-400 font-semibold">{{ userDesc }}</h2>
            </div>
            <div class="mx-16 mt-8 flex flex-col gap-8">
                <div class="flex gap-6 items-center">
                    <NuxtImg src="../public/family.svg" class="h-8"></NuxtImg>
                    <h2 class="text-xl font-medium">{{ member.userType }}</h2>
                </div>
                <div class="flex gap-6 items-center">
                    <NuxtImg src="../public/mail.svg" class="h-8"></NuxtImg>
                    <h2 class="text-xl font-medium">{{ member.userEmail }}</h2>
                </div>
                <div class="flex gap-6 items-center">
                    <NuxtImg src="../public/phone.svg" class="h-8"></NuxtImg>
                    <h2 class="text-xl font-medium">{{ member.userPhone }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const router = useRouter()
const route = useRoute()
const id = route.params.id

const data = await $fetch('/api/getMembers')
const dataSorted = data.sort((a, b) => a.userName.localeCompare(b.userName))

const [member] = data.filter((d) => d.userId === id)

const userDesc = member.userDesc

const fullName = computed(() => {
    return member.userName + ' ' + member.userLastName
})

const imageUrl = computed(() => {
    if(member.userNb === 1) return '../public/chameleon.svg'
    if(member.userNb === 2) return '../public/butterfly.svg'
    if(member.userNb === 3) return '../public/elk.svg'
    if(member.userNb === 4) return '../public/mianyang.svg'
    if(member.userNb === 5) return '../public/octopus.svg'
    if(member.userNb === 6) return '../public/rooster.svg'
    if(member.userNb === 7) return '../public/toucan.svg'
    if(member.userNb === 8) return '../public/turtle.svg'
    if(member.userNb === 9) return '../public/whale.svg'
    if(member.userNb === 10) return '../public/giraffe.svg'
})
</script>