<script>
import {
    responsiveValidator,
    responsiveBooleanValidator,
    responsiveNumberValidator,
} from '@/components/utils/prop-validator'
import Theme from '@/components/theme'
import Box from './constants'
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

/**
 * `<Box>` is a low-level layout component that provides a lot of functionality and flexibility. Using `<Box>`, you can add layout spacing (margin & padding), apply background and border styling, use flexbox layout properties, and apply custom CSS when needed.
 */
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
            validator: value => responsiveValidator(value, Box.AlignContent),
        },
        /**
         * This defines the default behaviour for how flex items are laid out along the cross axis on the current line. Think of it as the justifyContent version for the cross-axis (perpendicular to the main-axis).
         * Accepts responsive values.
         */
        alignItems: {
            default: 'Stretch',
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.AlignItems),
        },
        /**
         * This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
         * Accepts responsive values.
         */
        alignSelf: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.AlignSelf),
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
            validator: value => responsiveValidator(value, Theme.Color),
        },
        /**
         * Defaults to `Gray4`.
         */
        borderColor: {
            default: 'Gray4',
            type: String,
            validator: value => value in Theme.Color,
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
            validator: value => value in Box.BorderStyle,
        },
        /**
         * Corner/border radius, using theme keywords
         * Accepts responsive values.
         */
        cornerRadius: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Theme.CornerRadius),
        },
        /**
         * Custom css (via styled-components/css)
         */
        css: {
            type: String,
        },
        /**
         * CSS [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
         * Accepts responsive values.
         */
        display: {
            default: 'Block',
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.Display),
        },
        /**
         * The element rendered that contains `children`.
         */
        el: {
            default: 'Div',
            type: String,
            validator: value => value in Box.Element,
        },
        /**
         * 	Sets the main axis and direction
         * Accepts responsive values.
         */
        flexDirection: {
            default: 'Row',
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.FlexDirection),
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
            validator: value => responsiveValidator(value, Box.FlexWrap),
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
            validator: value => responsiveValidator(value, Box.JustifyContent),
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
            validator: value => responsiveValidator(value, Box.Overflow),
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
            validator: value => responsiveValidator(value, Box.Position),
        },
        /**
         * Horizontal alignment of an inline or table-cell box. `<Tex>` should still be used to compose text.
         * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) for more info.
         * Accepts responsive values.
         */
        textAlign: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.TextAlign),
        },
        /**
         * Vertical alignment of an inline or table-cell box.
         * See [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for more info.
         * Accepts responsive values.
         */
        verticalAlign: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Box.VerticalAlign),
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
        const { el, id, onClick, onMouseEnter, onMouseLeave } = props

        let click
        if (onClick) {
            click = { click: onClick }
        }
        let mouseenter
        if (onMouseEnter) {
            mouseenter = { mouseenter: onMouseEnter }
        }
        let mouseleave
        if (onMouseLeave) {
            mouseleave = { mouseleave: onMouseLeave }
        }

        const p = {
            props,
            attrs: {
                id,
            },
            nativeOn: {
                ...click,
                ...mouseenter,
                ...mouseleave,
            },
        }

        switch (el) {
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
    display="Flex"
    :flexDirection="{ xs: 'Column', lg: 'Row' }"
>
    <Box
        backgroundColor="Gold5"
        cornerRadius="Small"
        fluidWidth
        textAlign="Center"
        :mb="{ xs: 2, lg: 0 }"
        :mr="{ xs: 0, lg: 2 }"
        :p="3"
    >
        A
    </Box>
    <Box
        backgroundColor="Gray9"
        cornerRadius="Small"
        fluidWidth
        textAlign="Center"
        :mb="{ xs: 2, lg: 0 }"
        :mr="{ xs: 0, lg: 2 }"
        :p="3"
    >
        B
    </Box>
    <Box
        backgroundColor="Blue5"
        cornerRadius="Small"
        fluidWidth
        textAlign="Center"
        :p="3"
    >
        C
    </Box>
</Box>
```
</docs>