import styled from 'vue-styled-components'
import { responsiveStyle, responsiveConditionalStyle } from '@/utils/css'
import { color } from '@/components/color/constants'
import {
    alignContent,
    alignItems,
    alignSelf,
    cornerRadius,
    display,
    flexDirection,
    flexWrap,
    justifyContent,
    overflow,
    position,
    textAlign,
} from './constants'
import { getBorder, getMargin, getPadding } from './utils'

const props = {
    alignContent: [Object, String],
    alignItems: [Object, String],
    alignSelf: [Object, String],
    b: [Object, Boolean],
    bb: [Object, Boolean],
    bl: [Object, Boolean],
    br: [Object, Boolean],
    bt: [Object, Boolean],
    backgroundColor: [Object, String],
    borderColor: String,
    borderWidth: String,
    borderStyle: String,
    cornerRadius: [Object, String],
    display: [Object, String],
    el: String,
    flexDirection: [Object, String],
    flexGrow: [Number, Object],
    flexShrink: [Number, Object],
    flexWrap: [Object, String],
    fluidHeight: [Object, Boolean],
    fluidWidth: [Object, Boolean],
    justifyContent: [Object, String],
    m: [Number, Object],
    mb: [Number, Object],
    mh: [Number, Object],
    ml: [Number, Object],
    mr: [Number, Object],
    mt: [Number, Object],
    mv: [Number, Object],
    order: [Number, Object],
    overflow: [Object, String],
    p: [Number, Object],
    pl: [Number, Object],
    pr: [Number, Object],
    pt: [Number, Object],
    pb: [Number, Object],
    pv: [Number, Object],
    ph: [Number, Object],
    position: [Object, String],
    textAlign: [Object, String],
}

const styles = props => {
    const s = []
    const isFlexbox = props.display === 'Flex' || props.display === 'InlineFlex'
    s.push(
        responsiveStyle(
            'alignContent',
            props.alignContent,
            v => alignContent[v],
            isFlexbox,
        ),
        responsiveStyle(
            'alignItems',
            props.alignItems,
            v => alignItems[v],
            isFlexbox,
        ),
        responsiveStyle('alignSelf', props.alignSelf, v => alignSelf[v]),
        responsiveStyle(
            'backgroundColor',
            props.backgroundColor,
            v => color[v],
        ),
        responsiveStyle(
            'borderRadius',
            props.cornerRadius,
            v => cornerRadius[v],
        ),
        responsiveStyle('display', props.display, v => display[v]),
        responsiveStyle(
            'flexDirection',
            props.flexDirection,
            v => flexDirection[v],
            isFlexbox,
        ),
        responsiveStyle('flexGrow', props.flexGrow),
        responsiveStyle('flexShrink', props.flexShrink),
        responsiveStyle(
            'flexWrap',
            props.flexWrap,
            v => flexWrap[v],
            isFlexbox,
        ),
        responsiveConditionalStyle(
            'height',
            props.fluidHeight,
            '100%',
            'initial',
        ),
        responsiveStyle(
            'justifyContent',
            props.justifyContent,
            v => justifyContent[v],
            isFlexbox,
        ),
        responsiveStyle('order', props.order),
        responsiveConditionalStyle(
            'width',
            props.fluidWidth,
            '100%',
            'initial',
        ),
        responsiveStyle('overflow', props.overflow, v => overflow[v]),
        responsiveStyle('position', props.position, v => position[v]),
        responsiveStyle('textAlign', props.textAlign, v => textAlign[v]),
        getBorder(props),
        getMargin(props),
        getPadding(props),
    )
    return s.join(';\n')
}

export const Address = styled('address', props)`
    ${styles};
`
export const Article = styled('article', props)`
    ${styles};
`
export const Aside = styled('aside', props)`
    ${styles};
`
export const Div = styled('div', props)`
    ${styles};
`
export const Footer = styled('footer', props)`
    ${styles};
`
export const Header = styled('header', props)`
    ${styles};
`
export const Main = styled('main', props)`
    ${styles};
`
export const Nav = styled('nav', props)`
    ${styles};
`
export const Section = styled('section', props)`
    ${styles};
`
