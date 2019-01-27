import api from "../init";

export default {
    create: (data: object) => api.post("budgets/", data),
    delete: (budgetId: string) => api.delete(`budgets/${budgetId}/`),
    get: (budgetId: string) => api.get(`budgets/${budgetId}/`),
    getBulk: () => api.get("budgets/"),
    getDashboard: (params: object = {}) =>
        api.get("budgets/dashboard", { params }),
    update: (budgetId: string, data: object) =>
        api.patch(`budgets/${budgetId}/`, data)
};
