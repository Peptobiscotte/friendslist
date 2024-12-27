<template>
    <div v-if="screenSize > 1000" class="flex h-[calc(100vh-57px)] font-poppins">
        <div class="basis-1/4 2xl:basis-1/5 border-r-2 border-slate-800 flex flex-col overflow-auto pt-4 scrollbar scrollbar-thumb-slate-700 scrollbar-track-transparent max-h-screen">
            <h1 class="text-center text-xl font-semibold mb-4">Messages</h1>
            <UserMessagesList v-for="conv in allConvId" :id="conv.userId" :loggedId="loggedIdRef" :name="conv.firstName"></UserMessagesList>
        </div>
        <div class="basis-3/4 2xl:basis-4/5 max-h-screen relative">
            <div class="flex flex-col items-center pt-8 2xl:pt-16 gap-2">
                <NuxtImg src="/giraffe.svg" class="2xl:h-32 h-16 bg-slate-300 rounded-full"></NuxtImg>
                <h1 class="text-2xl font-bold text-slate-300">{{ targetInfosRef.firstName }}</h1>
            </div>
            <div class="scroll-thingy mt-8 flex flex-col gap-2 bg-slate-800 mx-16 h-24 lg:h-60 lg:mx-24 xl:h-96 xl:mx-36 2xl:h-[36rem] 2xl:mx-48 rounded-md 2xl:max-h-[36rem] py-8 px-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div v-for="message in sortedMessagesRef" class="testclass">
                    <div v-if="isSame(message.from, loggedIdRef)" class="flex gap-2 items-center">
                        <p class="bg-slate-700 py-1 px-4 rounded-md text-lg max-w-96 break-words ml-auto">{{ message.content }}</p>
                        <p class="text-sm">{{ message.time }}</p>
                    </div>
                    <div v-else class="flex gap-2 items-center">
                        <p class="text-sm">{{ message.time }}</p>
                        <p class="bg-slate-700 py-1 px-4 rounded-md text-lg">{{ message.content }}</p> 
                    </div>
                </div>
            </div>
            <div class="bg-slate-900/30 border-slate-800 absolute bottom-0 backdrop-blur w-full p-2 flex justify-center">
                <div class="flex gap-4">
                    <input @keyup.enter="sendMessage" v-model=typedMessage type="text" class="bg-slate-800 rounded-md w-80 focus:outline-none py-2 px-2">
                    <button @click="sendMessage"><NuxtImg src="/send.svg" class="w-8"></NuxtImg></button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex flex-col items-center pt-8 2xl:pt-16 gap-2">
            <NuxtImg src="/giraffe.svg" class="2xl:h-32 h-16 bg-slate-300 rounded-full"></NuxtImg>
            <h1 class="text-2xl font-bold text-slate-300">{{ targetInfosRef.firstName }}</h1>
        </div>
        <div class="scroll-thingy mt-8 flex flex-col gap-2 bg-slate-800 mx-8 h-80 rounded-md py-8 px-4 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div v-for="message in sortedMessagesRef" class="testclass">
                <div v-if="isSame(message.from, loggedIdRef)" class="flex gap-2 items-center">
                    <p class="bg-slate-700 py-1 px-4 rounded-md text-lg max-w-96 break-words ml-auto">{{ message.content }}</p>
                    <p class="text-sm">{{ message.time }}</p>
                </div>
                <div v-else class="flex gap-2 items-center">
                    <p class="text-sm">{{ message.time }}</p>
                    <p class="bg-slate-700 py-1 px-4 rounded-md text-lg">{{ message.content }}</p> 
                </div>
            </div>
        </div>
        <div class="bg-slate-900/30 border-slate-800 absolute bottom-0 backdrop-blur w-full p-2 flex justify-center">
            <div class="flex gap-4">
                <input @keyup.enter="sendMessage" v-model=typedMessage type="text" class="bg-slate-800 rounded-md w-80 focus:outline-none py-2 px-2">
                <button @click="sendMessage"><NuxtImg src="/send.svg" class="w-8"></NuxtImg></button>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const targetIdRef = ref(route.params.idMessage)
const targetInfosRef = ref('')

const userId = useCookie('userId')
const token = useCookie('token')
const loggedIdRef = ref('')
const allConvId = ref([])

const typedMessage = ref('')
const sortedMessagesRef = ref([])
const receivedMessages = ref({
    value: 'Yo la team ça dji quoi???',
    time: '18:02'
})
const sentMessages = ref([])

const sendMessage = async function() {
    const time = new Date()
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const absoluteTime = new Date().getTime()
    if(minutes <10) {
        const fullTime = `${hours}:0${minutes}`
        const messageInfos = {
            value: typedMessage.value,
            time: fullTime
        }
        sentMessages.value.push(messageInfos)
    } else {
        const fullTime = `${hours}:${minutes}`
        const messageInfos = {
            value: typedMessage.value,
            time: fullTime
        }
        sentMessages.value.push(messageInfos)
    }

    try {
        const { data, error } = await useFetch('/api/sendMessage', {
        method: 'POST',
        query: {
            id: userId.value,
            targetId: targetIdRef.value,
            token: token.value
        },
        body: {
          from: userId.value,
          to: targetIdRef.value,
          time: absoluteTime,
          content: typedMessage.value
        }
      })
    } catch(err) {
        console.error('Error:', err)
    }
    try {
        const { data, error } = await useFetch('/api/sendMessage', {
        method: 'POST',
        query: {
            id: targetIdRef.value,
            targetId: userId.value,
            token: token.value
        },
        body: {
          from: userId.value,
          to: targetIdRef.value,
          time: absoluteTime,
          content: typedMessage.value
        }
      })
    } catch(err) {
        console.error('Error:', err)
    }
    typedMessage.value = ''

    reloadNuxtApp({
        path: route.fullPath
    })
}

const isSame = function(from, to) {
    return from === to
}

if(token) {
    const messageId = await useFetch('/api/getAllMessages', {
              query: {
                  token: token.value,
                  id: userId.value
              }
          })

    const {data} = await useFetch('/api/getUsers', {
              query: {
                  token: token.value
              }
          })

          const toRawData = toRaw(messageId.data.value)
          const toRawUsers = toRaw(data.value)

          const filteredUsers = toRawUsers.filter(user => toRawData.some(obj => obj.messageId === user.userId))

            const result = filteredUsers.flatMap(user =>
                Object.values(user.infos).map(info => ({
                    userId: user.userId,
                    firstName: info.firstName,
            })));

            allConvId.value = result
            loggedIdRef.value = userId.value

    const targetInfos = data.value.find(obj => obj.userId === targetIdRef.value)
    const targetInfosRaw = (toRaw(targetInfos.infos))
    const [targetInfosDef] = Object.values(targetInfosRaw)
    targetInfosRef.value = targetInfosDef

    const data2 = await $fetch('/api/getMessages', {
      query: {
        id: userId.value,
        targetId: targetIdRef.value,
        token: token.value
      }
    })

    const sortedMessages = data2.sort((a, b) => a.time - b.time);
    
    
    const sortedMessagesTimeFix = sortedMessages.map(obj => {
        const date = new Date(obj.time).toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })
        return {
            ...obj,
            time: date
        }
    })
    
    sortedMessagesRef.value = sortedMessagesTimeFix
}

const screenSize = ref('')

  const updateScreenSize = () => {
      screenSize.value = window.innerWidth
    };

onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize);

  const target = document.querySelector(".scroll-thingy");
  const lastChild = target?.lastElementChild;
  
  if (lastChild) {
  lastChild.scrollIntoView({ behavior: "smooth" });
}
})

</script>