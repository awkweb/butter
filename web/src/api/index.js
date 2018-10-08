import axios from 'axios'

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://api.budget.com/v1/'
        : 'https://api.budget.local/v1/'
const api = axios.create({
    baseURL,
})

export default {
    changePassword: (password, passwordConfirm, passwordVerify) =>
        api.patch('auth/password/change/', {
            password,
            password_confirm: passwordConfirm,
            password_verify: passwordVerify,
        }),
    linkPlaid: data => api.post('auth/link/plaid/', data),
    logIn: (email, password) =>
        api.post('auth/login/', {
            email,
            password,
        }),
    logOut: () => api.post('auth/logout/'),
    setAuthorizationToken(token) {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Token ${token}`
        } else {
            api.defaults.headers.common = {}
        }
    },
    signUp: (email, password, passwordConfirm) =>
        api.post('auth/register/', {
            email,
            password,
            password_confirm: passwordConfirm,
        }),
    updateUserInfo: (userId, email, firstName, lastName) =>
        api.patch(`users/${userId}/`, {
            email,
            first_name: firstName,
            last_name: lastName,
        }),
}
