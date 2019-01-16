import { Account } from "./account";
import { Budget } from "./budget";

export interface Transaction {
    account: Account;
    amountCents: number;
    budget: Budget;
    date: string;
    description: number;
    id: string;
    name: string;
}
