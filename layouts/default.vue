<template>
    <div class="border-b-2 bg-slate-900/30 border-slate-800 sticky top-0 backdrop-blur">
        <header>
            <nav class="flex">
                <div class="flex items-center basis-2/5 justify-center gap-8">
                    <NuxtLink to="/" class="flex gap-4">
                        <NuxtImg src="../public/giraffe.svg" class="w-8 -mr-4"></NuxtImg>
                        <h1 class="text-2xl font-black">&ltFriendsList&gt</h1>
                    </NuxtLink>
                    <ul v-if="token" class="flex py-3 gap-2 font-semibold">
                        <li v-if="route === '' || route === '/'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Home</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/">Home</NuxtLink></li>
                        <li v-if="route === '/about'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Contacts</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/about">Contacts</NuxtLink></li>
                        <li v-if="route.includes('/groups')" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Groups</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/groups">Groups</NuxtLink></li>
                        <li v-if="route === '/allUsers'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">All Users</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/allUsers">All Users</NuxtLink></li>  
                    </ul>
                    <ul v-else class="flex py-3 gap-2 font-semibold">
                        <li v-if="route === '' || route === '/'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Home</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/">Home</NuxtLink></li>  
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
                    <div class="flex justify-center items-center gap-2" v-if="token">
                        <LayoutLogOutDialog></LayoutLogOutDialog>
                    </div>
                    <div class="flex justify-center items-center gap-2" v-else>
                        <NuxtLink to="/signup" class="mr-32 -ml-32 border border-slate-700 hover:bg-slate-700 rounded-md py-1 px-2 hover:text-slate-300 transition delay-50 duration-500 ease-in-out">Sign Up</NuxtLink>
                        <NuxtLink to="/signin" class="mr-32 -ml-32 border border-slate-700 hover:bg-slate-700 rounded-md py-1 px-2 hover:text-slate-300 transition delay-50 duration-500 ease-in-out">Sign In</NuxtLink>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
const router = useRouter()
const route = ref('')
const groupUrl = ref('')

const userId = useCookie('userId')
const token = useCookie('token')


const groups = await $fetch('/api/getGroups', {
    query: {
        id: userId.value
    }
})


watch(() => router.currentRoute.value.fullPath,
  (newFullPath) => {
    route.value = newFullPath
  })
</script>