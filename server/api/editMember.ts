export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const memberId = query.id
    const body = await readBody(event)
    
    
    try {
      const response = await fetch(`https://friendslist-57aea-default-rtdb.europe-west1.firebasedatabase.app/members/${memberId}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
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