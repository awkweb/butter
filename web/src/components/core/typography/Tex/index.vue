<script>
import { responsiveValidator } from '@/components/utils/prop-validator'
import Theme from '@/components/theme'
import Tex from './constants'
import {
    Div,
    Span,
    P,
    Label,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
} from './styled-components'

/**
 * `<Text>` is a fully-featured text component.
 */
export default {
    name: 'Tex',
    functional: true,
    props: {
        /**
         * Sets text alignment.
         */
        align: {
            type: String,
            validator: value => value in Tex.Align,
        },
        /**
         * Applies text color.
         */
        color: {
            default: 'Gray1',
            type: String,
            validator: value => value in Theme.Color,
        },
        /**
         * The element rendered that contains `slot`.
         */
        el: {
            default: 'Div',
            type: String,
            validator: value => value in Tex.Element,
        },
        /**
         * Prevents text wrapping and truncates overflowing text with an ellipsis. Overrides `whiteSpace` prop.
         */
        ellipsis: {
            type: Boolean,
        },
        /**
         * Specify the font family to use.
         */
        font: {
            default: 'Lato, sans-serif',
            type: String,
        },
        /**
         * HTML id pass-through for ARIA purposes.
         */
        id: {
            type: String,
        },
        /**
         * Sets the line height of the text.
         */
        lineHeight: {
            type: Number,
        },
        /**
         * If rendered as a `<p>` or heading (`<h1>`, `<h2>`), remove default vertical margins.
         */
        noMargin: {
            type: Boolean,
        },
        /**
         * Text opacity. `0.0` to `1.0`
         */
        opacity: {
            type: Number,
            validator: value => value >= 0 && value <= 1,
        },
        /**
         * Specify whether a word can be broken if the line would otherwise be
         * wider than the container
         * See the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap).
         */
        overflowWrap: {
            type: String,
            validator: value => value in Tex.OverflowWrap,
        },
        /**
         * Sets the size of the text.
         * Accepts responsive values.
         */
        size: {
            default: 'Md',
            type: [Object, String],
            validator: value => responsiveValidator(value, Tex.Size),
        },
        /**
         * Text that appears on hover over the element.
         */
        title: {
            type: String,
        },
        /**
         * Tracking (letter spacing) options.
         */
        tracking: {
            type: String,
            validator: value => value in Tex.Tracking,
        },
        /**
         * Sets the transform of the text.
         * See the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)
         */
        transform: {
            type: String,
            validator: value => value in Tex.Transform,
        },
        /**
         * Sets the weight of the text.
         */
        weight: {
            default: 'Normal',
            type: String,
            validator: value => value in Tex.Weight,
        },
        /**
         * Determines how whitespace inside an element is handled.
         * See the [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
         */
        whiteSpace: {
            type: String,
            validator: value => value in Tex.WhiteSpace,
        },
        /**
         * CSS vertical-align. See [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) for valid values.
         */
        verticalAlign: {
            type: String,
            validator: value => value in Tex.VerticalAlign,
        },
    },
    render: (h, { props, children }) => {
        const { id, title } = props
        const p = {
            props,
            attrs: {
                id,
                title,
            },
        }
        switch (props.el) {
            case 'Span':
                return <Span {...p}>{children}</Span>
            case 'P':
                return <P {...p}>{children}</P>
            case 'Label':
                return <Label {...p}>{children}</Label>
            case 'H1':
                return <H1 {...p}>{children}</H1>
            case 'H2':
                return <H2 {...p}>{children}</H2>
            case 'H3':
                return <H3 {...p}>{children}</H3>
            case 'H4':
                return <H4 {...p}>{children}</H4>
            case 'H5':
                return <H5 {...p}>{children}</H5>
            case 'H6':
                return <H6 {...p}>{children}</H6>
            case 'Div':
            default:
                return <Div {...p}>{children}</Div>
        }
    },
}
</script>

<docs>
```
<Tex>
    The quick brown fox jumped over the lazy dogs.
</Tex>
```
</docs>
