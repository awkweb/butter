export interface Responsive<T> {
    xs?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

export type Breakpoint = keyof Responsive<any>;

export type LazyResponsive<T> = T | Responsive<T>;

export function isResponsive<T>(
    lazy: LazyResponsive<T>
): lazy is Responsive<T> {
    if (lazy !== null && typeof lazy === "object") {
        const keys: Array<keyof Responsive<any>> = [
            "xs",
            "sm",
            "md",
            "lg",
            "xl"
        ];
        if (keys.some(k => lazy.hasOwnProperty(k))) {
            return true;
        }
    }

    return false;
}

export function makeResponsive<T>(a: T): Responsive<T> {
    return { xs: a };
}

export function convertLazy(lazy: LazyResponsive<string>): Responsive<string>;
export function convertLazy(lazy: LazyResponsive<number>): Responsive<number>;
export function convertLazy(lazy: LazyResponsive<object>): Responsive<object>;
export function convertLazy(
    lazy: LazyResponsive<string> | undefined
): Responsive<string> | undefined;
export function convertLazy(
    lazy: LazyResponsive<number> | undefined
): Responsive<number> | undefined;
export function convertLazy(
    lazy: LazyResponsive<object> | undefined
): Responsive<object> | undefined;
export function convertLazy(lazy: undefined): undefined;
export function convertLazy(lazy: null): null;
export function convertLazy<T>(lazy: true | LazyResponsive<T>): Responsive<T>;
export function convertLazy<T>(
    lazy: true | undefined | LazyResponsive<T>
): Responsive<T> | undefined;

export function convertLazy<T>(
    lazy: true | LazyResponsive<T | string | number | object> | undefined | null
): LazyResponsive<T | string | number | object> | undefined | null {
    if (typeof lazy === "undefined") {
        return lazy;
    }
    if (lazy === null) {
        return lazy;
    }
    if (typeof lazy === "string" || typeof lazy === "number") {
        return makeResponsive(lazy);
    }
    if (lazy === true) {
        return makeResponsive(lazy);
    }
    if (isResponsive(lazy)) {
        return lazy;
    }
    return makeResponsive(lazy);
}

export function transformValues<T, O>(
    object: Responsive<T>,
    mapFn: (value: T, key: Breakpoint, object: Responsive<T>) => O
): Responsive<O> {
    const result: Responsive<O> = {};

    for (const key in object) {
        if (object[key as Breakpoint] !== undefined) {
            result[key as Breakpoint] = mapFn(
                object[key as Breakpoint]!,
                key as Breakpoint,
                object
            );
        }
    }

    return result;
}
