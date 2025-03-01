<template>
    <div class="border-b-2 bg-slate-900/30 border-slate-800 sticky top-0 backdrop-blur">
        <header v-if="screenSize > 1000">
            <nav class="flex">
                <div class="flex items-center basis-2/5 justify-center gap-8">
                    <NuxtLink to="/" class="flex gap-6">
                        <NuxtImg src="/giraffe.svg" class="w-8 -mr-4"></NuxtImg>
                        <h1 class="text-2xl font-black font-poppins">&ltFriendsList&gt</h1>
                    </NuxtLink>
                    <ul v-if="token" class="flex py-3 gap-2 font-semibold">
                        <li v-if="route === '' || route === '/'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Home</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/">Home</NuxtLink></li>
                        <li v-if="route === '/about'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Contacts</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/about">Contacts</NuxtLink></li>
                        <li v-if="route.includes('/groups')" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Groups</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/groups">Groups</NuxtLink></li>
                    </ul>
                    <ul v-else class="flex py-3 gap-2 font-semibold">
                        <li v-if="route === '' || route === '/'" class="text-md rounded-md  py-1 px-2.5 text-slate-200">Home</li>
                        <li v-else class="text-md rounded-md  py-1 px-2.5 transition delay-50 duration-500 ease-in-out hover:text-slate-300"><NuxtLink to="/">Home</NuxtLink></li>  
                    </ul> 
                </div>
                <div class="basis-3/5 flex justify-between 2xl:justify-end">
                    <div class="flex 2xl:mr-80 gap-4 items-center">
                        <HomeSearchBar v-if="token" :usersName="allUserNameRef" :allUsers="allUsersInfos"></HomeSearchBar>
                        <NuxtImg src="/moon.svg" class="w-8"></NuxtImg>
                        <div class="flex items-center">
                            <div class="border-r-2 border-slate-800 h-8"></div>
                        </div>
                        <div v-if="activeUserRef" class="relative">
                            <UserPopover :userId="activeUserRef.userId" :firstName="activeUserRef.firstName"></UserPopover>
                            <span v-if="hasNotif" class="absolute left-15 rounded-full w-2 h-2">                                
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span class="relative bottom-[11px] left-[1px] inline-flex rounded-full h-1.5 w-1.5 bg-sky-500 opacity-75"></span>
                            </span>
                        </div>
                    </div>
                    <div>
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
        <header v-else>
            <nav v-if="token" class="flex justify-between items-center py-2 px-2">
                <div>
                    <NuxtLink to="/" class="flex gap-6">
                        <NuxtImg src="/giraffe.svg" class="w-8 -mr-4"></NuxtImg>
                        <h1 class="text-2xl font-black font-poppins">&ltFriendsList&gt</h1>
                    </NuxtLink>
                </div>
                <div class="mr-2" >
                    <UserPopoverMobile :userId="activeUserRef.userId" :firstName="activeUserRef.firstName"></UserPopoverMobile>
                </div>
            </nav>
            <nav v-else class="flex justify-between items-center py-2 px-2">
                <div>
                    <NuxtLink to="/" class="flex gap-6">
                        <NuxtImg src="/giraffe.svg" class="w-8 -mr-4"></NuxtImg>
                        <h1 class="text-2xl font-black font-poppins">&ltFriendsList&gt</h1>
                    </NuxtLink>
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

const activeUserRef = ref(null)
const allUserNameRef = ref(null)
const allUsersInfos = ref(null)
const requestsArrRef = ref(null)
const screenSize = ref('')

  const updateScreenSize = () => {
      screenSize.value = window.innerWidth
    };

onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize);
})

const groups = await $fetch('/api/getGroups', {
    query: {
        id: userId.value
    }
})


watch(() => router.currentRoute.value.fullPath,
  (newFullPath) => {
    route.value = newFullPath
  })

    if(token.value){
        const {data} = await useFetch('/api/getUsers', {
              query: {
                  token: token.value
              }
          })
        
              const transformedArray = data.value.map(obj => {
              const { userId, infos } = obj;
              const nestedKey = Object.keys(infos)[0];
              const nestedData = infos[nestedKey];
            
              return {
                userId,
                ...nestedData
              };
            });
            const [activeUser] = transformedArray.filter((d) => d.userId === userId.value)
            
            activeUserRef.value = activeUser
            allUsersInfos.value = transformedArray
            
            const allUserName = transformedArray.map(obj => {
                return obj.firstName + ' ' + obj.lastName
            })
            allUserNameRef.value = allUserName
            
            const requests = await useFetch('/api/getFriendRequest', {
              query: {
                  token: token.value,
                  id: activeUserRef.value.userId
              }
          })
          const requestsArr = toRaw(requests.data.value)
          requestsArrRef.value = requestsArr
        }

const goToUser = function() {
    const activeUserUrl = activeUserRef.value.userId
    navigateTo(`/${activeUserUrl}`)
}
const hasNotif = computed(() => {
    return requestsArrRef.value.length > 0
})
</script>