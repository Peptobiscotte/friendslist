<template>
    <div class="flex flex-col items-center gap-16">
        <div class="flex justify-center mt-20 text-slate-300">
            <h1 class="max-w-5xl text-center text-6xl font-bold">Sign up to get started</h1>
        </div>
        <div class="bg-slate-800 border border-slate-700 py-8 px-16 rounded-md">
            <form @submit.prevent="submitForm">
                <div class="grid grid-rows-2 gap-4">
                    <div class="grid grid-cols-4">
                        <label for="email" class="col-span-1 mr-8 text-slate-200">Email</label>
                        <input @focus="inputClear" v-model.trim="formData.email.value" type="email" name="email" id="email" class="bg-slate-800 border rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="formData.email.class">
                    </div>
                    <div class="grid grid-cols-4">
                        <label for="firstName" class="col-span-1 mr-8 text-slate-200">First Name</label>
                        <input @focus="inputClear" v-model.trim="formData.firstName.value" type="text" name="firstName" id="firstName" class="bg-slate-800 border rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="formData.firstName.class">
                    </div>
                    <div class="grid grid-cols-4">
                        <label for="lastName" class="col-span-1 mr-8 text-slate-200">Last Name</label>
                        <input @focus="inputClear" v-model.trim="formData.lastName.value" type="text" name="lastName" id="lastName" class="bg-slate-800 border rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="formData.lastName.class">
                    </div>
                    <div class="grid grid-cols-4">
                        <label for="phone" class="col-span-1 mr-8 text-slate-200">Phone number</label>
                        <input @focus="inputClear" v-model.trim="formData.phone.value" type="tel" name="phone" id="phone" class="bg-slate-800 border rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="formData.phone.class">
                    </div>
                    <div class="grid grid-cols-4">
                        <label for="password" class="col-span-1 mr-8 text-slate-200">Password</label>
                        <input @focus="inputClear" v-model.trim="formData.password.value" type="password" name="password" id="password" class="bg-slate-800 border rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="formData.password.class">
                    </div>
                </div>
                <p v-if="!password.valid">Password must be at least 8 characters.</p>
                <!-- <p>{{ store.loggedIn }}</p>                -->
                <div class="flex justify-center mt-4">
                    <button class="bg-slate-900 rounded-md py-2 px-4 transition ease-in-out duration-300 hover:bg-slate-700">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

const formIsValid = ref(false)
const isError = ref(false)

const formData = reactive({
    email: {value: '', valid: true, class:'border-slate-600'},
    firstName: {value: '', valid: true, class:'border-slate-600'},
    lastName: {value: '', valid: true, class:'border-slate-600'},
    password: {value: '', valid: true, class:'border-slate-600'},
    phone: {value: '', valid: true, class:'border-slate-600'},
})

const email = reactive({value: '', valid: true})
const firstName = reactive({value: '', valid: true})
const lastName = reactive({value: '', valid: true})
const password = reactive({value: '', valid: true})
const phone = reactive({value: '', valid: true})

const errorStylePass = ref('border-slate-600')
const errorStyleMail = ref('')

const submitForm = async function() {
    validateForm()
    if (!formIsValid.value) {
        isError.value = true
        return;
      }
    const userInfos = {     
        email: formData.email.value,
        password: formData.password.value,
        returnSecureToken: true
    }
    const userInfosExtended = {
        email: formData.email.value,
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        phone: formData.phone.value,
    }

    await useFetch('/api/addUser', {
        method: 'POST',
        body: userInfos
    })
    const {data} = await useFetch('/api/signUser', {
        method: 'POST',
        body: userInfos
    })
    
    const token = useCookie('token')
    token.value = data.value.idToken

    const userId = useCookie('userId')
    userId.value = data.value.localId

    await useFetch('/api/addUserInfos', {
        method: 'POST',
        body: userInfosExtended,
        query: {
            id: userId.value,
            token: token.value
        }
    })
    reloadNuxtApp({
        path: '/about'
    })
}

const validateForm = function() {
    formData.password.valid = false
    formData.email.valid = false
    formData.firstName.valid = false
    formData.lastName.valid = false
    formData.phone.valid = false
    formIsValid.value = true

    const namePattern = /^[A-Za-z]+$/

    if(formData.email.value === '') {
        formIsValid.value = false
        formData.email.class = 'border-red-500'
    } else {
        formData.email.valid = true
    }
    if(formData.firstName.value === '' || !namePattern.test(formData.firstName.value)) {
        formData.firstName.class = 'border-red-500'
        formIsValid.value = false
    } else {
        formData.firstName.valid = true
    }
    if(formData.lastName.value === '' || !namePattern.test(formData.lastName.value)) {
        formData.lastName.class = 'border-red-500'
        formIsValid.value = false
    } else {
        formData.lastName.valid = true
    }
    if(formData.phone.value === '' || formData.phone.value.length !== 10 || namePattern.test(formData.phone.value)) {
        formData.phone.class = 'border-red-500'
        formIsValid.value = false
    } else {
        formData.phone.valid = true
    }
    if(formData.password.value === '' || formData.password.value.length < 8) {
        formData.password.class = 'border-red-500'
        formIsValid.value = false
    } else {
        formData.password.valid = true
    }
}

const errorStyle = function(comp) {
    formData[comp].class = 'border-red-500'
}

const inputClear = function(event) {
    const target = event.target.id
    formData[target].value = ''
    formData[target].class = 'border-slate-600'
}
</script>