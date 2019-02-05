import { action, computed, decorate, observable, toJS } from "mobx";
import { parse } from "query-string";

import api from "../api";
import { get } from "../lib/get";
import { Budget } from "../types/budget";
import { Transaction } from "../types/transaction";

import RootStore from "./index";

const PAGE_SIZE = 10;
const dateSorter = (a: Transaction, b: Transaction) => {
    if (a.date < b.date) {
        return 1;
    } else if (a.date > b.date) {
        return -1;
    }
    return 0;
};

interface Props {
    /**
     * observable
     */
    budgets: Budget[];
    selectedTransactionIds: string[];
    transactions: Transaction[];
    transactionCount: number;
    page: number;
    budgetFilter: string;
    isLoading: boolean;
    /**
     * computed
     */
    allSelected: boolean;
    anySelected: boolean;
    pagesCount: number;
    /**
     * action
     */
    deleteTransactions: () => void;
    getTransactions: () => void;
    handleSelectAll: () => void;
    selectTransaction: (id: string) => void;
    handleCategorize: (budgetId: string) => void;
    handleOutsideClick: () => void;
    reset: () => void;
}

export default class TransactionsStore implements Props {
    public selectedTransactionIds: string[] = [];
    public budgets: Budget[] = [];
    public transactions: Transaction[] = [];
    public transactionCount = 0;
    public page = 1;
    public budgetFilter = "all";
    public isLoading = false;
    public startDelete = false;

    private rootStore: RootStore;

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

    get pagesCount(): number {
        return Math.ceil(this.transactionCount / PAGE_SIZE);
    }

    public getBudgets = async () => {
        try {
            const { data: budgets } = await api.budgets.getBulk();
            this.budgets = budgets.sort((a: Budget, b: Budget) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public addTransaction = (transaction: Transaction) => {
        this.transactions = [transaction, ...this.transactions].sort(
            dateSorter
        );
    };

    public removeTransaction = (transactionId: string) => {
        this.transactions = [
            ...this.transactions.filter(
                transaction => transaction.id !== transactionId
            )
        ];
    };

    public deleteTransactions = async () => {
        if (this.startDelete) {
            try {
                const transactionIds = toJS(this.selectedTransactionIds);
                await api.transactions.deleteBulk(transactionIds);
                const deletedTransactions = this.transactions.filter(
                    t => transactionIds.includes(t.id) && get(() => t.budget.id)
                );
                this.transactions = [
                    ...this.transactions.filter(
                        transaction => !transactionIds.includes(transaction.id)
                    )
                ];
                this.selectedTransactionIds = [];

                // Update budget store with changes
                deletedTransactions.forEach(t => {
                    this.rootStore.budgetsStore.changeTransactions(
                        t.budget.id,
                        -t.amountCents,
                        1
                    );
                });
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

    public updateTransaction = (transaction: Transaction) => {
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
        ].sort(dateSorter);
    };

    public getTransactions = async () => {
        const queryParams = parse(location.search);
        const page = queryParams.page
            ? parseInt(queryParams.page as string, 10)
            : undefined;
        const budget =
            queryParams.budget !== "all"
                ? (queryParams.budget as string)
                : undefined;

        try {
            this.isLoading = true;
            const {
                data: { count, results: transactions }
            } = await api.transactions.getBulk({
                budget,
                page
            });
            this.page = page || 1;
            this.budgetFilter = budget || "all";
            this.selectedTransactionIds = [];
            this.transactions = transactions;
            this.transactionCount = count;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    public handleSelectAll = () => {
        if (this.allSelected) {
            this.selectedTransactionIds = [];
        } else {
            this.selectedTransactionIds = [
                ...this.transactions.map((t: Transaction) => t.id)
            ];
        }
    };

    public handleCategorize = async (budgetId: string) => {
        try {
            const transactionIds = toJS(this.selectedTransactionIds);
            await api.transactions.categorizeBulk({
                budget_id: budgetId,
                transaction_ids: transactionIds
            });

            const budget = this.budgets.find(b => b.id === budgetId) as Budget;
            const changedTransactions = this.transactions.filter(
                t =>
                    get(() => t.budget.id) !== budgetId &&
                    transactionIds.includes(t.id)
            );
            const updatedTransactions = changedTransactions.map(t => ({
                ...t,
                budget
            }));
            this.transactions = [
                ...this.transactions.filter(
                    t => !transactionIds.includes(t.id)
                ),
                ...updatedTransactions
            ].sort(dateSorter);
            this.selectedTransactionIds = [];

            // Update budget store with changes
            this.rootStore.budgetsStore.changeTransactions(
                budgetId,
                updatedTransactions.reduce(
                    (total, t: Transaction) => total + t.amountCents,
                    0
                ) || 0,
                updatedTransactions.length
            );
            changedTransactions.forEach(t => {
                if (get(() => t.budget.id) && t.budget.id !== budgetId) {
                    this.rootStore.budgetsStore.changeTransactions(
                        t.budget.id,
                        -t.amountCents,
                        1
                    );
                }
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public selectTransaction = (id: string) => {
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

    public handleOutsideClick = () => {
        this.startDelete = false;
    };

    public reset = () => {
        this.budgets = [];
        this.selectedTransactionIds = [];
        this.transactions = [];
        this.startDelete = false;
        this.page = 1;
        this.budgetFilter = "all";
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
    page: observable,
    budgetFilter: observable,
    isLoading: observable,
    startDelete: observable,
    /**
     * computed
     */
    allSelected: computed,
    anySelected: computed,
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
