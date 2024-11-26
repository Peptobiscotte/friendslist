export default defineEventHandler(async (event) => {
    const response =  await fetch('https://friendslist-57aea-default-rtdb.europe-west1.firebasedatabase.app/groups.json')
    const data = await response.json()

    const groups = [];

    for (const key in data) {
      const member = {
        groupId: key,
        groupName: data[key].groupName,
        groupMembers: data[key].groupMemberIds
      };
      groups.push(member);
    }

    return groups
  })