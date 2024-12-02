import { useCookie } from "nuxt/app"


export default defineEventHandler(async (event) => {
    try {
      const config = useRuntimeConfig()
      const signInUrl = config.public.SIGN_IN

      const body = await readBody(event)
      const response = await fetch(signInUrl, {
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
  