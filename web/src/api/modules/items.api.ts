import api from "../init";

export default {
    createItem: (data: object) => api.post("items/", data),
    deleteItem: (itemId: string) => api.delete(`items/${itemId}/`),
    getItems: () => api.get("items/"),
    getItem: (itemId: string) => api.get(`items/${itemId}/`),
    updateItem: (itemId: string, data: object) =>
        api.patch(`items/${itemId}/`, data)
};
