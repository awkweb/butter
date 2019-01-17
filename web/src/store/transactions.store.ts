import { action, decorate, observable, computed, toJS } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Transaction } from "../types/transaction";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    selectedTransactionIds: Array<string>;
    transactions: Array<Transaction>;
    isLoading: boolean;
    /**
     * computed
     */
    allSelected: boolean;
    anySelected: boolean;
    /**
     * action
     */
    deleteTransactions: Function;
    getTransactions: Function;
    handleSelectAll: Function;
    selectTransaction: Function;
    reset: Function;
}

export default class TransactionsStore implements Props {
    rootStore: RootStore;

    selectedTransactionIds: Array<string> = [];
    transactions: Array<Transaction> = [];
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    get allSelected(): boolean {
        return this.selectedTransactionIds.length === this.transactions.length;
    }

    get anySelected(): boolean {
        return this.selectedTransactionIds.length > 0;
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

    deleteTransactions = () => {
        console.log(toJS(this.selectedTransactionIds));
    };

    updateTransaction = (transaction: Transaction) => {
        const transactionIndex = this.transactions.findIndex(
            t => t.id === transaction.id
        );
        const transactionToUpdate = this.transactions.find(
            t => t.id === transaction.id
        );
        const updatedTransaction = { ...transactionToUpdate, ...transaction };
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

    handleSelectAll = () => {
        if (this.allSelected) {
            this.selectedTransactionIds = [];
        } else {
            this.selectedTransactionIds = [
                ...this.transactions.map(
                    (transaction: Transaction) => transaction.id
                )
            ];
        }
    };

    selectTransaction = (id: string) => {
        let transactionIds;
        if (this.selectedTransactionIds.includes(id)) {
            transactionIds = [
                ...this.selectedTransactionIds.filter(
                    transactionId => transactionId !== id
                )
            ];
        } else {
            transactionIds = [...this.selectedTransactionIds, id];
        }
        this.selectedTransactionIds = transactionIds;
    };

    reset = () => {
        this.selectedTransactionIds = [];
        this.transactions = [];
        this.isLoading = false;
    };
}
decorate(TransactionsStore, {
    /**
     * observable
     */
    selectedTransactionIds: observable,
    transactions: observable,
    isLoading: observable,
    /**
     * computed
     */
    allSelected: computed,
    anySelected: computed,
    /**
     * action
     */
    deleteTransactions: action,
    getTransactions: action,
    handleSelectAll: action,
    selectTransaction: action,
    reset: action
});
