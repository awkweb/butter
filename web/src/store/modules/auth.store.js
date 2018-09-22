import api from '@/api'
import { get } from '@/utils'
import { SET_USER } from '@/store/constants'

const store = {
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    actions: {
        LOG_IN_USER: async ({ commit }, data) => {
            try {
                const res = await api.logIn(data.email, data.password)
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
        SIGN_UP_USER: async ({ commit }, data) => {
            try {
                const res = await api.signUp(
                    data.email,
                    data.password,
                    data.passwordConfirm,
                )
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
            state.user = user
        },
    },
    getters: {
        user: state => state.user,
    },
}

export default { ...store }
