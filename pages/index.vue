<template>
  <div class="mx-2 flex flex-col gap-8 items-center font-poppins">
      <div class="flex justify-center mt-20 text-slate-300">
          <h1 class="max-w-5xl text-center text-4xl sm:text-6xl font-bold">A simple, intuitive way to manage and organize your contacts.</h1>
      </div>
      <div class="flex justify-center text-center">
          <p class="max-w-4xl text-pretty text-xl">We designed FriendsList with one goal in mind: to make it easy for you to keep track of the people who matter most. Whether you're looking to store personal connections, professional contacts, or group lists, FriendsList provides a seamless solution to ensure you never lose touch.</p>
      </div>
      <div class="flex flex-col items-center gap-4">
          <NuxtLink to="/signup" class="transition delay-50 duration-500 ease-in-out text-lg border-2 border-slate-700 rounded-md p-3 hover:bg-slate-700 hover:text-slate-300">Sign up to get started!</NuxtLink>
            <p>or</p>
          <NuxtLink to="/signin" class="transition delay-50 duration-500 ease-in-out text-lg border-2 border-slate-700 rounded-md p-3 hover:bg-slate-700 hover:text-slate-300">Sign in</NuxtLink>
      </div>
  </div>
  <div class="flex flex-col lg:flex-row mt-32 mx-8 lg:mx-32 font-poppins gap-16 lg:gap-0">
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Organize Contacts Easily</h1>
          <h2 class="text-xl text-slate-400 text-center max-w-md">Create custom categories, tags, and filters for efficient access and organization.</h2>
          <div class="border-2 border-slate-700 rounded-md w-60 h-60 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="/toucan.svg" class="w-60"></NuxtImg>
          </div>
      </div>
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Smart Search & Sorting</h1>
          <h2 class="text-xl text-slate-400 text-center max-w-md">Find who you need quickly with advanced search options and customizable sorting.</h2>
          <div class="border-2 border-slate-700 rounded-md w-60 h-60 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="/chameleon.svg" class="w-60"></NuxtImg>
          </div>
      </div>
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Notes & Reminders</h1>
          <h2 class="text-xl text-slate-400 text-center max-w-md">Attach notes, set reminders, and track important dates or milestones with ease.</h2>
          <div class="border-2 border-slate-700 rounded-md w-60 h-60 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="/whale.svg" class="w-60"></NuxtImg>
          </div>
      </div>
  </div>
  <div class="flex mt-16 lg:mt-32 mx-8 lg:mx-32 pb-32 font-poppins justify-center">
      <div class="flex flex-col gap-4 lg:basis-1/3 items-center text-2xl text-slate-300">
          <h1>Collaborate & Share</h1>
          <h2 class="text-xl text-slate-400 text-center max-w-md">Share specific lists with friends, family, or colleagues, making it perfect for group projects, family events, and professional networking.</h2>
          <div class="border-2 border-slate-700 rounded-md w-60 h-60 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="/mianyang.svg" class="w-60"></NuxtImg>
          </div>
      </div>
  </div>
</template>
