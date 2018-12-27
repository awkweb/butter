import { mapValues } from 'lodash'

function camelCaseToDash(str) {
    return str
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([0-9])([^0-9])/g, '$1-$2')
        .replace(/([^0-9])([0-9])/g, '$1-$2')
        .replace(/-+/g, '-')
        .toLowerCase()
}

// breakpoints are in REM sizing.
// To calculate sizes in pixel space do BREAK_POINT_SIZE * DEFAULT_PIXEL_SIZE
const BREAKPOINTS_IN_REM = {
    xs: 1, // 16px
    sm: 30, // 480px
    md: 48, // 768px
    lg: 64, // 1024px
    xl: 75, // 1200px
}

export const BREAKPOINT_NAMES = ['xs', 'sm', 'md', 'lg', 'xl']

export function getBreakpoint(size) {
    return BREAKPOINTS_IN_REM[size]
}

function getImportantString(cssPropValue, isImportant) {
    const importantString = ' !important'
    const propValueHasImportant =
        typeof cssPropValue === 'string' &&
        !!cssPropValue.indexOf(importantString)
    return !propValueHasImportant && isImportant ? importantString : ''
}

export function style(property, value, condition, important) {
    if (condition === false || value === undefined) {
        return ''
    }
    const v = typeof value === 'number' ? value.toString() : value
    const importantString = important ? ' !important' : ''
    return `${camelCaseToDash(property)}: ${v}${importantString};`
}

export function responsiveStyle(
    originalProperty,
    value,
    transformFn,
    condition,
    important,
) {
    const property = camelCaseToDash(originalProperty)
    if (condition === false || value === undefined) {
        return ''
    }
    if (value && typeof value === 'object') {
        let v = value
        if (transformFn) {
            v = mapValues(v, transformFn)
        }
        return cssPropsForBreakpointValues(v, property, important)
    } else {
        return style(
            originalProperty,
            transformFn ? transformFn(value) : value,
            condition,
            important,
        )
    }
}

export function responsiveConditionalStyle(
    property,
    condition,
    trueValue,
    falseValue,
    important,
) {
    if (!condition) {
        return ''
    }
    if (typeof condition === 'object') {
        const values = mapValues(condition, c => (c ? trueValue : falseValue))
        return cssPropsForBreakpointValues(values, property, important)
    } else {
        return style(property, trueValue, condition, important)
    }
}

export function mediaForBreakpoint(breakpoint) {
    return `(min-width: ${getBreakpoint(breakpoint)}rem)`
}

export function cssPropForBreakpoint(
    breakpoint,
    cssPropName,
    cssPropValue,
    isImportant,
) {
    if (!cssPropValue) {
        return ''
    }
    const importantString = getImportantString(cssPropValue, isImportant)
    const propertyString = `${cssPropName}: ${cssPropValue}${importantString};`
    if (breakpoint === 'xs') {
        return propertyString
    }
    return `@media ${mediaForBreakpoint(breakpoint)} {
        ${propertyString}
    }`
}

/**
 * breakpointToValueObject: a dict mapping breakpoint strings to cssPropValues
 *      e.g. {xs: 1, md: 3}
 * cssPropName: the name of the css prop that this value is for
 *      e.g. 'display' or 'order'
 */
export const cssPropsForBreakpointValues = (
    breakpointToValueObject,
    cssPropName,
    isImportant,
) => {
    if (!breakpointToValueObject) {
        return ''
    }
    const breakpoints = Object.keys(breakpointToValueObject)
    if (breakpoints.length === 0) {
        return ''
    }

    return breakpoints
        .map(breakpoint => {
            return cssPropForBreakpoint(
                breakpoint,
                cssPropName,
                breakpointToValueObject[breakpoint],
                isImportant,
            )
        })
        .join(' ')
}

const BASE_UNIT = 0.5 // rem
const getValueAsNumber = value => BASE_UNIT * value

export const getValue = value => `${getValueAsNumber(value)}rem`

export function isResponsive(lazy) {
    if (lazy !== null && typeof lazy === 'object') {
        const keys = ['xs', 'sm', 'md', 'lg', 'xl']
        if (keys.some(k => lazy.hasOwnProperty(k))) {
            return true
        }
    }

    return false
}

export function makeResponsive(a) {
    return { xs: a }
}

export function convertLazy(lazy) {
    if (typeof lazy === 'undefined') {
        return lazy
    }
    if (lazy === null) {
        return lazy
    }
    if (typeof lazy === 'string' || typeof lazy === 'number') {
        return makeResponsive(lazy)
    }
    if (lazy === true) {
        return makeResponsive(lazy)
    }
    if (isResponsive(lazy)) {
        return lazy
    }
    return makeResponsive(lazy)
}

export function transformValues(object, mapFn) {
    const result = {}

    for (const key in object) {
        if (object[key] !== undefined) {
            result[key] = mapFn(object[key], key, object)
        }
    }

    return result
}
