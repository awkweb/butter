// tslint:disable-next-line
import mapValues from "lodash/mapValues";

import { Theme } from "../theme";

import { camelCaseToDash } from "./camelCaseToDash";
import { convertLazy, Responsive } from "./responsive";

export type LazyResponsive<T> = T | Responsive<T>;

export type Transformer<Type, Key extends keyof React.CSSProperties> = (
    value: Type
) => React.CSSProperties[Key];

export type ResponsibleProps<
    ResponsiblePropNames extends string,
    T = string
> = { [PropName in ResponsiblePropNames]?: LazyResponsive<T> } & {
    theme: Theme;
};

export function respondTo<
    Type,
    Key extends keyof React.CSSProperties,
    Props extends ResponsibleProps<Key, Type>
>(props: Props, cssProperty: Key, transformer?: Transformer<Type, Key>) {
    const lazyResponsive = props[cssProperty];
    if (!lazyResponsive) {
        return;
    }
    const responsiveProperty = convertLazy(props[cssProperty]);

    const responded = transformer
        ? mapValues(responsiveProperty, (key: Type) => transformer(key))
        : responsiveProperty;
    return props.theme.responsive.cssPropsForBreakpointValues(
        responded,
        camelCaseToDash(cssProperty)
    );
}

export function alignSelf<
    Props extends ResponsibleProps<"alignSelf", T>,
    T = React.CSSProperties["alignSelf"]
>(props: Props, transformer?: Transformer<T, "alignSelf">) {
    return respondTo(props, "alignSelf", transformer);
}

export function alignItems<
    Props extends ResponsibleProps<"alignItems", T>,
    T = React.CSSProperties["alignItems"]
>(props: Props, transformer?: Transformer<T, "alignItems">) {
    return respondTo(props, "alignItems", transformer);
}

export function borderRadius<
    Props extends ResponsibleProps<"borderRadius", T>,
    T = React.CSSProperties["borderRadius"]
>(props: Props, transformer?: Transformer<T, "borderRadius">) {
    return respondTo(props, "borderRadius", transformer);
}

export function display<
    Props extends ResponsibleProps<"display", T>,
    T = React.CSSProperties["display"]
>(props: Props, transformer?: Transformer<T, "display">) {
    return respondTo(props, "display", transformer);
}

export function order<
    Props extends ResponsibleProps<"order", T>,
    T = React.CSSProperties["order"]
>(props: Props, transformer?: Transformer<T, "order">) {
    return respondTo(props, "order", transformer);
}

export function marginLeft<
    Props extends ResponsibleProps<"left", T>,
    T = React.CSSProperties["left"]
>(props: Props, transformer?: Transformer<T, "left">) {
    return respondTo(props, "left", transformer);
}

export function marginRight<
    Props extends ResponsibleProps<"right", T>,
    T = React.CSSProperties["right"]
>(props: Props, transformer?: Transformer<T, "right">) {
    return respondTo(props, "right", transformer);
}

export function width<
    Props extends ResponsibleProps<"width", T>,
    T = React.CSSProperties["width"]
>(props: Props, transformer?: Transformer<T, "width">) {
    return respondTo(props, "width", transformer);
}

export function height<
    Props extends ResponsibleProps<"height", T>,
    T = React.CSSProperties["height"]
>(props: Props, transformer?: Transformer<T, "height">) {
    return respondTo(props, "height", transformer);
}
