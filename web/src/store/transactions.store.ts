import { action, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../utils";
import { Transaction } from "../types/transaction";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    transactions: Array<Transaction>;
    error: string;
    isLoading: boolean;
    /**
     * action
     */
    getTransactions: Function;
    reset: Function;
}

export default class TransactionsStore implements Props {
    rootStore: RootStore;

    transactions: Array<Transaction> = [];
    error = "";
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    getTransactions = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: transactions } = await api.getTransactions({});
            this.transactions = transactions;
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
        this.transactions = [];
        this.error = "";
        this.isLoading = false;
    };
}
decorate(TransactionsStore, {
    /**
     * observable
     */
    transactions: observable,
    error: observable,
    isLoading: observable,
    /**
     * action
     */
    getTransactions: action,
    reset: action
});
