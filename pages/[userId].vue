<template>
    <div class="flex flex-col justify-center items-center m-8">
        <h1 class="text-4xl font-bold">{{ activeUser.firstName }} {{ activeUser.lastName }}</h1>
    </div>
    <div class="flex flex-col justify-center items-center text-2xl gap-2">
        <p>{{ activeUser.email }}</p>
        <p>{{ activeUser.phone }}</p>
    </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.userId
const token = useCookie('token')

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

</script>