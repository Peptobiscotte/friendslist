<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps(['allUsers', 'loggedId'])

const goToUserMessage = function(event: any) {
    navigateTo(`/${props.loggedId}/messages/${event.target.id}`)
}

</script>

<template>
  <Popover>
    <PopoverTrigger class="bg-slate-800 rounded-md py-1 px-2 hover:bg-slate-700 transition ease-in-out duration-300">
      Send a Message
    </PopoverTrigger>
    <PopoverContent class="bg-slate-900 border-slate-700 text-slate-300 p-0 font-poppins">
      <div class="flex flex-col">
        <button @click="goToUserMessage" v-for="user in props.allUsers" :id="user.userId" class="hover:bg-slate-700 px-4 py-2 transition ease-in-out duration-300" >{{ user.firstName }}</button>
      </div>
    </PopoverContent>
  </Popover>
</template>