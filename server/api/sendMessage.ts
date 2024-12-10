export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const userId = query.id
    const token = query.token
    const targetId = query.targetId
    const config = useRuntimeConfig()
    const dbURL = config.public.DB

    try {
      const body = await readBody(event)
      const response = await fetch(`${dbURL}/${userId}/conversations/${targetId}.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(body) 
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