import api from '@/api'
import { get } from '@/utils'
import { ADD_ITEM, DELETE_ITEM, SET_ITEMS, SET_ITEM } from '@/store/constants'

const store = {
    state: {
        items: [],
    },
    actions: {
        DELETE_ITEM: async ({ commit }, itemId) => {
            try {
                await api.deleteItem(itemId)
                commit(DELETE_ITEM, itemId)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        GET_ITEMS: async ({ commit }) => {
            try {
                const res = await api.getItems()
                commit(SET_ITEMS, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        LINK_PLAID: async ({ commit }, data) => {
            try {
                return await api.linkPlaid(data)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        UPDATE_ITEM: async ({ commit }, { itemId, data }) => {
            try {
                const res = await api.updateItem(itemId, data)
                commit(SET_ITEM, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
    },
    mutations: {
        [ADD_ITEM](state, item) {
            state.items = [...state.items, item]
        },
        [DELETE_ITEM](state, itemId) {
            state.items = [...state.items.filter(item => item.id !== itemId)]
        },
        [SET_ITEMS](state, items) {
            state.items = items
        },
        [SET_ITEM](state, item) {
            state.items = [item, ...state.items.filter(i => i.id !== items.id)]
        },
    },
    getters: {
        items: state => state.items,
    },
}

export default { ...store }
