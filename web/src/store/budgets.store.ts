import { action, computed, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../utils";
import { Budget } from "../types/budget";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    budgets: Array<Budget>;
    error: string;
    isLoading: boolean;
    /**
     * computed
     */
    totalBudgeted: number;
    totalSpent: number;
    totalRemaining: number;
    /**
     * action
     */
    addBudget: Function;
    getBudgets: Function;
    reset: Function;
}

export default class BudgetsStore implements Props {
    rootStore: RootStore;

    budgets: Array<Budget> = [];
    error = "";
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

    get totalRemaining(): number {
        return this.totalBudgeted - this.totalSpent;
    }

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
            ...budget,
            budgeted: budget.amountCents,
            remaining: budget.amountCents - (budgetToUpdate as Budget).spent
        };
        this.budgets = [
            ...this.budgets.slice(0, budgetIndex),
            updatedBudget,
            ...this.budgets.slice(budgetIndex + 1, this.budgets.length)
        ];
    };

    getBudgets = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: budgets } = await api.getBudgetsDashboard();
            this.budgets = budgets;
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
        this.budgets = [];
        this.error = "";
        this.isLoading = false;
    };
}
decorate(BudgetsStore, {
    /**
     * observable
     */
    budgets: observable,
    error: observable,
    isLoading: observable,
    /**
     * computed
     */
    totalBudgeted: computed,
    totalSpent: computed,
    totalRemaining: computed,
    /**
     * action
     */
    addBudget: action,
    getBudgets: action,
    reset: action
});
