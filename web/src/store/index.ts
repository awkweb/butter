import { observable, action, decorate, computed } from "mobx";
import ItemsStore from "./items.store";
import BudgetFormStore from "./budget-form.store";
import BudgetsStore from "./budgets.store";
import LogInStore from "./login.store";
import RegisterStore from "./register.store";
import TransactionStore from "./transactions.store";
import { get } from "../utils";
import api from "../api";
import User from "../types/user";

interface Props {
    budgetFormStore: BudgetFormStore;
    budgetsStore: BudgetsStore;
    itemsStore: ItemsStore;
    logInStore: LogInStore;
    registerStore: RegisterStore;
    transactionStore: TransactionStore;
    /**
     * observable
     */
    user?: User;
    /**
     * computed
     */
    isAuthenticated: boolean;
    userInitial: string;
    /**
     * action
     */
    setUser: Function;
    logOut: Function;
}

export default class RootStore implements Props {
    itemsStore: ItemsStore;
    budgetFormStore: BudgetFormStore;
    budgetsStore: BudgetsStore;
    logInStore: LogInStore;
    registerStore: RegisterStore;
    transactionStore: TransactionStore;
    user?: User;

    constructor() {
        this.budgetFormStore = new BudgetFormStore(this);
        this.budgetsStore = new BudgetsStore(this);
        this.itemsStore = new ItemsStore(this);
        this.logInStore = new LogInStore(this);
        this.registerStore = new RegisterStore(this);
        this.transactionStore = new TransactionStore(this);
    }

    get isAuthenticated() {
        return get(() => this.user !== undefined);
    }

    get userInitial() {
        const user = this.user as User;
        return (
            get(() => (user.firstName as string)[0]) || get(() => user.email[0])
        );
    }

    setUser = (user?: User) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            api.setAuthorizationToken(get(() => user.token));
        } else {
            localStorage.removeItem("user");
        }
        this.user = user;
    };

    logOut = async () => {
        try {
            await api.logOut();
            this.setUser(undefined);
            this.budgetFormStore.reset();
        } catch (err) {
            throw get(() => err.response.data);
        }
    };
}
decorate(RootStore, {
    user: observable,
    isAuthenticated: computed,
    userInitial: computed,
    setUser: action,
    logOut: action
});
