<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
    <PopoverTrigger>
      {{ props.firstName }}
    </PopoverTrigger>
    <PopoverContent class="bg-slate-900 border-slate-700 text-slate-300 p-0 font-poppins">
      <div class="flex flex-col">
        <button class="hover:bg-slate-700 px-4 py-2 transition ease-in-out duration-300" @click="goToUser">Profile</button>
        <button class="hover:bg-slate-700 px-4 py-2 transition ease-in-out duration-300" @click="goToMessages">Messages</button>
      </div>
    </PopoverContent>
  </Popover>
</template>