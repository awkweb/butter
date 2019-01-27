import api from "../init";

export default {
    categorizeBulk: (data: object) =>
        api.post(`transactions/categorize/`, data),
    create: (data: object) => api.post("transactions/", data),
    delete: (transactionId: string) =>
        api.delete(`transactions/${transactionId}/`),
    deleteBulk: (data: object) => api.post(`transactions/delete/`, data),
    get: (transactionId: string) => api.get(`transactions/${transactionId}/`),
    getBulk: (params: object) => api.get("transactions/", { params }),
    update: (transactionId: string, data: object) =>
        api.patch(`transactions/${transactionId}/`, data)
};
