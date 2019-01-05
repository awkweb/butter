export interface Account {
    accountId: string;
    mask: string;
    name: string;
    subtype: string;
    type: string;
}

export interface Institution {
    institutionId: string;
    name: string;
}

export interface Item {
    account: Account;
    dateCreated: string;
    id: string;
    institution: Institution;
    publicToken: string;
}
