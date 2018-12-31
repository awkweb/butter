import Vue from 'vue'
import styled from 'vue-styled-components'
import { style } from '@/components/utils/css'
import Theme from '@/components/theme'
import Tex from '@/components/core/typography/Tex/constants'

const styledLinkProps = {
    active: Boolean,
}

const RouterLink = Vue.component('RouterLink')
export const StyledLink = styled(RouterLink, styledLinkProps)`
    ${props => `
        ${style(
            'color',
            props.active ? Theme.Color.Gray1 : Theme.Color.Gray5,
            true,
            true,
        )};
        ${style('fontSize', Tex.Size.Xs)};
        display: inline-block;
        padding: 0 1rem;
        text-decoration: none;
            ${style('fontWeight', props.active ? 'bold' : 'normal')};
        transition: color 125ms;

        &:first-child {
            padding-left: 0;
        }
        
        &:hover {
            ${style('color', Theme.Color.Gray3, !props.active, true)};
        }
    `};
`

const styledUserProps = {
    active: Boolean,
}

export const StyledUserContainer = styled('div', styledUserProps)`
    ${props => `
        align-items: center;
        cursor: pointer;
        display: flex;
        height: 100%;

        svg {
            color: ${props.active ? Theme.Color.Gray4 : Theme.Color.Gray6};
            margin-left: 0.3rem;
            width: 0.85rem;
            transition: color 125ms;
        }

        &:hover {
            svg {
                color: ${Theme.Color.Gray4};
            }
        }
    `}
`

const styledDropdownProps = {
    open: Boolean,
}

export const StyledDropdown = styled('ul', styledDropdownProps)`
    ${props => `
        background-color: ${Theme.Color.White};
        border: 1px solid ${Theme.Color.Gray7};
        border-radius: ${Theme.CornerRadius.Small};
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25);
        list-style-type: none;
        margin: 0;
        ${style('opacity', props.open ? 1 : 0)};
        padding: 0;
        ${style('pointerEvents', props.open ? 'all' : 'none')};
        position: absolute;
        right: 0;
        ${style('top', props.open ? '3rem' : '2rem')};
        transition: all 0.2s cubic-bezier(0.7, 0, 0.175, 1) 0s;
        width: 16rem;
        z-index: 10;
    `};
`

export const StyledDropdownItem = styled.li`
    border-bottom: 1px solid ${Theme.Color.Gray7};

    &:hover {
        background-color: ${Theme.Color.Gray10};
    }

    &:first-child {
        border-top-right-radius: ${Theme.CornerRadius.Small};
        border-top-left-radius: ${Theme.CornerRadius.Small};
    }

    &:last-child {
        border-bottom: 0;
        border-bottom-right-radius: ${Theme.CornerRadius.Small};
        border-bottom-left-radius: ${Theme.CornerRadius.Small};
    }

    a {
        display: block;
        text-decoration: none;
    }

    button {
        background-color: transparent;
        border: 0;
    }

    a,
    button {
        cursor: pointer;
        outline: 0;
        padding: 1.125rem;
        text-align: left;
        width: 100%;
    }
`
