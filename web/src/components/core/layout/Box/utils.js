import {
    cssPropsForBreakpointValues,
    convertLazy,
    getValue,
    transformValues,
} from '@/components/utils/css'
import Theme from '@/components/theme'
import Box from './constants'

const _convertResponsiveUnitsToValues = responsiveUnits =>
    transformValues(responsiveUnits, unitValue => getValue(unitValue))

const _responsiveLayout = (
    ruleName,
    base,
    top,
    right,
    left,
    bottom,
    vertical,
    horizontal,
) => {
    // make props responsive
    const rRoot = convertLazy(base)
    const rTop = convertLazy(top)
    const rRight = convertLazy(right)
    const rLeft = convertLazy(left)
    const rBottom = convertLazy(bottom)
    const rVertical = convertLazy(vertical)
    const rHorizontal = convertLazy(horizontal)
    // unify into single dictionaries per side and transform into values
    const unifiedTop = _convertResponsiveUnitsToValues({
        xs: 0,
        ...rRoot,
        ...rVertical,
        ...rTop,
    })
    const unifiedRight = _convertResponsiveUnitsToValues({
        xs: 0,
        ...rRoot,
        ...rHorizontal,
        ...rRight,
    })
    const unifiedBottom = _convertResponsiveUnitsToValues({
        xs: 0,
        ...rRoot,
        ...rVertical,
        ...rBottom,
    })
    const unifiedLeft = _convertResponsiveUnitsToValues({
        xs: 0,
        ...rRoot,
        ...rHorizontal,
        ...rLeft,
    })
    // return responsive rules for each side
    return `${cssPropsForBreakpointValues(
        unifiedTop,
        `${ruleName}-top`,
    )}; ${cssPropsForBreakpointValues(
        unifiedRight,
        `${ruleName}-right`,
    )}; ${cssPropsForBreakpointValues(
        unifiedBottom,
        `${ruleName}-bottom`,
    )}; ${cssPropsForBreakpointValues(unifiedLeft, `${ruleName}-left`)};`
}

export const getMargin = ({ m, mt, mr, ml, mb, mv, mh }) =>
    _responsiveLayout('margin', m, mt, mr, ml, mb, mv, mh)

export const getPadding = ({ p, pt, pr, pl, pb, pv, ph }) =>
    _responsiveLayout('padding', p, pt, pr, pl, pb, pv, ph)

const _borderInnerValue = (borderColor, borderWidth, borderStyle) => border => {
    if (border && typeof border === 'boolean') {
        return `${Box.BorderStyle[borderStyle]} ${borderWidth} ${
            Theme.Color[borderColor]
        }`
    } else if (border) {
        return border
    }
    return 'none'
}

const _border = (propType, borderColor, borderStyle, border, borderWidth) => {
    if (!border) {
        return ''
    }
    const transformationFn = _borderInnerValue(
        borderColor,
        borderWidth,
        borderStyle,
    )
    const borderValues = transformValues(border, transformationFn)
    return cssPropsForBreakpointValues(borderValues, propType)
}

export function getBorder({
    b,
    bt,
    br,
    bb,
    bl,
    borderColor,
    borderWidth,
    borderStyle,
}) {
    if (b) {
        return `${_border(
            'border',
            borderColor,
            borderStyle,
            convertLazy(b),
            borderWidth,
        )};`
    }

    return `
        ${_border(
            'border-top',
            borderColor,
            borderStyle,
            convertLazy(bt),
            borderWidth,
        )};
        ${_border(
            'border-right',
            borderColor,
            borderStyle,
            convertLazy(br),
            borderWidth,
        )};
        ${_border(
            'border-bottom',
            borderColor,
            borderStyle,
            convertLazy(bb),
            borderWidth,
        )};
        ${_border(
            'border-left',
            borderColor,
            borderStyle,
            convertLazy(bl),
            borderWidth,
        )};
    `
}
