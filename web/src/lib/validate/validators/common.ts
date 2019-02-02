import { withParams } from "../withParams";

// "required" core, used in almost every validator to allow empty values
export const req = (value: any) => {
    if (Array.isArray(value)) {
        return !!value.length;
    }
    if (value === undefined || value === null) {
        return false;
    }

    if (value === false) {
        return true;
    }

    if (value instanceof Date) {
        // invalid date won't pass
        return !isNaN(value.getTime());
    }

    if (typeof value === "object") {
        // tslint:disable-next-line
        for (const _ in value) {
            return true;
        }
        return false;
    }

    return !!String(value).length;
};

// get length in type-agnostic way
export const len = (value: any) => {
    if (Array.isArray(value)) {
        return value.length;
    }
    if (typeof value === "object") {
        return Object.keys(value).length;
    }
    return String(value).length;
};

// regex based validator template
export const regex = (type: string, expr: RegExp) =>
    withParams({ type }, (value: any) => !req(value) || expr.test(value));
