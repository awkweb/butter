import api from '@/api'
import { get } from '@/utils'
import {
    CREATE_BUDGET,
    DELETE_BUDGET,
    SET_BUDGETS,
    SET_BUDGET,
} from '@/store/constants'

const store = {
    state: {
        budgets: [],
    },
    actions: {
        CREATE_BUDGET: async ({ commit }, data) => {
            try {
                const res = await api.createBudget(data)
                commit(CREATE_BUDGET, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        DELETE_BUDGET: async ({ commit }, budgetId) => {
            try {
                await api.deleteBudget(budgetId)
                commit(DELETE_BUDGET, budgetId)
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        GET_BUDGETS: async ({ commit }) => {
            try {
                const res = await api.getBudgets()
                commit(SET_BUDGETS, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        UPDATE_BUDGET: async ({ commit }, { budgetId, data }) => {
            try {
                const res = await api.updateBudget(budgetId, data)
                commit(SET_BUDGET, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
    },
    mutations: {
        [CREATE_BUDGET](state, budget) {
            state.budgets = [budget, ...budgets]
        },
        [DELETE_BUDGET](state, budgetId) {
            state.budgets = [
                ...budgets.filter(budget => budget.id !== budgetId),
            ]
        },
        [SET_BUDGETS](state, budgets) {
            state.budgets = budgets
        },
        [SET_BUDGET](state, budget) {
            state.budgets = [budget, ...budgets.filter(b => b.id !== budget.id)]
        },
    },
    getters: {
        budgets: state => state.budgets,
    },
}

export default { ...store }
