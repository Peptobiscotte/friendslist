<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-950 min-h-screen text-slate-400">
    <NuxtLayout/>
    <NuxtPage/>
    <Toaster/>
  </div>
</template>

<script setup>
import Toaster from './components/ui/toast/Toaster.vue';
</script>