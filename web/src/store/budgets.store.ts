import { action, computed, decorate, observable } from "mobx";
import moment, { Moment } from "moment";
import { parse } from "query-string";

import api from "../api";
import { get } from "../lib/get";
import { Budget } from "../types/budget";

interface Props {
    /**
     * observable
     */
    budgets: Budget[];
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
    changeTransactions: (
        budgetId: string,
        amount: number,
        count: number
    ) => void;
    addBudget: (budget: Budget) => void;
    getBudgets: () => void;
    setStartDate: (startDate: Moment | null) => void;
    setEndDate: (endDate: Moment | null) => void;
    reset: () => void;
}

export default class BudgetsStore implements Props {
    public budgets: Budget[] = [];
    public startDate: Moment | null = moment().startOf("month");
    public endDate: Moment | null = moment();
    public isLoading = false;

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

    public changeTransactions = (
        budgetId: string,
        amount: number,
        count: number
    ) => {
        const budget = this.budgets.find(b => b.id === budgetId);
        if (budget) {
            const spent = budget.spent - amount;
            this.updateBudget({
                ...budget,
                spent,
                amountCents: budget.budgeted,
                remaining: budget.budgeted - spent,
                transactionCount: budget.transactionCount + count
            });
        }
    };

    public addBudget = (budget: Budget) => {
        this.budgets = [...this.budgets, budget].sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            } else if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    };

    public removeBudget = (budgetId: string) => {
        this.budgets = [
            ...this.budgets.filter(budget => budget.id !== budgetId)
        ];
    };

    public updateBudget = (budget: Budget) => {
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

    public getBudgets = async () => {
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
            if (endDate) {
                this.endDate = moment(endDate);
            }
            this.budgets = budgets;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    public setStartDate = (startDate: Moment | null) => {
        this.startDate = startDate;
    };

    public setEndDate = (endDate: Moment | null) => {
        this.endDate = endDate;
    };

    public reset = () => {
        this.budgets = [];
        this.startDate = moment().startOf("month");
        this.endDate = moment();
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
    changeTransactions: action,
    addBudget: action,
    getBudgets: action,
    setStartDate: action,
    setEndDate: action,
    reset: action
});
