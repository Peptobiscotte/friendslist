<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {  watch } from 'vue'

const selectedType = ref('')
const emit = defineEmits(['sort'])

watch(selectedType, (newType) => {
    selectedType.value = newType
    emit('sort', selectedType.value)
})
</script>

<template>
  <Select v-model="selectedType" >
    <SelectTrigger class="w-40 m-8 rounded-md text-xl font-medium border-2 border-slate-700 bg-slate-900">
      <SelectValue placeholder="Sort" />
    </SelectTrigger>
    <SelectContent class="rounded-md text-xl border-2 border-slate-700 bg-slate-900 text-slate-400">
      <SelectGroup>
        <SelectItem value="friend" class="focus:bg-slate-700 focus:text-slate-200 text-lg">
          Friend
        </SelectItem>
        <SelectItem value="family" class="focus:bg-slate-700 focus:text-slate-200 text-lg">
          Family
        </SelectItem>
        <SelectItem value="other" class="focus:bg-slate-700 focus:text-slate-200 text-lg">
          Other
        </SelectItem>
        <SelectItem value="all" class="focus:bg-slate-700 focus:text-slate-200 text-lg">
          All
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>