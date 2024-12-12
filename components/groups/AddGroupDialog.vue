<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useToast } from '@/components/ui/toast/use-toast'

  const { toast } = useToast()
  const router = useRouter()

interface Contact {
  userId: string;
  userName: string
}

const props = defineProps(['contacts', 'userId', 'token'])
const contacts = props.contacts

const addedContact = ref<Contact[]>([])
const groupName = ref('')

const handleValidContacts = function(validContactsId: Array<string>) {
    const validContacts = contacts.filter((contact: Contact) => validContactsId.includes(contact.userId))
    addedContact.value = validContacts
}

const submitForm = async() => {
    const groupMemberIds = addedContact.value.map(member => ({ userId: member.userId })) 
    const data = {
        groupName : groupName,
        groupMemberIds: groupMemberIds
    }

    if(!data.groupName.value || data.groupMemberIds.length === 0) {
      return
    } else {
      try {
        await useFetch('/api/addGroup', {
            method: 'POST',
            body: data,
            query: {
              id: props.userId,
              token: props.token
            }
        })
        toast({
        title: 'New Group Created!',
      });
      setTimeout(() => {
        router.go(0)
      }, 2000);
    }  catch (err) {
      console.error('Error:', err)
    }
    }  
}

</script>

<template>
  <Dialog>
    <DialogTrigger as-child class="flex items-center">
      <Button variant="outline" class="bg-slate-900 border-slate-700 border-2 text-lg hover:bg-slate-700 hover:text-slate-300">
        + Create new group
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] bg-slate-800 border-slate-700">
      <DialogHeader>
        <DialogTitle class="text-slate-300">Create Group</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="grid items-center grid-cols-4 gap-4">
            <label for="groupName" class="text-slate-400 text-right">Name</label>
            <input v-model="groupName" type="text" name="groupName" id="groupName" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300">
        </div>
        <div class="flex">
            <div class="flex flex-col gap-2">
                <p class="text-slate-400 ml-auto">Members</p>
                <div v-if="addedContact" v-for="contact in addedContact">
                    <h1 class="text-slate-300">{{ contact.userName }}</h1>
                </div>
            </div>
            <GroupsContactScroll :contacts="contacts" class="ml-auto" @valid-contacts="handleValidContacts"></GroupsContactScroll>
        </div>
        <div class="flex justify-end">
            <button class="border border-slate-700 rounded-md py-1 px-2 text-slate-400 hover:bg-slate-700 hover:text-slate-300">Submit</button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>