import api from "../init";

export default {
    deleteTransactions: (data: object) =>
        api.post(`transactions/delete/`, data),
    categorizeTransactions: (data: object) =>
        api.post(`transactions/categorize/`, data),
    createTransaction: (data: object) => api.post("transactions/", data),
    deleteTransaction: (transactionId: string) =>
        api.delete(`transactions/${transactionId}/`),
    getTransactions: (params: object) => api.get("transactions/", { params }),
    getTransaction: (transactionId: string) =>
        api.get(`transactions/${transactionId}/`),
    updateTransaction: (transactionId: string, data: object) =>
        api.patch(`transactions/${transactionId}/`, data)
};
