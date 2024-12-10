export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const userId = query.id
    const token = query.token
    const config = useRuntimeConfig()
      const dbURL = config.public.DB
  
      const response =  await fetch(`${dbURL}/${userId}/conversations/.json?auth=${token}`)
      const data = await response.json()
  
      const messages = [];
  
      for (const key in data) {
        const request = {
          messageId: key,
          content: data[key].content,
          from: data[key].from,
          to: data[key].to,
          time: data[key].time,
        };
        messages.push(request);
      }
      console.log(messages)
      return messages
    })