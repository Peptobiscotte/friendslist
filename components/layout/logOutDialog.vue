<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const handleLogout = function() {
    // localStorage.removeItem('token')
    // localStorage.removeItem('userId')
    // localStorage.removeItem('tokenExpiration')

  const userId = useCookie('userId')
  userId.value = null
  const token = useCookie('token')
    token.value = null

    reloadNuxtApp({
      path: '/'
    })
}

</script>

<template>
  <Dialog>
    <DialogTrigger class="mr-32 -ml-32 border border-slate-700 hover:bg-slate-700 rounded-md py-1 px-2 hover:text-slate-300 transition delay-50 duration-500 ease-in-out">
      Log Out
    </DialogTrigger>
    <DialogContent class="bg-slate-800 border-slate-700">
      <DialogHeader>
        <DialogTitle class="text-slate-300">Log out</DialogTitle>
        <DialogDescription class="text-slate-400">
          Are you sure you want to log out?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose>
            <button @click="handleLogout" class="bg-slate-700 rounded-md py-1 px-4 text-slate-400 hover:bg-slate-600 hover:text-slate-300">Confirm</button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>