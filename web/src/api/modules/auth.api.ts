import api from "../init";

export default {
    logIn: (email: string, password: string) =>
        api.post("auth/login/", {
            email,
            password
        }),
    logOut: () => api.post("auth/logout/"),
    setAuthorizationToken(token: string) {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            api.defaults.headers.common = {};
        }
    },
    register: (email: string, password: string, passwordConfirm: string) =>
        api.post("auth/register/", {
            email,
            password,
            password_confirm: passwordConfirm
        })
};
