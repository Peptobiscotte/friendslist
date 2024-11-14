<script setup lang="ts">
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
</script>

<template>
  <Command class="bg-slate-900 border border-slate-700 text-slate-200 h-8 my-auto">
    <CommandInput placeholder="Search" />
  </Command>
</template>