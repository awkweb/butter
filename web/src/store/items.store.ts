import { action, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../lib/get";
import { Item } from "../types/item";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    items: Array<Item>;
    isDeleting: boolean;
    isLoading: boolean;
    /**
     * action
     */
    createItem: Function;
    deleteItem: Function;
    getItems: Function;
    renewLink: Function;
    reset: Function;
}

export default class ItemsStore implements Props {
    rootStore: RootStore;

    items: Array<Item> = [];
    isDeleting = false;
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    createItem = async (data: object) => {
        try {
            const { data: item } = await api.createItem(data);
            this.items = [...this.items, item].sort((a, b) => {
                const aName = a.institution.name;
                const bName = b.institution.name;
                if (aName > bName) return 1;
                else if (aName < bName) return -1;
                return 0;
            });
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    deleteItem = async (id: string) => {
        try {
            this.isDeleting = true;
            await api.deleteItem(id);
            this.items = [...this.items.filter(item => item.id !== id)];
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isDeleting = false;
        }
    };

    renewLink = async (id: string) => {
        try {
            await api.updateItem(id, {
                expired: false
            });
            const itemIndex = this.items.findIndex(i => i.id === id);
            const item = this.items.find(i => i.id === id);
            this.items = [
                ...this.items.slice(0, itemIndex),
                { ...item, expired: false } as Item,
                ...this.items.slice(itemIndex + 1, this.items.length)
            ];
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        }
    };

    getItems = async () => {
        try {
            this.isLoading = true;
            const { data: items } = await api.getItems();
            this.items = items;
        } catch (err) {
            const error = get(() => err.response.data);
            throw error;
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
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
