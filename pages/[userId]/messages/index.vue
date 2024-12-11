<template>
    <div class="flex h-[calc(100vh-57px)]">
        <div class="basis-1/4 2xl:basis-1/5 border-r-2 border-slate-800 flex flex-col overflow-auto pt-4 scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent max-h-screen">
            <h1 class="text-center text-xl font-semibold mb-4">Messages</h1>
            <UserMessagesList v-for="conv in allConvId" :id="conv.userId" :loggedId="loggedIdRef" :name="conv.firstName"></UserMessagesList>
        </div>
        <div class="flex justify-center basis-3/4 max-h-screen p-8">    
            <div class="flex justify-center items-start">
                <MessagesMessagePopover :allUsers="allUsersInfosRef" :loggedId="loggedIdRef"></MessagesMessagePopover>
            </div>
        </div>
    </div>
</template>

<script setup>
const userId = useCookie('userId')
const token = useCookie('token')
const loggedIdRef = ref('')
const allUsersInfosRef = ref([])

const allConvId = ref([])


if(token) {

    const {data} = await useFetch('/api/getAllMessages', {
              query: {
                  token: token.value,
                  id: userId.value
              }
          })
          
          loggedIdRef.value = userId.value
          
          const allUsers = await useFetch('/api/getUsers', {
              query: {
                  token: token.value
                }
            })
            
            const toRawUsers = toRaw(allUsers.data.value)
            const toRawData = toRaw(data.value)

            const filteredUsers = toRawUsers.filter(user => toRawData.some(obj => obj.messageId === user.userId))
            
            const result = filteredUsers.flatMap(user =>
                Object.values(user.infos).map(info => ({
                    userId: user.userId,
                    firstName: info.firstName,
            })));
            
            const allUsersInfos = toRawUsers.flatMap(user =>
                Object.values(user.infos).map(info => ({
                    userId: user.userId,
                    firstName: info.firstName,
            })));
            
            allConvId.value = result
            
            const allFriends = await useFetch('/api/getFriends', {
                query: {
                    token: token.value,
                    id: userId.value
                }
            })
            const allFriendsRaw = toRaw(allFriends.data.value)
            
            
            const allFriendsInfos = allUsersInfos.filter(user => allFriendsRaw.some(obj => obj.friendId === user.userId))
            allUsersInfosRef.value = allFriendsInfos
            
}



</script>