import api from '../init'

export default {
    createTransaction: data => api.post('transactions/', data),
    deleteTransaction: transactionId =>
        api.delete(`transactions/${transactionId}/`),
    getTransactions: params => api.get('transactions/', { params }),
    getTransaction: transactionId => api.get(`transactions/${transactionId}/`),
    updateTransaction: (transactionId, data) =>
        api.patch(`transactions/${transactionId}/`, data),
    fetchTransactions: () => api.get('transactions/fetch'),
}
