import { format, startOfMonth } from 'date-fns'
import api from '@/api'
import { get, getOrderForBudgetId } from '@/utils'
import {
    CREATE_BUDGET,
    DELETE_BUDGET,
    SET_BUDGETS,
    SET_BUDGET,
    SET_DATE_ONE,
    SET_DATE_TWO,
} from '@/store/constants'

const store = {
    state: {
        budgets: [],
        dateOne: format(startOfMonth(new Date()), 'YYYY-MM-DD'),
        dateTwo: format(new Date(), 'YYYY-MM-DD'),
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
        GET_BUDGETS: async ({ commit, state }) => {
            try {
                const res = await api.getBudgets({
                    start_date: state.dateOne,
                    end_date: state.dateTwo,
                })
                commit(SET_BUDGETS, get(() => res.data))
            } catch (err) {
                throw get(() => err.response.data)
            }
        },
        REORDER_BUDGETS: async (
            { commit, state },
            { budgetId, newIndex, oldIndex },
        ) => {
            try {
                const isDemotion = newIndex > oldIndex
                const lowerIndex = isDemotion ? oldIndex : newIndex
                const upperIndex = isDemotion ? newIndex : oldIndex
                const budgetsToUpdate = state.budgets
                    .slice(lowerIndex, upperIndex + 1)
                    .map((budget, index) => ({
                        id: budget.id,
                        order: getOrderForBudgetId(
                            budget.id,
                            budgetId,
                            isDemotion,
                            lowerIndex,
                            upperIndex,
                            index,
                        ),
                    }))
                const budgetOrderMap = {}
                budgetsToUpdate.forEach(
                    budget => (budgetOrderMap[`${budget.id}`] = budget.order),
                )
                const budgets = state.budgets
                    .map(budget => ({
                        ...budget,
                        order:
                            budget.id in budgetOrderMap
                                ? budgetOrderMap[budget.id]
                                : budget.order,
                    }))
                    .sort((a, b) => a.order - b.order)
                commit(SET_BUDGETS, budgets)
                await api.reorderBudgets(budgetsToUpdate)
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
            state.budgets = [budget, ...state.budgets]
        },
        [DELETE_BUDGET](state, budgetId) {
            state.budgets = [
                ...state.budgets.filter(budget => budget.id !== budgetId),
            ]
        },
        [SET_BUDGETS](state, budgets) {
            state.budgets = budgets
        },
        [SET_BUDGET](state, budget) {
            state.budgets = [
                budget,
                ...state.budgets.filter(b => b.id !== budget.id),
            ]
        },
        [SET_DATE_ONE](state, dateOne) {
            state.dateOne = dateOne
        },
        [SET_DATE_TWO](state, dateTwo) {
            state.dateTwo = dateTwo
        },
    },
    getters: {
        budgets: state => state.budgets,
        dateOne: state => state.dateOne,
        dateTwo: state => state.dateTwo,
    },
}

export default { ...store }
