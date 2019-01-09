export interface Account {
    id: string;
    accountId: string;
    mask: string;
    name: string;
    subtype: string;
    type: string;
}

export interface Institution {
    color: string;
    institutionId: string;
    name: string;
}

export interface Item {
    account: Account;
    expired: boolean;
    dateCreated: string;
    id: string;
    institution: Institution;
    publicToken: string;
}
