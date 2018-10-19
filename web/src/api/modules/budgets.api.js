import api from '../init'

export default {
    createBudget: data => api.post('budgets/', data),
    deleteBudget: budgetId => api.delete(`budgets/${budgetId}/`),
    getBudgets: params => api.get('budgets/', { params }),
    getBudget: budgetId => api.get(`budgets/${budgetId}/`),
    reorderBudgets: data => api.post('budgets/reorder/', data),
    updateBudget: (budgetId, data) => api.patch(`budgets/${budgetId}/`, data),
}
