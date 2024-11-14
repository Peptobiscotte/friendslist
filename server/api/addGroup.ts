export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event)
      const response = await fetch('https://friendslist-57aea-default-rtdb.europe-west1.firebasedatabase.app/groups.json', {
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