<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger class="flex">
        <NuxtImg src="/hamburger.svg" class="w-8"></NuxtImg>
    </PopoverTrigger>
    <PopoverContent class="bg-slate-800 border-slate-800 text-slate-300 mr-2">
      <div class="flex flex-col gap-1">
        <div class="border-b border-slate-700 flex flex-col gap-2">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/about">Contacts</NuxtLink>
            <NuxtLink to="/groups" class="pb-2">Groups</NuxtLink>
        </div>
        <div class="border-b border-slate-700 flex flex-col gap-2">
            <NuxtLink>Profile</NuxtLink>
            <NuxtLink class="pb-2">Messages</NuxtLink>
        </div>
        <div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>