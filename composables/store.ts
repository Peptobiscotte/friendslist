export const useStore = () => useState('myStore', () => ({
    token: null,
    userId:null,
    tokenExpiration: null
}))