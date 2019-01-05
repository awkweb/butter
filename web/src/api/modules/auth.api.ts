import api from "../init";

export default {
    changePassword: (
        password: string,
        passwordConfirm: string,
        passwordVerify: string
    ) =>
        api.patch("auth/password/change/", {
            password,
            password_confirm: passwordConfirm,
            password_verify: passwordVerify
        }),
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
        }),
    updateUserInfo: (
        userId: string,
        email: string,
        firstName: string,
        lastName: string
    ) =>
        api.patch(`users/${userId}/`, {
            email,
            first_name: firstName,
            last_name: lastName
        })
};
