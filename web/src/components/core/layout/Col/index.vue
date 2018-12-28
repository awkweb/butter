<script>
import { BREAKPOINT_NAMES } from '@/components/utils/css'
import {
    columnValidator,
    responsiveValidator,
    responsiveNumberValidator,
} from '@/components/utils/prop-validator'
import Box from '@/components/core/layout/Box'
import Col from './constants'
import { StyledCol } from './styled-components'

/**
 * Use `<Col>` to organize content within a `<Row>`, with the option to modify that organization at various viewport breakpoints. The component uses global `flexboxgrid` classes and is modeled off of [Bootstrap’s CSS grid](http://getbootstrap.com/css/#grid).
 *
 * See [`<Grid>`](/#/Layout/Grid) for examples.
 */
export default {
    name: 'Col',
    functional: true,
    props: {
        /**
         * How to align the column
         */
        alignSelf: {
            type: String,
            validator: value => value in Col.AlignSelf,
        },
        /**
         * Whether or not to include padding on the bottom of the column
         */
        bottomPadding: {
            default: true,
            type: Boolean,
        },
        /**
         * Styles the columns with a background color and border for debugging.
         */
        debug: { type: Boolean },
        /**
         * Responsive way to show/hide columns
         */
        display: {
            default: 'Block',
            type: [Object, String],
            validator: value => responsiveValidator(value, Col.Display),
        },
        /**
         * Fills the outer contiainer height
         */
        fluidHeight: {
            default: false,
            type: Boolean,
        },
        /**
         * Moves columns to the right by adding left margin in increments of
         * column widths, according to relative breakpoints.
         */
        offset: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Move the column to display in a different spot
         */
        order: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * The number of columns to fill at breakpoint xs and above. Must be an
         * integer between 0 and 12.
         */
        xs: {
            type: Number,
            validator: value => columnValidator(value),
        },
        /**
         * The number of columns to fill at breakpoint sm and above. Must be an
         * integer between 0 and 12.
         */
        sm: {
            type: Number,
            validator: value => columnValidator(value),
        },
        /**
         * The number of columns to fill at breakpoint md and above. Must be an
         * integer between 0 and 12.
         */
        md: {
            type: Number,
            validator: value => columnValidator(value),
        },
        /**
         * The number of columns to fill at breakpoint lg and above. Must be an
         * integer between 0 and 12.
         */
        lg: {
            type: Number,
            validator: value => columnValidator(value),
        },
        /**
         * The number of columns to fill at breakpoint xl and above. Must be an
         * integer between 0 and 12.
         */
        xl: {
            type: Number,
            validator: value => columnValidator(value),
        },
    },
    render: (h, { props, children }) => {
        const {
            alignSelf,
            debug,
            display,
            fluidHeight,
            offset,
            order,
            bottomPadding,
        } = props

        const classnames = BREAKPOINT_NAMES.map(breakpoint => {
            let classes = ''
            if (props[breakpoint]) {
                classes += `col-${breakpoint}-${props[breakpoint]} `
            }

            if (offset && offset[breakpoint]) {
                classes += `col-${breakpoint}-offset-${offset[breakpoint]} `
            }

            return classes
        }).join(' ')

        return (
            <StyledCol
                alignSelf={alignSelf}
                class={classnames}
                debug={debug}
                display={display}
                order={order}
            >
                <Box fluidHeight={fluidHeight} pb={bottomPadding ? 2 : 0}>
                    {children}
                </Box>
            </StyledCol>
        )
    },
}
</script>


<docs>
```
<Col debug>Test</Col>
```
</docs>