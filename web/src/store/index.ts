import { action, computed, decorate, observable } from "mobx";

import api from "../api";
import { get } from "../lib/get";
import User from "../types/user";

import LogInStore from "./auth/login.store";
import RegisterStore from "./auth/register.store";
import BudgetFormStore from "./budget-form.store";
import BudgetsStore from "./budgets.store";
import ItemsStore from "./items.store";
import TransactionFormStore from "./transaction-form.store";
import TransactionsStore from "./transactions.store";

interface Props {
    budgetFormStore: BudgetFormStore;
    budgetsStore: BudgetsStore;
    itemsStore: ItemsStore;
    logInStore: LogInStore;
    registerStore: RegisterStore;
    transactionsStore: TransactionsStore;
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
    setUser: (user?: User) => void;
    logOut: () => void;
}

export default class RootStore implements Props {
    public itemsStore: ItemsStore;
    public budgetFormStore: BudgetFormStore;
    public budgetsStore: BudgetsStore;
    public logInStore: LogInStore;
    public registerStore: RegisterStore;
    public transactionFormStore: TransactionFormStore;
    public transactionsStore: TransactionsStore;
    public user?: User;

    constructor() {
        this.budgetFormStore = new BudgetFormStore(this);
        this.budgetsStore = new BudgetsStore();
        this.itemsStore = new ItemsStore();
        this.logInStore = new LogInStore(this);
        this.registerStore = new RegisterStore(this);
        this.transactionFormStore = new TransactionFormStore(this);
        this.transactionsStore = new TransactionsStore(this);
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

    public setUser = (user?: User) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            api.auth.setAuthorizationToken(get(() => user.token));
        } else {
            localStorage.removeItem("user");
        }
        this.user = user;
    };

    public logOut = async () => {
        try {
            await api.auth.logOut();
            this.setUser(undefined);
            this.budgetFormStore.reset();
            this.budgetsStore.reset();
            this.itemsStore.reset();
            this.transactionsStore.reset();
            this.transactionFormStore.reset();
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
