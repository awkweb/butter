<script>
import { BREAKPOINT_NAMES, convertLazy } from '@/components/utils/css'
import {
    columnValidator,
    responsiveValidator,
    responsiveNumberValidator,
} from '@/components/utils/prop-validator'
import Theme from '@/components/theme'
import Grid from './constants'
import { Outer, Inner } from './styled-components'

/**
 * `<Grid>` should be the parent of any `<Row>`. By default, it spans 100% of the width, but can have a max width of sm, md, or lg. It also accepts an optional background color and padding values at viewport breakpoints.
 */
export default {
    name: 'Grid',
    functional: true,
    props: {
        /**
         * Applies background color.
         * Accepts responsive values.
         */
        backgroundColor: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Theme.Color),
        },
        /**
         * Maximum width of the grid, in units. `sm: 64`, `md: 96`, `lg: 144`
         */
        maxWidth: {
            type: [Object, String],
            validator: value => responsiveValidator(value, Grid.MaxWidth),
        },
        /**
         * Sets the overflow for the grid
         */
        noOverflow: {
            type: Boolean,
        },
        /**
         * Add padding in units to the grid at various breakpoints. Supercedes props `pv` and `ph`.
         * Accepts responsive values.
         */
        p: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Add horizontal padding in units to the grid at various breakpoints. Defaults to 2 units of padding at all sizes.
         * Accepts responsive values.
         */
        ph: {
            default: () => ({ xs: 2 }),
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
        /**
         * Add vertical padding in units to the grid at various breakpoints.
         * Accepts responsive values.
         */
        pv: {
            type: [Number, Object],
            validator: value => responsiveNumberValidator(value),
        },
    },
    render: (h, { props, children }) => {
        const { backgroundColor, maxWidth, noOverflow, p, ph, pv } = props
        const responsiveMaxWidth = convertLazy(maxWidth)
        const formattedPadding = convertLazy(p)
        const formattedPaddingHorizontal = convertLazy(ph)
        const formattedPaddingVertical = convertLazy(pv)
        return (
            <Outer backgroundColor={backgroundColor} noOverflow={noOverflow}>
                <Inner
                    maxWidth={responsiveMaxWidth}
                    p={formattedPadding}
                    ph={formattedPaddingHorizontal}
                    pv={formattedPaddingVertical}
                >
                    {children}
                </Inner>
            </Outer>
        )
    },
}
</script>

<docs>
```
<Grid
    backgroundColor="Gray8"
    maxWidth="Md"
>
    <Box
        :p="4"
        display="Block"
    >
        <Row>
            <Column
                :xs="12"
                :md="8"
                fluidHeight
            >
                <Box
                    :p="3"
                    backgroundColor="Gray10"
                    fluidHeight
                >
                    <Tex align="Center">
                        I’m 8 columns on desktop, 12 on mobile!
                    </Tex>
                </Box>
            </Column>
            <Column
                :xs="12"
                :md="4"
                fluidHeight
            >
                <Box
                    :p="3"
                    backgroundColor="Gray10"
                    fluidHeight
                >
                    <Tex align="Center">
                        I’m 4 columns on desktop, 12 on mobile!
                    </Tex>
                </Box>
            </Column>
        </Row>
    </Box>
</Grid>
```
</docs>