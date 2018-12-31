import styled from 'vue-styled-components'
import { style, responsiveStyle } from '@/components/utils/css'
import Theme from '@/components/theme'
import Tex from './constants'
import { getMargin } from './utils'

const props = {
    align: String,
    color: String,
    el: String,
    ellipsis: Boolean,
    font: String,
    lineHeight: Number,
    noMargin: Boolean,
    opacity: Number,
    overflowWrap: String,
    size: [Object, String],
    transform: String,
    tracking: String,
    weight: String,
    whiteSpace: String,
    verticalAlign: String,
}

const styles = props => {
    const s = []
    s.push(
        style('color', Theme.Color[props.color]),
        style('display', 'block', !!props.ellipsis),
        style('fontFamily', Theme.Font[props.font]),
        style('fontWeight', Tex.Weight[props.weight], true, true),
        style('letterSpacing', Tex.Tracking[props.tracking]),
        style('lineHeight', props.lineHeight),
        style('margin', props.noMargin ? '0' : getMargin(props.el)),
        style('opacity', props.opacity),
        style('overflow', 'hidden', !!props.ellipsis),
        style('overflowWrap', Tex.OverflowWrap[props.overflowWrap]),
        style('textAlign', Tex.Align[props.align]),
        style('textOverflow', 'ellipsis', !!props.ellipsis),
        style('textTransform', Tex.Transform[props.transform]),
        style(
            'whiteSpace',
            props.ellipsis ? 'nowrap' : Tex.WhiteSpace[props.whiteSpace],
        ),
        style('verticalAlign', Tex.VerticalAlign[props.verticalAlign]),
        responsiveStyle('fontSize', props.size, v => Tex.Size[v], true),
    )
    return `
      strong, b {
        font-weight: ${Tex.Weight.Bold};
      }
      a {
        color: ${Theme.Color[props.color]};
      }
      ${s.join(';\n')}
    `
}

export const Div = styled('div', props)`
    ${styles};
`
export const Span = styled('span', props)`
    ${styles};
`
export const P = styled('p', props)`
    ${styles};
`
export const Label = styled('label', props)`
    ${styles};
`
export const H1 = styled('h1', props)`
    ${styles};
`
export const H2 = styled('h2', props)`
    ${styles};
`
export const H3 = styled('h3', props)`
    ${styles};
`
export const H4 = styled('h4', props)`
    ${styles};
`
export const H5 = styled('h5', props)`
    ${styles};
`
export const H6 = styled('h6', props)`
    ${styles};
`
