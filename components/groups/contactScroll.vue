<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'

interface User {
  userName: string;
}

const props = defineProps(['contacts'])
const emit = defineEmits(['valid-contacts'])
const contacts = props.contacts.sort((a: User, b: User) => a.userName.localeCompare(b.userName))

const imageUrl = function(num: number) {
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

const selectedContact = ref([])

watch(selectedContact, () => {
    emit('valid-contacts', selectedContact.value)
})
</script>

<template>
  <ScrollArea class="h-72 w-56 rounded-md border border-slate-700">
    <div class="p-4 bg-slate-900 flex flex-col gap-2">
      <div v-for="contact in contacts" :key=contact.userId class="flex gap-2">
        <input type="checkbox" :value="contact.userId" v-model="selectedContact">
        <div class="text-base text-slate-300 flex gap-2">
            <NuxtImg :src="imageUrl(contact.userNb)" class="w-8 bg-slate-300 rounded-full"></NuxtImg>
            <p>{{ contact.userName }}</p>
            <p class="-translate-x-0.5">{{ contact.userLastName }}</p>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>