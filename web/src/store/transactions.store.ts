import { action, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Transaction } from "../types/transaction";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    transactions: Array<Transaction>;
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
            this.isLoading = true;
            const {
                data: { results: transactions }
            } = await api.getTransactions({});
            this.transactions = transactions;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
        this.transactions = [];
        this.isLoading = false;
    };
}
decorate(TransactionsStore, {
    /**
     * observable
     */
    transactions: observable,
    isLoading: observable,
    /**
     * action
     */
    getTransactions: action,
    reset: action
});
