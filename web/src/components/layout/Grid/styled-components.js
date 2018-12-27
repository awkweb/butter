import styled from 'vue-styled-components'
import { BREAKPOINT_NAMES, getValue, style, responsiveStyle } from '@/utils/css'
import { reduce } from '@/utils/object'
import Color from '@/components/color/constants'
import Grid from './constants'
import { paddingAtBreakpoint } from './utils'

const outerProps = {
    backgroundColor: [Object, String],
    noOverflow: Boolean,
}

export const Outer = styled('div', outerProps)`
    ${props =>
        props.backgroundColor
            ? `background-color: ${Color[props.backgroundColor]};`
            : ''}
    ${props => (props.noOverflow ? 'overflow: hidden;' : '')}
    width: 100%;
`

const innerProps = {
    maxWidth: [Object, String],
    p: [Number, Object],
    ph: [Number, Object],
    pv: [Number, Object],
}

export const Inner = styled('div', innerProps)`
    box-sizing: border-box;
    margin: 0 auto;
    ${props =>
        responsiveStyle(
            'maxWidth',
            reduce(
                props.maxWidth,
                (memo, key) => {
                    const value = props.maxWidth[key]
                    memo[key] = getValue(Grid.MaxWidth[value])
                    return memo
                },
                {},
            ),
        )};
    width: 100%;
    ${({ p, ph, pv }) =>
        BREAKPOINT_NAMES.map(breakpoint => {
            const horizontalPadding =
                (p && p[breakpoint] ? p[breakpoint] : ph[breakpoint]) || 0
            const verticalPadding =
                (p ? p[breakpoint] : pv && pv[breakpoint]) || 0
            return paddingAtBreakpoint(
                breakpoint,
                horizontalPadding,
                verticalPadding,
            )
        })};
`
