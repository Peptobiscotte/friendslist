export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const requestId = query.requestId
    const userId = query.id
    const token = query.token
    const config = useRuntimeConfig()
    const dbURL = config.public.DB
    
    try {
      const response = await fetch(`${dbURL}/${userId}/requests/${requestId}.json?auth=${token}`, {
        method: 'DELETE', 
      })
      const data = await response.json()
      return data
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: 'Error fetching data'
      })
    }
  })