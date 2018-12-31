import {
    Breakpoint,
    Responsive,
    transformValues as transformValuesUtil
} from "../utils/responsive";

const DEFAULT_PIXEL_SIZE = 16;

// breakpoints are in REM sizing.
// To calculate sizes in pixel space do BREAK_POINT_SIZE * DEFAULT_PIXEL_SIZE
const BREAKPOINTS_IN_REM: Required<Responsive<number>> = {
    xs: 1, // 16px
    sm: 30, // 480px
    md: 48, // 768px
    lg: 64, // 1024px
    xl: 75 // 1200px
};

export const BREAKPOINT_NAMES: Breakpoint[] = ["xs", "sm", "md", "lg", "xl"];

const getRemToPixel = (pixelSize: number) => pixelSize * DEFAULT_PIXEL_SIZE;

const getBreakpoint = (size: Breakpoint) => BREAKPOINTS_IN_REM[size];

const getBreakpointInPixels = (size: Breakpoint) => {
    return BREAKPOINTS_IN_REM[size] * DEFAULT_PIXEL_SIZE;
};

const getBreakpointsInPixels = () => {
    return transformValuesUtil(BREAKPOINTS_IN_REM, (rem: number) => {
        return getRemToPixel(rem);
    });
};

const transformValues = transformValuesUtil;

const getImportantString = (cssPropValue: string, isImportant?: boolean) => {
    const importantString = " !important";
    const propValueHasImportant =
        typeof cssPropValue === "string" &&
        !!cssPropValue.indexOf(importantString);
    return !propValueHasImportant && isImportant ? importantString : "";
};

export function mediaForBreakpoint(breakpoint: Breakpoint): string {
    return `(min-width: ${getBreakpoint(breakpoint)}rem)`;
}

const cssPropForBreakpoint = (
    breakpoint: Breakpoint,
    cssPropName: string,
    cssPropValue?: string,
    isImportant?: boolean
) => {
    if (!cssPropValue) {
        return "";
    }
    const importantString = getImportantString(cssPropValue, isImportant);
    const propertyString = `${cssPropName}: ${cssPropValue}${importantString};`;
    if (breakpoint === "xs") {
        return propertyString;
    }
    return `@media ${mediaForBreakpoint(breakpoint)} {
        ${propertyString}
    }`;
};

/**
 * breakpointToValueObject: a dict mapping breakpoint strings to cssPropValues
 *      e.g. {xs: 1, md: 3}
 * cssPropName: the name of the css prop that this value is for
 *      e.g. 'display' or 'order'
 */
const cssPropsForBreakpointValues = (
    breakpointToValueObject: Responsive<any> | null | undefined,
    cssPropName: string,
    isImportant?: boolean
) => {
    if (!breakpointToValueObject) {
        return "";
    }
    const breakpoints = Object.keys(breakpointToValueObject) as Breakpoint[];
    if (breakpoints.length === 0) {
        return "";
    }

    return breakpoints
        .map((breakpoint: Breakpoint) => {
            return cssPropForBreakpoint(
                breakpoint,
                cssPropName,
                breakpointToValueObject[breakpoint],
                isImportant
            );
        })
        .join(" ");
};

const cssPropForResolution = (
    resolution: number,
    cssPropName: string,
    cssPropValue: string
) => {
    if (!cssPropValue) {
        return "";
    }
    if (resolution <= 1) {
        return `${cssPropName}: ${cssPropValue};`;
    }
    return `@media (min-resolution: ${resolution * 96}dpi) {
        ${cssPropName}: ${cssPropValue};
    }`;
};

/**
 * resolutionToValueObject: a dict mapping pixel density numbers to cssPropValues
 *      e.g. {1: 'url(my-image.png)', 2: 'url(my-image@2x.png)'}
 * cssPropName: the name of the css prop that this value is for
 *      e.g. 'display' or 'order'
 */
const cssPropsForResolutionValues = (
    resolutionToValueObject: { [key: number]: string },
    cssPropName: string
) => {
    if (!resolutionToValueObject) {
        return "";
    }
    const resolutions: number[] = Object.keys(resolutionToValueObject).map(
        Number
    );
    if (resolutions.length === 0) {
        return "";
    }
    return resolutions
        .map(resolution => {
            return cssPropForResolution(
                resolution,
                cssPropName,
                resolutionToValueObject[resolution]
            );
        })
        .join(" ");
};

export default Object.freeze({
    BREAKPOINT_NAMES,
    getBreakpoint,
    getBreakpointInPixels,
    getBreakpointsInPixels,
    cssPropsForBreakpointValues,
    cssPropsForResolutionValues,
    transformValues
});
