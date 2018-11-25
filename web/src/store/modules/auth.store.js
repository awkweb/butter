import api from '@/api'
import { get } from '@/utils'
import { SET_USER } from '@/store/constants'

const store = {
    state: {
        user: get(() => JSON.parse(localStorage.getItem('user'))),
    },
    actions: {
        CHANGE_PASSWORD: async (
            { commit },
            { password, passwordConfirm, passwordVerify },
        ) => {
            try {
                const res = await api.changePassword(
                    password,
                    passwordConfirm,
                    passwordVerify,
                )
                return res.data
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        LOG_IN_USER: async ({ commit }, { email, password }) => {
            try {
                const res = await api.logIn(email, password)
                commit(SET_USER, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        LOG_OUT_USER: async ({ commit }) => {
            try {
                await api.logOut()
                commit(SET_USER, undefined)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        SIGN_UP_USER: async (
            { commit },
            { email, password, passwordConfirm },
        ) => {
            try {
                const res = await api.register(email, password, passwordConfirm)
                commit(SET_USER, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        UPDATE_USER_INFO: async (
            { commit, state },
            { email, firstName, lastName },
        ) => {
            try {
                const userId = state.user.id
                const res = await api.updateUserInfo(
                    userId,
                    email,
                    firstName,
                    lastName,
                )
                const user = {
                    ...state.user,
                    ...get(() => res.data),
                }
                commit(SET_USER, user)
                return 'Updated info'
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
    },
    mutations: {
        [SET_USER](state, user) {
            if (user) localStorage.setItem('user', JSON.stringify(user))
            else localStorage.removeItem('user')
            api.setAuthorizationToken(get(() => user.token))
            state.user = user
        },
    },
    getters: {
        user: state => state.user,
    },
}

export default { ...store }
