export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const userId = query.id
    const token = query.token
    const config = useRuntimeConfig()
    const dbURL = config.public.DB

    const response =  await fetch(`${dbURL}/${userId}/members.json?auth=${token}`)
    const data = await response.json()

    const members = [];

    for (const key in data) {
      const member = {
        userId: key,
        userName: data[key].userName,
        userLastName: data[key].userLastName,
        userDesc: data[key].userDesc,
        userType: data[key].userType,
        userEmail: data[key].userEmail,
        userPhone: data[key].userPhone,
        userNb: data[key].userNb
      };
      members.push(member);
    }

    return members
  })