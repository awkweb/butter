import api from "../init";

export default {
    createTransaction: (data: object) => api.post("transactions/", data),
    deleteTransaction: (transactionId: string) =>
        api.delete(`transactions/${transactionId}/`),
    getTransactions: (params: object) => api.get("transactions/", { params }),
    getTransaction: (transactionId: string) =>
        api.get(`transactions/${transactionId}/`),
    updateTransaction: (transactionId: string, data: object) =>
        api.patch(`transactions/${transactionId}/`, data),
    fetchTransactions: () => api.get("transactions/fetch")
};
