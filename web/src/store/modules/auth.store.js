import api from '@/api'
import { get } from '@/utils'
import { SET_USER } from '@/store/constants'

const store = {
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    actions: {
        LINK_PLAID: async ({ commit }, { token }) => {
            try {
                const res = await api.linkPlaid(token)
                console.log(res)
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
                commit(SET_USER, null)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        SIGN_UP_USER: async (
            { commit },
            { email, password, passwordConfirm },
        ) => {
            try {
                const res = await api.signUp(email, password, passwordConfirm)
                commit(SET_USER, get(() => res.data))
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
