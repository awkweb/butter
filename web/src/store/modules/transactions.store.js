import api from '@/api'
import { get } from '@/utils'
import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    SET_TRANSACTIONS,
    SET_TRANSACTION,
} from '@/store/constants'

const store = {
    state: {
        transactions: [],
    },
    actions: {
        CREATE_TRANSACTION: async ({ commit }, data) => {
            try {
                const res = await api.createTransaction(data)
                commit(ADD_TRANSACTION, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        DELETE_TRANSACTION: async ({ commit }, transactionId) => {
            try {
                await api.deleteTransaction(transactionId)
                commit(DELETE_TRANSACTION, transactionId)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        GET_TRANSACTIONS: async ({ commit }) => {
            try {
                const res = await api.getTransactions()
                commit(SET_TRANSACTIONS, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        UPDATE_TRANSACTION: async ({ commit }, { transactionId, data }) => {
            try {
                const res = await api.updateTransaction(transactionId, data)
                commit(SET_TRANSACTION, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
    },
    mutations: {
        [ADD_TRANSACTION](state, transaction) {
            state.transactions = [transaction, ...state.transactions]
        },
        [DELETE_TRANSACTION](state, transactionId) {
            state.transactions = [
                ...state.transactions.filter(
                    transaction => transaction.id !== transactionId,
                ),
            ]
        },
        [SET_TRANSACTIONS](state, transactions) {
            state.transactions = transactions
        },
        [SET_TRANSACTION](state, transaction) {
            state.transactions = [
                transaction,
                ...state.transactions.filter(b => b.id !== transaction.id),
            ]
        },
    },
    getters: {
        transactions: state => state.transactions,
    },
}

export default { ...store }
