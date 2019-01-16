import { Account } from "./account";
import { Institution } from "./institution";

export interface Item {
    account: Account;
    dateCreated: string;
    expired: boolean;
    id: string;
    institution: Institution;
    publicToken: string;
}
