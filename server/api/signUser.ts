import { useCookie } from "nuxt/app"


export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event)
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeqnTc5It3dsXpvwF_DizdWWVhgMznEHA', {
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
  