import styled from 'vue-styled-components'
import { style, responsiveStyle } from '@/utils/css'
import Color from '@/components/color/constants'
import Col from './constants'

const props = {
    alignSelf: String,
    debug: Boolean,
    display: [Object, String],
    order: [Number, Object],
}

const styles = props => {
    const s = []
    s.push(
        style('alignSelf', Col.AlignSelf[props.alignSelf]),
        responsiveStyle('display', props.display, v => Col.Display[v]),
        responsiveStyle('order', props.order),
    )
    return `
        ${s.join(';\n')}
        ${props.debug &&
            `
                background-color: ${Color.Blue10};
                border: 1px solid ${Color.Blue8};
            `};
    `
}

export const StyledCol = styled('div', props)`
    ${styles};
`
