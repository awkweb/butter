import api from "../init";

export default {
    createBudget: (data: object) => api.post("budgets/", data),
    deleteBudget: (budgetId: string) => api.delete(`budgets/${budgetId}/`),
    getBudgets: () => api.get("budgets/"),
    getBudgetsDashboard: (params: object = {}) =>
        api.get("budgets/dashboard", { params }),
    getBudget: (budgetId: string) => api.get(`budgets/${budgetId}/`),
    reorderBudgets: (data: object) => api.post("budgets/reorder/", data),
    updateBudget: (budgetId: string, data: object) =>
        api.patch(`budgets/${budgetId}/`, data)
};
