export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const memberId = query.id
    const userId = query.userId
    const token = query.token
    const config = useRuntimeConfig()
    const dbURL = config.public.DB
    
    try {
      const response = await fetch(`${dbURL}/${userId}/members/${memberId}.json?auth=${token}`, {
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