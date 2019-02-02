import { mapValues } from "lodash";
import { CSSProperties } from "react";

import { Theme } from "../theme/index";

import { camelCaseToDash } from "./camelCaseToDash";
import { LazyResponsive } from "./responsive";

export function style<Property extends keyof CSSProperties>(
    property: Property,
    value: CSSProperties[Property] | undefined,
    condition?: boolean,
    important?: boolean
) {
    if (condition === false || value === undefined) {
        return "";
    }
    const v = typeof value === "number" ? value.toString() : value;
    const importantString = important ? " !important" : "";
    return `${camelCaseToDash(property)}: ${v}${importantString};`;
}

export function responsiveStyle<Property extends keyof CSSProperties>(
    originalProperty: Property,
    value: LazyResponsive<CSSProperties[Property]> | undefined,
    theme: Theme,
    transformFn?: (val: any) => CSSProperties[Property],
    condition?: boolean,
    important?: boolean
) {
    const property = camelCaseToDash(originalProperty);
    if (condition === false || value === undefined) {
        return "";
    }
    if (value && typeof value === "object") {
        let v = value;
        if (transformFn) {
            v = mapValues(v as object, transformFn);
        }
        return theme!.responsive.cssPropsForBreakpointValues(
            v,
            property,
            important
        );
    } else {
        return style(
            originalProperty,
            transformFn ? transformFn(value) : value,
            condition,
            important
        );
    }
}

export function responsiveConditionalStyle<
    Property extends keyof CSSProperties
>(
    property: Property,
    condition: LazyResponsive<boolean> | undefined,
    trueValue: CSSProperties[Property],
    falseValue: CSSProperties[Property],
    theme: Theme,
    important?: boolean
) {
    if (!condition) {
        return "";
    }
    if (typeof condition === "object") {
        const values = mapValues(condition, c => (c ? trueValue : falseValue));
        return theme.responsive.cssPropsForBreakpointValues(
            values,
            property,
            important
        );
    } else {
        return style(property, trueValue, condition, important);
    }
}
