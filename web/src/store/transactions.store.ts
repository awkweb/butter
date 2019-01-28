import { action, decorate, observable, computed, toJS } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Transaction } from "../types/transaction";
import { Budget } from "../types/budget";

const PAGE_SIZE = 10;

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    budgets: Array<Budget>;
    selectedTransactionIds: Array<string>;
    transactions: Array<Transaction>;
    transactionCount: number;
    page: number;
    isLoading: boolean;
    /**
     * computed
     */
    allSelected: boolean;
    anySelected: boolean;
    nextDisabled: boolean;
    prevDisabled: boolean;
    pagesCount: number;
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
    transactionCount = 0;
    page = 1;
    isLoading = false;
    startDelete = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    get allSelected(): boolean {
        return (
            this.transactions.length > 0 &&
            this.selectedTransactionIds.length === this.transactions.length
        );
    }

    get anySelected(): boolean {
        return this.selectedTransactionIds.length > 0;
    }

    get nextDisabled(): boolean {
        const nextOffset = this.page * PAGE_SIZE;
        return nextOffset > this.transactionCount;
    }

    get prevDisabled(): boolean {
        return this.page === 1;
    }

    get pagesCount(): number {
        return Math.ceil(this.transactionCount / PAGE_SIZE);
    }

    getBudgets = async () => {
        try {
            const {
                data: { results: budgets }
            } = await api.budgets.getBulk();
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
                await api.transactions.deleteBulk(transactionIds);
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
        const params = new URLSearchParams(location.search);
        const pageParam = get(() => params.get("page"));
        let offset;
        if (pageParam) {
            const page = parseInt(pageParam);
            offset = (page - 1) * PAGE_SIZE;
            this.page = page;
        }

        try {
            this.isLoading = true;
            const {
                data: { count, results: transactions }
            } = await api.transactions.getBulk({
                budget,
                offset
            });
            this.transactions = transactions;
            this.transactionCount = count;
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
            await api.transactions.categorizeBulk({
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
    transactionCount: observable,
    isLoading: observable,
    startDelete: observable,
    /**
     * computed
     */
    allSelected: computed,
    anySelected: computed,
    nextDisabled: computed,
    prevDisabled: computed,
    pagesCount: computed,
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
