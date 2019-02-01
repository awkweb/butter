import { action, computed, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Budget } from "../types/budget";
import moment, { Moment } from "moment";
import { parse } from "query-string";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    budgets: Array<Budget>;
    startDate: Moment | null;
    endDate: Moment | null;
    isLoading: boolean;
    /**
     * computed
     */
    totalBudgeted: number;
    totalSpent: number;
    /**
     * action
     */
    addTransaction: Function;
    removeTransaction: Function;
    updateTransaction: Function;
    addBudget: Function;
    getBudgets: Function;
    setStartDate: Function;
    setEndDate: Function;
    reset: Function;
}

export default class BudgetsStore implements Props {
    rootStore: RootStore;

    budgets: Array<Budget> = [];
    startDate: Moment | null = moment().startOf("month");
    endDate: Moment | null = moment();
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    get totalBudgeted(): number {
        return (
            this.budgets.reduce(
                (total, budget: Budget) => total + budget.budgeted,
                0
            ) || 0
        );
    }

    get totalSpent(): number {
        return (
            this.budgets.reduce(
                (total, budget: Budget) => total + budget.spent,
                0
            ) || 0
        );
    }

    addTransaction = (budgetId: string, amount: number) => {
        const budget = this.budgets.find(b => b.id === budgetId);
        if (budget) {
            const spent = budget.spent + amount;
            this.updateBudget({
                ...budget,
                spent,
                amountCents: budget.budgeted,
                remaining: budget.budgeted - spent,
                transactionCount: budget.transactionCount + 1
            } as Budget);
        }
    };

    removeTransaction = (budgetId: string, amount: number) => {
        const budget = this.budgets.find(b => b.id === budgetId);
        if (budget) {
            const spent = budget.spent - amount;
            this.updateBudget({
                ...budget,
                spent,
                amountCents: budget.budgeted,
                remaining: budget.budgeted - spent,
                transactionCount: budget.transactionCount - 1
            } as Budget);
        }
    };

    updateTransaction = (budgetId: string, amount: number) => {
        const budget = this.budgets.find(b => b.id === budgetId);
        if (budget) {
            const spent = budget.spent - amount;
            this.updateBudget({
                ...budget,
                spent,
                amountCents: budget.budgeted,
                remaining: budget.budgeted - spent
            } as Budget);
        }
    };

    addBudget = (budget: Budget) => {
        this.budgets = [...this.budgets, budget].sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (a.name < b.name) return -1;
            return 0;
        });
    };

    removeBudget = (budgetId: string) => {
        this.budgets = [
            ...this.budgets.filter(budget => budget.id !== budgetId)
        ];
    };

    updateBudget = (budget: Budget) => {
        const budgetIndex = this.budgets.findIndex(b => b.id === budget.id);
        const budgetToUpdate = this.budgets.find(b => b.id === budget.id);
        const updatedBudget = {
            ...budgetToUpdate,
            budgeted: budget.amountCents,
            remaining: budget.amountCents - (budgetToUpdate as Budget).spent,
            ...budget
        };
        this.budgets = [
            ...this.budgets.slice(0, budgetIndex),
            updatedBudget,
            ...this.budgets.slice(budgetIndex + 1, this.budgets.length)
        ];
    };

    getBudgets = async () => {
        const queryParams = parse(location.search);
        const startDate = queryParams.start_date;
        const endDate = queryParams.end_date;

        try {
            this.isLoading = true;
            const { data: budgets } = await api.budgets.getDashboard({
                start_date: startDate,
                end_date: endDate
            });
            this.startDate = moment(startDate);
            if (endDate) this.endDate = moment(endDate);
            this.budgets = budgets;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    setStartDate = (startDate: Moment | null) => {
        this.startDate = startDate;
    };

    setEndDate = (endDate: Moment | null) => {
        this.endDate = endDate;
    };

    reset = () => {
        this.budgets = [];
        this.isLoading = false;
    };
}
decorate(BudgetsStore, {
    /**
     * observable
     */
    budgets: observable,
    startDate: observable,
    endDate: observable,
    isLoading: observable,
    /**
     * computed
     */
    totalBudgeted: computed,
    totalSpent: computed,
    /**
     * action
     */
    addTransaction: action,
    removeTransaction: action,
    updateTransaction: action,
    addBudget: action,
    getBudgets: action,
    setStartDate: action,
    setEndDate: action,
    reset: action
});
