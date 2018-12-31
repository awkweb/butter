import styled from 'vue-styled-components'
import { style, responsiveStyle } from '@/components/utils/css'
import Theme from '@/components/theme'
import Column from './constants'

const props = {
    alignSelf: String,
    debug: Boolean,
    display: [Object, String],
    order: [Number, Object],
}

const styles = props => {
    const s = []
    s.push(
        style('alignSelf', Column.AlignSelf[props.alignSelf]),
        responsiveStyle('display', props.display, v => Column.Display[v]),
        responsiveStyle('order', props.order),
    )
    return `
        ${s.join(';\n')}
        ${props.debug &&
            `
                background-color: ${Theme.Color.Blue5};
                border: 1px solid ${Theme.Color.Blue4};
            `};
    `
}

export const StyledColumn = styled('div', props)`
    ${styles};
`
