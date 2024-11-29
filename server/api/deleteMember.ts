export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const memberId = query.id
    const userId = query.userId
    const token = query.token
   
    
    try {
      const response = await fetch(`https://friendslist-57aea-default-rtdb.europe-west1.firebasedatabase.app/${userId}/members/${memberId}.json?auth=${token}`, {
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