<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-950 min-h-screen text-slate-400">
    <NuxtLayout/>
    <NuxtPage/>
    <Toaster/>
  </div>
</template>

<script setup>
const token = useCookie('token')
const expiration = useCookie('expiration')
const userId = useCookie('userId')

import Toaster from './components/ui/toast/Toaster.vue';

function handleExpiration() {
  if (expiration.value) {
    const expirationTime = expiration.value
    const currentTime = Date.now();
    const timeRemaining = expirationTime - currentTime;

    if (timeRemaining > 0) {
      setTimeout(() => {
        token.value = null;
        userId.value = null;
        expiration.value = null;
        navigateTo('/');
      }, timeRemaining);
    } else {
      console.log('Expiration already passed. Clearing tokens immediately.');
      token.value = null;
      userId.value = null;
      expiration.value = null;
      reloadNuxtApp({
        path: '/'
    })
    }
  }
}

watch(expiration, handleExpiration, { immediate: true });
</script>