<template>
    <div class="flex gap-4">
        <div v-for="user in transformedArray" class="flex flex-col">
            <h1>{{ user.firstName }}</h1>
            <p>{{ user.lastName }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
            <p>{{ user.userId }}</p>
    </div>
    </div>
    <h1>All users</h1>
</template>

<script setup>
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
</script>