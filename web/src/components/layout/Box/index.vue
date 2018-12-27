<script>
import {
    responsiveValidator,
    responsiveBooleanValidator,
    responsiveNumberValidator,
} from '@/utils/prop-validator'
import { color } from '@/components/color/constants'
import {
    alignContent,
    alignItems,
    alignSelf,
    borderStyles,
    cornerRadius,
    display,
    elements,
    flexDirection,
    flexWrap,
    justifyContent,
    overflow,
    position,
    textAlign,
    verticalAlign,
} from './constants'
import {
    Address,
    Article,
    Aside,
    Div,
    Footer,
    Header,
    Main,
    Nav,
    Section,
} from './styled-components'

export default {
    name: 'Box',
    functional: true,
    props: {
        /**
         * This aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
         * Accepts responsive values.
         */
        alignContent: {
            default: 'Stretch',
            type: [Object, String],
            validator: value => responsiveValidator(value, alignContent),
        },
        /**
         * This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justifyContent version for the cross-axis (perpendicular to the main-axis).
         * Accepts responsive values.
         */
        alignItems: {
            default: 'Stretch',
            type: [Object, String],
            validator: value => responsiveValidator(value, alignItems),
        },
        /**
         * This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
         * Accepts responsive values.
         */
        alignSelf: {
            type: [Object, String],
            validator: value => responsiveValidator(value, alignSelf),
        },
        /**
         * Applies border on all sides.
         */
        b: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Applies a bottom border.
         */
        bb: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Applies a left border.
         */
        bl: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Applies a right border.
         */
        br: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Applies a top border.
         */
        bt: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Applies background color.
         * Accepts responsive values.
         */
        backgroundColor: {
            type: [Object, String],
            validator: value => responsiveValidator(value, color),
        },
        /**
         * Defaults to `Gray4`.
         */
        borderColor: {
            default: 'Gray4',
            type: String,
            validator: value => value in color,
        },
        /**
         * Sets the border stroke width.
         */
        borderWidth: {
            default: '1px',
            type: String,
        },
        /**
         * Defaults to `Solid`.
         */
        borderStyle: {
            default: 'Solid',
            type: String,
            validator: value => value in borderStyles,
        },
        /**
         * Corner/border radius, using theme keywords
         * Accepts responsive values.
         */
        cornerRadius: {
            type: [Object, String],
            validator: value => responsiveValidator(value, cornerRadius),
        },
        /**
         * CSS [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
         * Accepts responsive values.
         */
        display: {
            default: 'Block',
            type: [Object, String],
            validator: value => responsiveValidator(value, display),
        },
        /**
         * The element rendered that contains `children`.
         */
        el: {
            default: 'Div',
            type: String,
            validator: value => value in elements,
        },
        /**
         * 	Sets the main axis and direction
         * Accepts responsive values.
         */
        flexDirection: {
            default: 'Row',
            type: [Object, String],
            validator: value => responsiveValidator(value, flexDirection),
        },
        /**
         * This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children. If one of the children has a value of 2, the remaining space would take up twice as much space as the others (or it will try to, at least).
         * Accepts responsive values.
         */
        flexGrow: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * This defines the ability for a flex item to shrink if necessary.
         * Accepts responsive values.
         */
        flexShrink: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property.
         * Accepts responsive values.
         */
        flexWrap: {
            default: 'Nowrap',
            type: [Object, String],
            validator: value => responsiveValidator(value, flexWrap),
        },
        /**
         * Sets `height: 100%`
         * Accepts responsive values.
         */
        fluidHeight: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * Sets `width: 100%`
         * Accepts responsive values.
         */
        fluidWidth: {
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * HTML id pass-through for ARIA purposes.
         */
        id: {
            type: String,
        },
        /**
         * This defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
         * Accepts responsive values.
         */
        justifyContent: {
            default: 'FlexStart',
            type: [Object, String],
            validator: value => responsiveValidator(value, justifyContent),
        },
        /**
         * Applies margin on all sides
         */
        m: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies bottom margin.
         */
        mb: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies horizontal margin.
         */
        mh: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies left margin.
         */
        ml: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies right margin.
         */
        mr: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies top margin.
         */
        mt: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies vertical margin.
         */
        mv: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * By default, flex items are laid out in the source order. However, the order property controls the order in which they appear in the flex container.
         * Accepts responsive values.
         */
        order: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * CSS [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).
         * Accepts responsive values.
         */
        overflow: {
            type: [Object, String],
            validator: value => responsiveValidator(value, overflow),
        },
        /**
         * Applies padding on all sides.
         */
        p: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies left padding.
         */
        pl: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies right padding.
         */
        pr: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies top padding.
         */
        pt: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies bottom padding.
         */
        pb: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies vertical padding.
         */
        pv: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Applies horizontal padding.
         */
        ph: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * CSS [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
         * Accepts responsive values.
         */
        position: {
            type: [Object, String],
            validator: value => responsiveValidator(value, position),
        },
        /**
         * Horizontal alignment of an inline or table-cell box. `<Tex>` should still be used to compose text.
         * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) for more info.
         * Accepts responsive values.
         */
        textAlign: {
            type: [Object, String],
            validator: value => responsiveValidator(value, textAlign),
        },
        /**
         * Vertical alignment of an inline or table-cell box.
         * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more info.
         * Accepts responsive values.
         */
        verticalAlign: {
            type: [Object, String],
            validator: value => responsiveValidator(value, verticalAlign),
        },
        /**
         * Callback function for Box click.
         * @event onClick
         * @type {any}
         */
        onClick: {
            type: Function,
        },
        /**
         * Callback function for Box mouseEnter.
         * @event onMouseEnter
         * @type {any}
         */
        onMouseEnter: {
            type: Function,
        },
        /**
         * Callback function for Box mouseLeave.
         * @event onMouseLeave
         * @type {any}
         */
        onMouseLeave: {
            type: Function,
        },
    },
    render: (h, { props, children }) => {
        let click
        if (props.onClick) {
            click = { click: props.onClick }
        }
        let mouseenter
        if (props.onMouseEnter) {
            mouseenter = { mouseenter: props.onMouseEnter }
        }
        let mouseleave
        if (props.onMouseLeave) {
            mouseleave = { mouseleave: props.onMouseLeave }
        }

        const p = {
            props,
            attrs: {
                id: props.id,
            },
            nativeOn: {
                ...click,
                ...mouseenter,
                ...mouseleave,
            },
        }

        switch (props.el) {
            case 'Address':
                return <Address {...p}>{children}</Address>
            case 'Article':
                return <Article {...p}>{children}</Article>
            case 'Aside':
                return <Aside {...p}>{children}</Aside>
            case 'Footer':
                return <Footer {...p}>{children}</Footer>
            case 'Header':
                return <Header {...p}>{children}</Header>
            case 'Main':
                return <Main {...p}>{children}</Main>
            case 'Nav':
                return <Nav {...p}>{children}</Nav>
            case 'Section':
                return <Section {...p}>{children}</Section>
            case 'Div':
            default:
                return <Div {...p}>{children}</Div>
        }
    },
}
</script>

<docs>
```
const logger = (message) => { console.log(message) }
<Box
    bt
    cornerRadius="Small"
    display="Flex"
    flexDirection="Column"
    :p="4"
>
    <Box
        :backgroundColor="{ xs: 'Yellow6', lg: 'Green1' }"
    >
        Merp
    </Box>
    <Box
        backgroundColor="Blue6"
    >
        Meep
    </Box>
</Box>
```
</docs>