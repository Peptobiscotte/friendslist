export const useStore = () => {
    useState('name', () => localStorage.getItem('userId'))
}