<template>
    <div class="border-b-2 bg-slate-900/30 border-slate-800 sticky top-0 backdrop-blur">
        <header>
            <nav class="flex">
                <div class="flex items-center basis-2/5 justify-center gap-8">
                    <NuxtLink to="/" class="flex gap-4">
                        <NuxtImg src="../public/giraffe.svg" class="w-8 -mr-4"></NuxtImg>
                        <h1 class="text-2xl font-black">&ltFriendsList&gt</h1>
                    </NuxtLink>
                    <ul class="flex py-3 gap-2 font-semibold">
                        <li v-if="route === '' || route === '/'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Home</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/">Home</NuxtLink></li>
                        <li v-if="route === '/about'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">About</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/about">About</NuxtLink></li>
                        <li v-if="route === '/groups/ff'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Groups</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/groups/ff">Groups</NuxtLink></li>  
                    </ul> 
                </div>
                <div class="basis-3/5 flex justify-end">
                    <div class="flex mr-80 gap-4">
                        <HomeSearchBar class=""></HomeSearchBar>
                        <NuxtImg src="../public/moon.svg" class="w-8"></NuxtImg>
                        <div class="flex items-center">
                            <div class="border-r-2 border-slate-800 h-8"></div>
                        </div>
                    </div>
                    <div class="flex justify-center items-center">
                        <NuxtLink to="/" class="mr-32 -ml-32 border border-slate-700 hover:bg-slate-700 rounded-md py-1 px-2 hover:text-slate-300 transition delay-50 duration-500 ease-in-out">Sign Up</NuxtLink>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
const router = useRouter()
const route = ref('')

watch(() => router.currentRoute.value.fullPath,
  (newFullPath) => {
    route.value = newFullPath
  })
</script>