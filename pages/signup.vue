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
                        <input @focus="emailClear" v-model.trim="email.value" type="email" name="email" id="email" class="bg-slate-800 border border-slate-600 rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="errorStyleMail">
                    </div>
                    <div class="grid grid-cols-4">
                        <label for="password" class="col-span-1 mr-8 text-slate-200">Password</label>
                        <input @focus="passClear" v-model.trim="password.value" type="password" name="password" id="password" class="bg-slate-800 border border-slate-600 rounded-md py-1 col-span-3 pl-2 focus:outline-none focus:border-slate-300" :class="errorStyle">
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

const email = reactive({value: '', valid: true})
const password = reactive({value: '', valid: true})

const errorStyle = ref('')
const errorStyleMail = ref('')

const submitForm = async function() {
    validateForm()
    if (!formIsValid.value) {
        isError.value = true
        return;
      }
    const userInfos = {     
        email: email.value,
        password: password.value,
        returnSecureToken: true
    }

    console.log(userInfos)

    await useFetch('/api/addUser', {
        method: 'POST',
        body: userInfos
    })
}

const validateForm = function() {
    password.valid = false
    email.valid = false
    formIsValid.value = true

    if(email.value === '') {
        formIsValid.value = false
        errorStyleMail.value = 'border-red-500'
    } else {
        email.valid = true
    }
    if(password.value === '' || password.value.length < 8) {
        formIsValid.value = false
        errorStyle.value = 'border-red-500'
    } else {
        password.valid = true
    }
}

const passClear = function() {
    password.valid = true
    errorStyle.value = ''
}
const emailClear = function() {
    email.valid = true
    errorStyleMail.value = ''
}
</script>