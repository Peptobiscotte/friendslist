<template>
  <div>
    <Popover>
      <PopoverTrigger>
        <input v-model="inputText" type="text" class="bg-slate-900 border border-slate-800 rounded-md focus:outline-none focus:border-slate-700 px-2 py-1 text-sm">
      </PopoverTrigger>
    <PopoverContent class="bg-slate-900 border-slate-700 text-slate-300 flex flex-col p-0 font-poppins">
      <div v-if="inputText" v-for="names in sortedNames" class="p-2 flex justify-center transition ease-in-out duration-300 hover:bg-slate-800"><button @click="linkTo">{{ names }}</button></div>
      <p v-else class="p-2">no result</p>
    </PopoverContent>
  </Popover>
  </div>
</template>

<script setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const inputText = ref('')

const props = defineProps(['usersName', 'allUsers'])

const isVisible = ref(false)
const togglePop = function() {
  isVisible.value = !isVisible.value
}

const sortedNames = computed(() => {
  if(!inputText.value.trim()) {
    return 'no result'
  } else {
    const searchText = inputText.value.trim().toLowerCase()
    const result =  props.usersName.filter((name) =>
        name.toLowerCase().includes(searchText)
      );
      return result
  }
})

const linkTo = function(event) {
  const targetName = event.target.textContent
  const targetFirst = targetName.split(' ')[0]
  const targetLast = targetName.split(' ')[1]
  
  const [selectedUser] = toRaw(props.allUsers).filter((user) => {
    return  user.firstName === targetFirst && user.lastName === targetLast
  })
  const urlTo = selectedUser.userId
  navigateTo(`/${urlTo}`)
}

</script>