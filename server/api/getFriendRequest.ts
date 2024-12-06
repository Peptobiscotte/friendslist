export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const userId = query.id
    const token = query.token
    const config = useRuntimeConfig()
      const dbURL = config.public.DB
  
      const response =  await fetch(`${dbURL}/${userId}/requests.json?auth=${token}`)
      const requestsData = await response.json()
  
      const requests = [];
  
      for (const key in requestsData) {
        const request = {
          requestId: key,
          requestStatus: requestsData[key].status,
          requestedId: requestsData[key].requestedId
        };
        requests.push(request);
      }
  
      return requests
    })