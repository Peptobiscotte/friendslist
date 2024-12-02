

export default defineEventHandler(async (event) => {
    try {
      const config = useRuntimeConfig()
      const signUpUrl = config.public.SIGN_UP

      const body = await readBody(event)
      const response = await fetch(signUpUrl, {
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