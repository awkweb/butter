import Vue from 'vue'
import styled from 'vue-styled-components'
import {
    getValues,
    style,
    responsiveConditionalStyle,
} from '@/components/utils/css'
import Theme from '@/components/theme'
import Button from './constants'
import {
    getActiveStyles,
    getBorderStyle,
    getFocusStyles,
    getHoverStyles,
    getTextColor,
} from './utils'

const childrenWrapperProps = {
    hide: Boolean,
}

export const ChildrenWrapper = styled('div', childrenWrapperProps)`
    ${props => style('visibility', props.hide ? 'hidden' : 'visible')};
`

const loadingSpinnerProps = {
    color: String,
    noBackground: Boolean,
}

export const LoadingSpinner = styled('div', loadingSpinnerProps)`
    ${props => `
        @keyframes loading {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        animation: loading .5s infinite linear;
        border: 0.1rem solid ${
            props.noBackground
                ? Button.Color[props.color]
                : getTextColor(props.color)
        };
        border-radius: 50%;
        border-right-color: transparent;
        border-top-color: transparent;
        content: "";
        display: block;
        height: 1rem;
        left: 50%;
        margin-left: -.5rem;
        margin-top: -.5rem;
        position: absolute;
        top: 50%;
        width: 1rem;
        z-index: 1;
    `}
`

const props = {
    block: Boolean,
    color: String,
    disabled: Boolean,
    fluid: [Boolean, Object],
    isClickable: Boolean,
    noBackground: Boolean,
    noWrap: Boolean,
    size: String,
    textAlign: String,
}

const styles = props => `
    backface-visibility: hidden;
    ${style(
        'backgroundColor',
        props.noBackground ? 'transparent' : Button.Color[props.color],
    )};
    ${style('borderRadius', Theme.CornerRadius.Small)};
    ${style('border', getBorderStyle(props.color))};
    box-sizing: border-box;
    ${style(
        'color',
        getTextColor(props.color, props.noBackground),
        true,
        true,
    )};
    ${style('cursor', props.isClickable ? 'pointer' : 'default')};
    ${style('display', props.block ? 'block' : 'inline-block')};
    ${style('fontFamily', Theme.Font.Lato)};
    ${style('fontSize', Button.Size[props.size])};
    ${style('fontWeight', Button.Weight.Default)};
    ${style('opacity', props.disabled ? '0.35' : 'unset')};
    ${style('padding', getValues(Button.Padding[props.size]))};
    position: relative;
    ${style('pointerEvents', props.disabled ? 'none' : 'unset')};
    ${style('textAlign', Button.TextAlign[props.textAlign])};
    text-decoration: none;
    ${style('transition', Button.Transition.Default)};
    user-select: none;
    ${style('whiteSpace', props.noWrap ? 'nowrap' : 'unset')};
    ${responsiveConditionalStyle('width', props.fluid, '100%', 'unset')};
    &:hover {
        ${
            !props.disabled && props.isClickable
                ? getHoverStyles(props.color, props.noBackground)
                : ''
        };
    }
    &:focus {
        ${getFocusStyles()}
    }
    &:active {
        ${
            !props.disabled
                ? getActiveStyles(props.color, props.noBackground)
                : ''
        };
    }
`

const RouterLink = Vue.component('RouterLink')
export const StyledAnchor = styled(RouterLink, props)`
    ${styles};
`
export const StyledButton = styled('button', props)`
    ${styles};
`
export const StyledDiv = styled('div', props)`
    ${styles};
`
export const StyledInput = styled('input', props)`
    ${styles};
`
