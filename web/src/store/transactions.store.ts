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

    addTransaction = (transaction: Transaction) => {
        this.transactions = [transaction, ...this.transactions];
    };

    removeTransaction = (transactionId: string) => {
        this.transactions = [
            ...this.transactions.filter(
                transaction => transaction.id !== transactionId
            )
        ];
    };

    updateTransaction = (transaction: Transaction) => {
        const transactionIndex = this.transactions.findIndex(
            t => t.id === transaction.id
        );
        const transactionToUpdate = this.transactions.find(
            t => t.id === transaction.id
        );
        const updatedTransaction = {
            ...transactionToUpdate,
            ...transaction
        };
        this.transactions = [
            ...this.transactions.slice(0, transactionIndex),
            updatedTransaction,
            ...this.transactions.slice(
                transactionIndex + 1,
                this.transactions.length
            )
        ];
    };

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
