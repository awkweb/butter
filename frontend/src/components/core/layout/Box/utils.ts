import { Theme } from "../../../theme/index";
import { AnyColor } from "../../../types/color";
import { Units } from "../../../types/space";
import {
    convertLazy,
    LazyResponsive,
    Responsive,
    transformValues
} from "../../../utils/responsive";

import { Border, Props } from "./";

interface Themed {
    theme: Theme;
}

type BorderProps = Pick<
    Props,
    | "b"
    | "bt"
    | "br"
    | "bb"
    | "bl"
    | "borderColor"
    | "borderStrokeWidth"
    | "borderStyle"
> &
    Themed;

type PaddingProps = Pick<Props, "p" | "pt" | "pr" | "pl" | "pb" | "pv" | "ph"> &
    Themed;

type MarginProps = Pick<Props, "m" | "mt" | "mr" | "ml" | "mb" | "mv" | "mh"> &
    Themed;

const _convertResponsiveUnitsToValues = (
    responsiveUnits: Responsive<Units>,
    theme: Theme
) =>
    transformValues(
        responsiveUnits,
        (unitValue: Units): string => theme.units.getValue(unitValue)
    );

const _responsiveLayout = (
    ruleName: string,
    theme: Theme,
    base?: LazyResponsive<Units>,
    top?: LazyResponsive<Units>,
    right?: LazyResponsive<Units>,
    left?: LazyResponsive<Units>,
    bottom?: LazyResponsive<Units>,
    vertical?: LazyResponsive<Units>,
    horizontal?: LazyResponsive<Units>
) => {
    // make props responsive
    const rRoot = convertLazy(base);
    const rTop = convertLazy(top);
    const rRight = convertLazy(right);
    const rLeft = convertLazy(left);
    const rBottom = convertLazy(bottom);
    const rVertical = convertLazy(vertical);
    const rHorizontal = convertLazy(horizontal);
    // unify into single dictionaries per side and transform into values
    const unifiedTop = _convertResponsiveUnitsToValues(
        { xs: 0, ...rRoot, ...rVertical, ...rTop },
        theme
    );
    const unifiedRight = _convertResponsiveUnitsToValues(
        { xs: 0, ...rRoot, ...rHorizontal, ...rRight },
        theme
    );
    const unifiedBottom = _convertResponsiveUnitsToValues(
        { xs: 0, ...rRoot, ...rVertical, ...rBottom },
        theme
    );
    const unifiedLeft = _convertResponsiveUnitsToValues(
        { xs: 0, ...rRoot, ...rHorizontal, ...rLeft },
        theme
    );
    // return responsive rules for each side
    return `${theme.responsive.cssPropsForBreakpointValues(
        unifiedTop,
        `${ruleName}-top`
    )}; ${theme.responsive.cssPropsForBreakpointValues(
        unifiedRight,
        `${ruleName}-right`
    )}; ${theme.responsive.cssPropsForBreakpointValues(
        unifiedBottom,
        `${ruleName}-bottom`
    )}; ${theme.responsive.cssPropsForBreakpointValues(
        unifiedLeft,
        `${ruleName}-left`
    )};`;
};

export const getPadding = ({
    theme,
    p,
    pt,
    pr,
    pl,
    pb,
    pv,
    ph
}: PaddingProps) =>
    _responsiveLayout("padding", theme, p, pt, pr, pl, pb, pv, ph);

export const getMargin = ({ theme, m, mt, mr, ml, mb, mv, mh }: MarginProps) =>
    _responsiveLayout("margin", theme, m, mt, mr, ml, mb, mv, mh);

const _borderInnerValue = (
    theme: Theme,
    borderColor: AnyColor,
    borderStrokeWidth: string | undefined,
    borderStyle: string
) => (border: Border) => {
    if (border && typeof border === "boolean") {
        return `${borderStyle} ${borderStrokeWidth ||
            theme.strokeWidths.default} ${theme.colors[borderColor]}`;
    } else if (border) {
        return border;
    }
    return "none";
};

const _border = (
    propType:
        | "border"
        | "border-top"
        | "border-right"
        | "border-bottom"
        | "border-left",
    theme: Theme,
    borderColor: AnyColor,
    borderStyle: string,
    border?: Responsive<Border>,
    borderStrokeWidth?: string
) => {
    if (!border) {
        return "";
    }
    const transformationFn = _borderInnerValue(
        theme,
        borderColor,
        borderStrokeWidth,
        borderStyle
    );
    const borderValues = theme.responsive.transformValues(
        border,
        transformationFn
    );
    return theme.responsive.cssPropsForBreakpointValues(borderValues, propType);
};

export const getBorder = ({
    theme,
    b,
    bt,
    br,
    bb,
    bl,
    borderColor,
    borderStrokeWidth,
    borderStyle
}: BorderProps) => {
    if (b) {
        return `${_border(
            "border",
            theme,
            borderColor,
            borderStyle,
            convertLazy(b),
            borderStrokeWidth
        )};`;
    }

    return `
        ${_border(
            "border-top",
            theme,
            borderColor,
            borderStyle,
            convertLazy(bt),
            borderStrokeWidth
        )};
        ${_border(
            "border-right",
            theme,
            borderColor,
            borderStyle,
            convertLazy(br),
            borderStrokeWidth
        )};
        ${_border(
            "border-bottom",
            theme,
            borderColor,
            borderStyle,
            convertLazy(bb),
            borderStrokeWidth
        )};
        ${_border(
            "border-left",
            theme,
            borderColor,
            borderStyle,
            convertLazy(bl),
            borderStrokeWidth
        )};
    `;
};
