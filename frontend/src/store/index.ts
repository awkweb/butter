import { observable, action, decorate, computed } from "mobx";
import LogInStore from "./login.store";
import RegisterStore from "./register.store";
import { get } from "../utils";

interface Props {
    logInStore: LogInStore;
    registerStore: RegisterStore;
    user?: object;
    setUser: Function;
}

export default class RootStore implements Props {
    logInStore: LogInStore;
    registerStore: RegisterStore;
    user?: object;

    constructor() {
        this.logInStore = new LogInStore(this);
        this.registerStore = new RegisterStore(this);
    }

    get isAuthenticated() {
        return get(() => this.user !== undefined);
    }

    setUser = (user: object) => {
        this.user = user;
    };
}
decorate(RootStore, {
    user: observable,
    isAuthenticated: computed,
    setUser: action
});
