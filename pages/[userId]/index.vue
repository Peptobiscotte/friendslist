<template>
    <div>
        <div class="flex flex-col justify-center items-center m-16 gap-2">
            <h1 class="text-6xl font-bold">{{ activeUserRef.firstName }} {{ activeUserRef.lastName }}</h1>
            <button v-if="!isSame && !alreadyRequested && !isFriend" @click="sendRequest" class="bg-slate-900 border border-slate-800 hover:bg-slate-800 py-1 px-2 rounded-md">+ Friend request</button>
            <p v-else-if="alreadyRequested" class="italic">friend request sent</p>
            <div v-else-if="isFriend" class="flex flex-col items-center gap-4 mt-4">
              <p>friend</p>
              <button @click="goToUserMessage" class="bg-slate-800 rounded-md py-1 px-2 hover:bg-slate-700 transition ease-in-out duration-300">Send a Message</button>
            </div>
        </div>
        <div v-if="isSame" class="flex mt-32">
            <div class="basis-1/2 flex flex-col items-center">
                <div class="flex flex-col gap-4 bg-slate-800 border border-slate-700 rounded-md py-8 px-16 items-center">
                    <h1 class="text-xl">Friends requests</h1>
                    <div class="flex gap-2 border-t border-slate-700 pt-4" v-for="request in mergedArray">
                        <h2>{{ request.firstName }}</h2>
                        <h2>{{ request.lastName }}</h2>
                        <button @click="handleRequest" :id=request.requestedId class="ml-16 bg-slate-900 rounded-md py-1 px-2 transition ease-in-out duration-300 hover:bg-slate-700">Accept</button>
                    </div>
                </div>
            </div>
            <div class="basis-1/2 flex flex-col items-center">
              <div class="flex flex-col gap-4 bg-slate-800 border border-slate-700 rounded-md py-8 px-16 items-center">
                    <h1 class="text-xl">Friends</h1>
                    <div class="border-t border-slate-700 pt-4" v-for="friend in userFriendsRef">
                      <button @click="goToFriend" :id="friend.userId" class="flex gap-2">
                        <h2 :id="friend.userId">{{ friend.firstName }}</h2>
                        <h2 :id="friend.userId">{{ friend.lastName }}</h2>
                      </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const route = useRoute()
const router = useRouter()
const id = route.params.userId
const token = useCookie('token')
const userId = useCookie('userId')

const activeUserRef = ref('')
const loggedUserRef = ref('')
const requestedIdsRef = ref('')
const allUsers = ref('')
const friendsRef = ref('')
const userFriendsRef = ref('')


if(token.value) {
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
            const [activeUser] = transformedArray.filter((d) => d.userId === id)
            const [loggedUser] = transformedArray.filter((d) => d.userId === userId.value)
            
            activeUserRef.value = activeUser
            loggedUserRef.value = loggedUser
            allUsers.value = transformedArray

            const friends = await useFetch('/api/getFriends', {
              query: {
                  token: token.value,
                  id: userId.value  
              }
          })
          friendsRef.value = friends

          const userFriends = allUsers.value.filter(user => friendsRef.value.data.some(friend => user.userId === friend.friendId))
          const rawUserFriends = userFriends.map(friendObj => toRaw(friendObj))
          userFriendsRef.value = rawUserFriends
}



const requests = await useFetch('/api/getFriendRequest', {
  query: {
    id: activeUserRef.value.userId,
    token: token.value 
  }
})


const requestsArr = toRaw(requests.data.value)
const requestedIdArr = requestsArr.map(obj => obj.requestedId)
requestedIdsRef.value = requestedIdArr

const mergedArray = requestsArr.map(item1 => {
  const matchingUser = allUsers.value.find(item2 => item2.userId === item1.requestedId);
  return {
    requestedId: item1.requestedId,
    firstName: matchingUser ? matchingUser.firstName : null,
    lastName: matchingUser ? matchingUser.lastName : null
  };
});

const alreadyRequested = computed(() => {
    return requestedIdsRef.value.includes(loggedUserRef.value.userId)
})

const isFriend = computed(() => {
  if(userFriendsRef.value.filter(obj => obj.userId === id).length > 0) {
    return true
  } else {
    return false
  }
})


const isSame = computed(() => {
    return activeUserRef.value.userId === loggedUserRef.value.userId
})

const sendRequest = async function() {
    const data = {
        requestedId: loggedUserRef.value.userId,
        status: 'pending'
    }
    try {
        await useFetch('/api/sendFriendRequest', {
            method: 'POST',
            body: data,
            query: {
              id: activeUserRef.value.userId,
              token: token.value
            }
        })
        toast({
        title: 'Request sent!',
      });
      setTimeout(() => {
        router.go(0)
      }, 2000);
    }  catch (err) {
      console.error('Error:', err)
    }
}

const handleRequest = async function(event) {
    
    const requestIdObject = requests.data.value.find(obj => obj.requestedId === event.target.id)
    const requestId = requestIdObject.requestId

    const requestsFromOut = await useFetch('/api/getFriendRequest', {
    query: {
        id: event.target.id,
        token: token.value 
    }
})

  const requestsArr = requestsFromOut.data.value
  
  const [requestHasRequested] = requestsArr.filter(obj => 
    obj.requestedId === userId.value
  )
  
    const { data, error } = await useFetch('/api/addFriend', {
        method: 'POST',
        query: {
            id: userId.value,
            token: token.value
        },
        body: {
          friendId: event.target.id  
        }
      })
      const { data1, error1 } = await useFetch('/api/addFriend', {
        method: 'POST',
        query: {
            id: event.target.id,
            token: token.value
        },
        body: {
          friendId: userId.value  
        }
      })
      const {data3, error3} = await useFetch('/api/deleteFriendRequest', {
        query: {
          id: userId.value,
          token: token.value,
          requestId: requestId
        }
     })
     if(requestHasRequested.requestedId){
      const {data4, error4} = await useFetch('/api/deleteFriendRequest', {
        query: {
          id: event.target.id,
          token: token.value,
          requestId: requestHasRequested.requestId
        }
     })
     }
     reloadNuxtApp({
        path: route.fullPath
    })
}

const goToFriend = function(event) {
  console.log(event.target.id)
  navigateTo(`/${event.target.id}`)
}

const goToUserMessage = function() {
    navigateTo(`/${loggedUserRef.value.userId}/messages/${activeUserRef.value.userId}`)
}

</script>