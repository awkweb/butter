import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.budget.com/v1/'
        : 'https://api.budget.local/v1/'
const instance = axios.create({
    baseURL,
})

export default {
    logIn: (email, password) =>
        instance.post('auth/login/', {
            email,
            password,
        }),
    logOut: () => instance.post('auth/logout/'),
    signUp: (email, password, passwordConfirm) =>
        instance.post('auth/register/', {
            email,
            password,
            password_confirm: passwordConfirm,
        }),
}
