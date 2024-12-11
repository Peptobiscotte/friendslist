<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const props = defineProps(['userName', 'userLastName', 'userDesc', 'userEmail', 'userPhone', 'userType', 'userId', 'userNb', 'id', 'token'])

const firstName = reactive({value: props.userName, valid: true})
const lastName = reactive({value: props.userLastName, valid: true})
const email = reactive({value: props.userEmail, valid: true})
const phone = reactive({value: props.userPhone, valid: true})
const note = reactive({value: props.userDesc, valid: true})
const contactType = ref(props.userType)

const formIsValid = ref(false)
const isError = ref(false)

const router = useRouter()
const id = props.userId

const submitForm = async function() {
    validateForm()
    if (!formIsValid.value) {
        isError.value = true
        return;
      }
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        note: note.value,
        contactType: contactType.value,
        phone: phone.value
    }
    
     await useFetch('/api/editMember', {
        method: 'PATCH',
        query: {
            id,
            userId: props.id,
            token: props.token
        },
        body: {
          userName: contact.firstName,
          userLastName: contact.lastName,
          userDesc: contact.note,
          userType: contact.contactType,
          userEmail: contact.email,
          userPhone: contact.phone, 
        }
     })
     await navigateTo(`/users/${id}`)
     toast({
        title: 'Contact successfully edited!',
      });
      setTimeout(() => {
        router.go(0)
      }, 2000);
}



const validateForm = function() {
    isError.value = false
    formIsValid.value = true
    firstName.valid = false
    lastName.valid = false
    email.valid = false
    phone.valid = false

    const namePattern = /^[A-Za-zéè]+$/

    if(firstName.value === '' || !namePattern.test(firstName.value)) {
        formIsValid.value = false
    } else {
        firstName.valid = true
    }
    if(lastName.value === '' || !namePattern.test(lastName.value)) {
        formIsValid.value = false
    } else {
        lastName.valid = true
    }
    if(email.value === '') {
        formIsValid.value = false
    } else {
        email.valid = true
    }
    if(phone.value === '' || phone.value.length !== 10 || namePattern.test(phone.value)) {
        formIsValid.value = false
    } else {
        phone.valid = true
    }
}

</script>

<template>
    <Toaster/>
  <AlertDialog>
    <AlertDialogTrigger><NuxtImg src="/pen.svg" class="w-8"></NuxtImg></AlertDialogTrigger>
    <AlertDialogContent class="bg-slate-800 border-slate-700">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-slate-300 text-xl">Edit contact infos</AlertDialogTitle>
        <AlertDialogDescription class="text-slate-400 text-lg">
            <form class="mt-8 flex flex-col gap-4">
            <div class="grid items-center grid-cols-4 gap-4">
                <label for="userName" class="text-slate-400 text-right">Name</label>
                <input type="text" name="userName" id="userName" v-model.trim="firstName.value" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300">
            </div>
            <div class="grid items-center grid-cols-4 gap-4">
                <label for="lastName" class="text-slate-400 text-right">Last Name</label>
                <input type="text" name="lastName" id="lastName" v-model.trim="lastName.value" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300">
            </div>
            <div class="grid items-center grid-cols-4 gap-4">
                <label for="email" class="text-slate-400 text-right">Email</label>
                <input type="email" name="email" id="email" v-model.trim="email.value" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300">
            </div>
            <div class="grid items-center grid-cols-4 gap-4">
                <label for="phone" class="text-slate-400 text-right">Phone</label>
                <input type="tel" name="phone" id="phone" v-model.trim="phone.value" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300">
            </div>
            <div class="grid items-center grid-cols-4 gap-4">
                <label for="description" class="text-slate-400 text-right">Note</label>
                <textarea rows="3" v-model="note.value" name="description" id="description" class="text-slate-300 bg-slate-900 border border-slate-700 text-md px-3 py-1 rounded-md col-span-3 focus:outline-none focus:border-slate-300"></textarea>
            </div>
            <div class="grid grid-rows-3 text-slate-400 items-end justify-end">
                <div class="flex gap-2">
                    <input type="radio" name="radio" id="friend" value="friend" checked v-model="contactType">
                    <label for="radio">Friend</label>
                </div>
                <div class="flex gap-2">
                    <input type="radio" name="radio" id="family" value="family" v-model="contactType">
                    <label for="radio">Family</label>
                </div>
                <div class="flex gap-2">
                    <input type="radio" name="radio" id="other" value="other" v-model="contactType">
                    <label for="radio">Other</label>
                </div>
            </div>
            <p v-if="isError" class="text-slate-300 font-semibold">Invalid form please check your infos before sending again.</p>
        </form>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="bg-slate-500 border-none hover:bg-slate-400 text-base">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="submitForm" class="text-base hover:bg-blue-600">Edit</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>