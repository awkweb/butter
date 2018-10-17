import api from '../init'

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
    register: (email, password, passwordConfirm) =>
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
