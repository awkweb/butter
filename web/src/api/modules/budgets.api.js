import api from '../init'

export default {
    createBudget: data => api.post('budgets/', data),
    deleteBudget: budgetId => api.delete(`budgets/${budgetId}/`),
    getBudgets: () => api.get('budgets/'),
    getBudget: budgetId => api.get(`budgets/${budgetId}/`),
    updateBudget: (budgetId, data) => api.patch(`budgets/${budgetId}/`, data),
}
