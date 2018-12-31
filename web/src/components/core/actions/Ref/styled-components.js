import Vue from 'vue'
import styled from 'vue-styled-components'
import { style } from '@/components/utils/css'
import Ref from './constants'

const props = {
    decoration: String,
    disabled: Boolean,
}

const styles = props => `
    ${style('textDecoration', Ref.TextDecoration[props.decoration])};
    ${style('opacity', '0.35', props.disabled)};
    ${style('pointerEvents', 'none', props.disabled)};
    ${style('userSelect', 'none', props.disabled)};
`

const RouterLink = Vue.component('RouterLink')
export const StyledAnchor = styled(RouterLink, props)`
    ${styles};
`
