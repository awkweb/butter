import { action, decorate, observable } from "mobx";

import api from "../api";
import { get } from "../lib/get";
import { Item } from "../types/item";

interface Props {
    /**
     * observable
     */
    items: Item[];
    isDeleting: boolean;
    isLoading: boolean;
    /**
     * action
     */
    createItem: (data: object) => void;
    deleteItem: (id: string) => void;
    getItems: () => void;
    renewLink: (id: string) => void;
    reset: () => void;
}

export default class ItemsStore implements Props {
    public items: Item[] = [];
    public isDeleting = false;
    public isLoading = false;

    public createItem = async (data: object) => {
        try {
            const { data: item } = await api.items.create(data);
            this.items = [...this.items, item].sort((a, b) => {
                const aName = a.institution.name;
                const bName = b.institution.name;
                if (aName > bName) {
                    return 1;
                } else if (aName < bName) {
                    return -1;
                }
                return 0;
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public deleteItem = async (id: string) => {
        try {
            this.isDeleting = true;
            await api.items.delete(id);
            this.items = [...this.items.filter(item => item.id !== id)];
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isDeleting = false;
        }
    };

    public renewLink = async (id: string) => {
        try {
            await api.items.update(id, {
                expired: false
            });
            const itemIndex = this.items.findIndex(i => i.id === id);
            const item = this.items.find(i => i.id === id);
            this.items = [
                ...this.items.slice(0, itemIndex),
                // tslint:disable-next-line
                { ...item, expired: false } as Item,
                ...this.items.slice(itemIndex + 1, this.items.length)
            ];
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    public getItems = async () => {
        try {
            this.isLoading = true;
            const { data: items } = await api.items.getBulk();
            this.items = items;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    public reset = () => {
        this.items = [];
        this.isDeleting = false;
        this.isLoading = false;
    };
}
decorate(ItemsStore, {
    /**
     * observable
     */
    items: observable,
    isDeleting: observable,
    isLoading: observable,
    /**
     * action
     */
    createItem: action,
    deleteItem: action,
    getItems: action,
    renewLink: action,
    reset: action
});
