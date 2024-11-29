export default defineNuxtRouteMiddleware((to, from) => {
    const userId = useCookie('userId')
    const isLoggedIn = userId.value
    const allowedRoutes = ['/', '/signin', '/signup'];

  if (!isLoggedIn && !allowedRoutes.includes(to.path)) {
    return navigateTo('/');
  }
});