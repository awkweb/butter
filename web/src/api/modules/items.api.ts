import api from "../init";

export default {
    create: (data: object) => api.post("items/", data),
    delete: (itemId: string) => api.delete(`items/${itemId}/`),
    getBulk: () => api.get("items/"),
    update: (itemId: string, data: object) =>
        api.patch(`items/${itemId}/`, data)
};
