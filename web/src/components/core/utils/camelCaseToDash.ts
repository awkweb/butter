import { CSSProperties } from "react";
export function camelCaseToDash<Property extends keyof CSSProperties>(
    str: Property
): string {
    return str
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/([0-9])([^0-9])/g, "$1-$2")
        .replace(/([^0-9])([0-9])/g, "$1-$2")
        .replace(/-+/g, "-")
        .toLowerCase();
}
