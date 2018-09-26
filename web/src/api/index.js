import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.budget.com/v1/'
        : 'https://api.budget.local/v1/'
const api = axios.create({
    baseURL,
})

export default {
    setAuthorizationToken(token) {
        api.defaults.headers.common['Authorization'] = `Token ${token}`
    },
    linkPlaid: data => api.post('auth/link/plaid/', data),
    logIn: (email, password) =>
        api.post('auth/login/', {
            email,
            password,
        }),
    logOut: () => api.post('auth/logout/'),
    signUp: (email, password, passwordConfirm) =>
        api.post('auth/register/', {
            email,
            password,
            password_confirm: passwordConfirm,
        }),
}
