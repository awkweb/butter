<script>
import Theme from '@/components/theme'
import CTex from '@/components/core/typography/Tex/constants'
import Tex from '@/components/core/typography/Tex'
import Ref from './constants'
import { StyledAnchor } from './styled-components'

/**
 * The `<Ref>` component wraps [`<router-link>`](https://router.vuejs.org/api/#router-link).
 */
export default {
    name: 'Ref',
    functional: true,
    props: {
        /**
         * Sets `color`.
         */
        color: {
            default: 'Blue2',
            type: String,
            validator: value => value in Theme.Color,
        },
        /**
         * Disables the link.
         */
        disabled: {
            type: Boolean,
        },
        /**
         * Sets `text-decoration`.
         */
        decoration: {
            default: 'None',
            type: String,
            validator: value => value in Ref.TextDecoration,
        },
        /**
         * `router-link`'s `to` prop.
         */
        to: {
            type: Object,
        },
        /**
         * Sets size.
         */
        size: {
            default: 'Md',
            type: String,
            validator: value => value in CTex.Size,
        },
        /**
         * Sets weight.
         */
        weight: {
            default: 'Normal',
            type: String,
            validator: value => value in CTex.Weight,
        },
    },
    render: (h, { props, children }) => {
        const { color, decoration, disabled, size, weight } = props
        const p = {
            decoration,
            disabled,
            props,
        }
        return (
            <StyledAnchor {...p}>
                <Tex color={color} el="Span" size={size} weight={weight}>
                    {children}
                </Tex>
            </StyledAnchor>
        )
    },
}
</script>

<docs>
Only works inside Vue app.
</docs>