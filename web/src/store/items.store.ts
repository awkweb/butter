import { action, decorate, observable } from "mobx";
import api from "../api";
import RootStore from "./index";
import { get } from "../utils";
import { Item } from "../types/item";

interface Props {
    rootStore: RootStore;
    /**
     * observable
     */
    items: Array<Item>;
    error: string;
    isDeleting: boolean;
    isLoading: boolean;
    /**
     * action
     */
    createItem: Function;
    deleteItem: Function;
    getItems: Function;
    reset: Function;
}

export default class ItemsStore implements Props {
    rootStore: RootStore;

    items: Array<Item> = [];
    error = "";
    isDeleting = false;
    isLoading = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    createItem = async (data: object) => {
        try {
            const { data: item } = await api.createItem(data);
            this.items = [...this.items, item];
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        }
    };

    deleteItem = async (id: string) => {
        try {
            this.isDeleting = true;
            await api.deleteItem(id);
            this.items = [...this.items.filter(item => item.id !== id)];
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
        } finally {
            this.isDeleting = false;
        }
    };

    getItems = async () => {
        try {
            this.error = "";
            this.isLoading = true;
            const { data: items } = await api.getItems();
            this.items = items;
        } catch (err) {
            const error = get(() => err.response.data);
            console.log(error);
            this.error = error;
        } finally {
            this.isLoading = false;
        }
    };

    reset = () => {
        this.items = [];
        this.error = "";
        this.isDeleting = false;
        this.isLoading = false;
    };
}
decorate(ItemsStore, {
    /**
     * observable
     */
    items: observable,
    error: observable,
    isDeleting: observable,
    isLoading: observable,
    /**
     * action
     */
    createItem: action,
    deleteItem: action,
    getItems: action,
    reset: action
});
