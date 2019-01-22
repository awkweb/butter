import { action, decorate, observable, computed, toJS } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Transaction } from "../types/transaction";
import { Budget } from "../types/budget";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    budgets: Array<Budget>;
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
    handleCategorize: Function;
    handleOutsideClick: Function;
    reset: Function;
}

export default class TransactionsStore implements Props {
    rootStore: RootStore;

    selectedTransactionIds: Array<string> = [];
    budgets: Array<Budget> = [];
    transactions: Array<Transaction> = [];
    isLoading = false;
    startDelete = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    get allSelected(): boolean {
        return this.selectedTransactionIds.length === this.transactions.length;
    }

    get anySelected(): boolean {
        return this.selectedTransactionIds.length > 0;
    }

    getBudgets = async () => {
        try {
            const {
                data: { results: budgets }
            } = await api.getBudgets();
            this.budgets = budgets.sort((a: Budget, b: Budget) => {
                if (a.name > b.name) return 1;
                else if (a.name < b.name) return -1;
                return 0;
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

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

    deleteTransactions = async () => {
        if (this.startDelete) {
            try {
                const transactionIds = toJS(this.selectedTransactionIds);
                await api.deleteTransactions(transactionIds);
                this.transactions = [
                    ...this.transactions.filter(
                        transaction => !transactionIds.includes(transaction.id)
                    )
                ];
                this.selectedTransactionIds = [];
            } catch (err) {
                const error = get(() => err.response.data);
                throw error;
            } finally {
                this.startDelete = false;
            }
        } else {
            this.startDelete = true;
        }
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

    getTransactions = async (budget = undefined) => {
        try {
            this.isLoading = true;
            const {
                data: { results: transactions }
            } = await api.getTransactions({
                budget
            });
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

    handleCategorize = async (budgetId: string) => {
        try {
            const transactionIds = toJS(this.selectedTransactionIds);
            await api.categorizeTransactions({
                budget_id: budgetId,
                transaction_ids: transactionIds
            });
            // this.transactions = [
            //     ...this.transactions.filter(
            //         transaction => !transactionIds.includes(transaction.id)
            //     )
            // ];
            this.selectedTransactionIds = [];
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
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

    handleOutsideClick = () => {
        this.startDelete = false;
    };

    reset = () => {
        this.budgets = [];
        this.selectedTransactionIds = [];
        this.transactions = [];
        this.startDelete = false;
        this.isLoading = false;
    };
}
decorate(TransactionsStore, {
    /**
     * observable
     */
    budgets: observable,
    selectedTransactionIds: observable,
    transactions: observable,
    isLoading: observable,
    startDelete: observable,
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
    handleCategorize: action,
    handleOutsideClick: action,
    reset: action
});
