<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const props = defineProps(['id', 'token'])
console.log(props)

const router = useRouter()
const route = useRoute()
const id = route.params.id

const deleteM = async() => {
     await useFetch('/api/deleteMember', {
        query: {
          id,
          userId: props.id,
          token: props.token
        }
     })
     await router.push('/about')
}

</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger><NuxtImg src="../public/trashcan.svg" class="w-8"></NuxtImg></AlertDialogTrigger>
    <AlertDialogContent class="bg-slate-800 border-slate-700">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-slate-300 text-xl">Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription class="text-slate-400 text-lg">
          This will delete the contact and all data associated.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter class="">
        <AlertDialogCancel class="bg-slate-500 border-none hover:bg-slate-400 text-base">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="deleteM" class="text-base hover:bg-rose-600">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>