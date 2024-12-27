<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import MobileLogOutDialog from '../layout/mobileLogOutDialog.vue';

const props = defineProps(['userId', 'firstName'])

const goToUser = function() {
    const activeUserUrl = props.userId
    navigateTo(`/${activeUserUrl}`)
}
const goToMessages = function() {
    const activeUserUrl = props.userId
    navigateTo(`/${activeUserUrl}/messages`)
}
</script>

<template>
  <Popover>
    <PopoverTrigger class="flex">
        <NuxtImg src="/hamburger.svg" class="w-8"></NuxtImg>
    </PopoverTrigger>
    <PopoverContent class="bg-slate-800 border-slate-800 text-slate-300 mr-2 w-48">
      <div class="flex flex-col gap-1 text-lg">
        <div class="border-b border-slate-700 flex flex-col gap-2">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/about">Contacts</NuxtLink>
            <NuxtLink to="/groups" class="pb-2">Groups</NuxtLink>
        </div>
        <div class="border-b border-slate-700 flex flex-col items-start gap-2">
            <button @click="goToUser">Profile</button>
            <button @click="goToMessages" class="pb-2">Messages</button>
        </div>
        <div>
          <MobileLogOutDialog></MobileLogOutDialog>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>