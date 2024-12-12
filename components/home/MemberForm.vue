<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const firstName = reactive({value: '', valid: true})
const lastName = reactive({value: '', valid: true})
const email = reactive({value: '', valid: true})
const phone = reactive({value: '', valid: true})
const note = reactive({value: '', valid: true})
const contactType = ref('friend')
const emit = defineEmits(['send-data'])

const formIsValid = ref(false)
const isError = ref(false)

const submitForm = function() {
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

    emit('send-data', contact)
}

const validateForm = function() {
    isError.value = false
    formIsValid.value = true
    firstName.valid = false
    lastName.valid = false
    email.valid = false
    phone.valid = false

    const namePattern = /^[A-Za-z]+$/

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
  <Sheet>
    <SheetTrigger class="transition delay-50 duration-500 ease-in-out p-2 border-2 rounded-md text-xl font-medium border-slate-700 hover:bg-slate-700 hover:text-slate-200">+ Add Contact</SheetTrigger>
    <SheetContent class="bg-slate-900 border-slate-800 font-poppins">
      <SheetHeader>
        <SheetTitle class="text-slate-300">Add a new contact</SheetTitle>
        <SheetDescription class="text-slate-400 text-md">
            "Fill out the form to add a new contact. You can include key details, assign tags, and choose categories for better organization and easy access later."
        </SheetDescription>
      </SheetHeader>
        <form @submit.prevent="submitForm" class="mt-8 flex flex-col gap-4">
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
            <div class="flex justify-between">
                <div class="grid grid-rows-3 text-slate-400 pl-12">
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
                <div class="flex justify-end mt-8">
                    <SheetClose>
                        <button class="bg-slate-300 rounded-md font-semibold px-4 py-2 transition ease-in-out duration-200 delay-75 hover:bg-slate-400">Add Contact</button>
                    </SheetClose>
            </div>
            </div>
            <p v-if="isError" class="text-slate-300 font-semibold">Invalid form please check your infos before sending again.</p>
        </form>
    </SheetContent>
  </Sheet>
</template>