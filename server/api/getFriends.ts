export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const userId = query.id
    const token = query.token
    const config = useRuntimeConfig()
      const dbURL = config.public.DB
  
      const response =  await fetch(`${dbURL}/${userId}/friends.json?auth=${token}`)
      const friendsData = await response.json()
  
      const friends = [];
  
      for (const key in friendsData) {
        const request = {
          requestId: key,
          friendId: friendsData[key].friendId,
        };
        friends.push(request);
      }
  
      return friends
    })