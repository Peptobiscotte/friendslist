<template>
    <!-- <div v-if="!userId">
      <div class="flex flex-col items-center gap-8 justify-center mt-20 text-slate-300">
        <h1 class="max-w-5xl text-center text-6xl font-bold">Sign in to access your contacts!</h1>
        <NuxtLink to="/signin" class=" border text-slate-400 border-slate-700 text-lg py-2 px-4 rounded-md hover:bg-slate-700 hover:text-slate-300 transition ease-in-out duration-300">Sign in</NuxtLink>
      </div>
    </div> -->
    <div class="font-poppins">
      <div class="flex sm:justify-normal mt-8">
        <div class="flex justify-center basis-1/2 sm:basis-1/3">
          <HomeSortButton @sort="sortType = $event"></HomeSortButton>
        </div>
        <div v-if="screenSize > 515" class="basis-1/3 flex flex-col justify-center"></div>
        <div class="flex justify-center items-center basis-1/2 sm:basis-1/3">
          <HomeMemberForm @send-data="handleData"></HomeMemberForm>
        </div>
      </div>
      <div v-if="screenSize > 700" class="flex md:mx-12 lg:mx-20 xl:mx-60 max-h-[24rem] 2xl:max-h-[36rem] overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <table class="w-full">
              <thead class="">
                  <tr class="text-left">
                      <th class="py-4 pl-8 font-normal">Name  <button @click="changeArrowClass"><NuxtImg src="/arrowup.svg" class="h-3 transition ease-in-out duration-150 translate-y-0.5" :class="arrowClass"></NuxtImg></button></th>
                      <th class="font-normal">Mail</th>
                      <th class="font-normal">Phone</th>
                      <th class="font-normal">Category</th>
                  </tr>
              </thead>
              <tbody v-for="contact in usersHelp">
                  <HomeContactTable :userName="contact.userName" :userLastName="contact.userLastName" :userDesc="contact.userDesc" :userEmail="contact.userEmail" :userPhone="contact.userPhone" :userType="contact.userType" :userId="contact.userId" :userNb="contact.userNb"></HomeContactTable>
              </tbody>
          </table>
      </div>
      <div v-else class="flex flex-col gap-4 mr-8">
          <HomeMobileTable v-for="contact in usersHelp" :userName="contact.userName" :userLastName="contact.userLastName" :userId="contact.userId" :userNb="contact.userNb"></HomeMobileTable>
      </div>
    </div>
    
  </template>
  
  <script setup>
  import {  watch } from 'vue'
  import { useToast } from '@/components/ui/toast/use-toast'

  const { toast } = useToast()
  const router = useRouter()

  const testing = ref('hello')

  const sortType = ref('')
  const users = ref([])
  const usersHelp = ref([])
  const screenSize = ref('')

  const updateScreenSize = () => {
      screenSize.value = window.innerWidth
    };

  const arrowClass = ref('')

  const changeArrowClass = function() {
    if(arrowClass.value === '') {
      arrowClass.value = 'rotate-180'
      usersHelp.value.sort((a, b) => b.userName.localeCompare(a.userName))
    } else {
      arrowClass.value = ''
      usersHelp.value.sort((a, b) => a.userName.localeCompare(b.userName))
    }
  } 
  
  
  onMounted(async () => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize);

    const userId = useCookie('userId')
    const token = useCookie('token')

    if(sortType.value === '') {
    const data = await $fetch('/api/getMembers', {
      query: {
        id: userId.value,
        token: token.value
      }
    })
    users.value = data.sort((a, b) => a.userName.localeCompare(b.userName));
    usersHelp.value = data.sort((a, b) => a.userName.localeCompare(b.userName));
  }
  })
  
  watch(sortType, () => {
    if(sortType.value !== 'all') {
      usersHelp.value = users.value.filter(user => user.userType === sortType.value)
    } else {
      usersHelp.value = users.value
    }
  })
  
  const handleData = async (contact) => {
    try {
      const userId = useCookie('userId')
      const token = useCookie('token')
      const { data, error } = await useFetch('/api/addMember', {
        method: 'POST',
        query: {
            id: userId.value,
            token: token.value
        },
        body: {
          userName: contact.firstName,
          userLastName: contact.lastName,
          userDesc: contact.note,
          userType: contact.contactType,
          userEmail: contact.email,
          userPhone: contact.phone,
          userNb: Math.floor(Math.random() * 10) + 1  
        }
      })
      toast({
        title: 'New contact Created!',
      });
      setTimeout(() => {
        router.go(0)
      }, 2000);
      if (error.value) {
        console.error('Error:', error.value)
        return
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  </script>
  