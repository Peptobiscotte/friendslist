export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const token = query.token
    const config = useRuntimeConfig()
    const dbURL = config.public.DB

    const response =  await fetch(`${dbURL}/.json?auth=${token}`)
    const data = await response.json()

    const users = [];

    for (const key in data) {
      const user = {
        userId: key,
        infos: data[key].infos,
      };
      users.push(user);
    }

    return users
})