<template>
  <div class="flex flex-col gap-8 items-center">
      <div class="flex justify-center mt-20 text-slate-300">
          <h1 class="max-w-5xl text-center text-6xl font-bold">A simple, intuitive way to manage and organize your contacts.</h1>
      </div>
      <div class="flex justify-center text-center">
          <p class="max-w-4xl text-pretty text-xl">We designed FriendsList with one goal in mind: to make it easy for you to keep track of the people who matter most. Whether you're looking to store personal connections, professional contacts, or group lists, FriendsList provides a seamless solution to ensure you never lose touch.</p>
      </div>
      <div class="">
          <NuxtLink to="/about" class="transition delay-50 duration-500 hover:translate-y-10 ease-in-out text-lg border-2 border-slate-700 rounded-md p-3 hover:bg-slate-700 hover:text-slate-300">Sign up to get started!</NuxtLink>
      </div>
  </div>
  <div class="flex mt-32 mx-32">
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Organize Contacts Easily</h1>
          <h2 class="text-xl text-slate-400 text-left max-w-md">Create custom categories, tags, and filters for efficient access and organization.</h2>
          <div class="border-2 border-slate-700 rounded-md w-96 h-96 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="../public/toucan.svg" class="w-60 hover:animate-spin"></NuxtImg>
          </div>
      </div>
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Smart Search & Sorting</h1>
          <h2 class="text-xl text-slate-400 text-left max-w-md">Find who you need quickly with advanced search options and customizable sorting.</h2>
          <div class="border-2 border-slate-700 rounded-md w-96 h-96 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="../public/chameleon.svg" class="w-60 hover:animate-spin"></NuxtImg>
          </div>
      </div>
      <div class="basis-1/3 flex flex-col items-center text-center text-2xl text-slate-300 gap-4">
          <h1>Notes & Reminders</h1>
          <h2 class="text-xl text-slate-400 text-left max-w-md">Attach notes, set reminders, and track important dates or milestones with ease.</h2>
          <div class="border-2 border-slate-700 rounded-md w-96 h-96 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="../public/whale.svg" class="w-60 hover:animate-spin"></NuxtImg>
          </div>
      </div>
  </div>
  <div class="flex mt-32 mx-32">
      <div class="flex flex-col gap-4 basis-1/3 items-center text-2xl text-slate-300">
          <h1>Collaborate & Share</h1>
          <h2 class="text-xl text-slate-400 text-left max-w-md">Share specific lists with friends, family, or colleagues, making it perfect for group projects, family events, and professional networking.</h2>
          <div class="border-2 border-slate-700 rounded-md w-96 h-96 bg-slate-800 flex justify-center items-center">
              <NuxtImg src="../public/mianyang.svg" class="w-60 hover:animate-spin"></NuxtImg>
          </div>
      </div>
  </div>
</template>