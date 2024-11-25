<template>
    <div class="flex mt-8">
      <div class="flex justify-center basis-1/3">
        <HomeSortButton @sort="sortType = $event"></HomeSortButton>
      </div>
      <div class="basis-1/3 flex flex-col justify-center m-auto"></div>
      <div class="flex justify-center m-auto basis-1/3">
        <HomeMemberForm @send-data="handleData"></HomeMemberForm>
      </div>
    </div>
    <div class="flex mx-60 max-h-[24rem] overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <table class="w-full">
            <thead class="">
                <tr class="text-left">
                    <th class="py-4 pl-8 font-normal">Name  <button @click="changeArrowClass"><NuxtImg src="../public/arrowup.svg" class="h-3 transition ease-in-out duration-150 translate-y-0.5" :class="arrowClass"></NuxtImg></button></th>
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
  </template>
  
  <script setup>
  import {  watch } from 'vue'
  import { useToast } from '@/components/ui/toast/use-toast'

  const { toast } = useToast()
  const router = useRouter()

  const sortType = ref('')
  const users = ref([])
  const usersHelp = ref([])

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
    if(sortType.value === '') {
    const data = await $fetch('/api/getMembers')
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
      const { data, error } = await useFetch('/api/addMember', {
        method: 'POST',
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
  