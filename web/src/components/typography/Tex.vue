<script>
import { elements, sizes, weights } from '@/constants/tex'
import { codes } from '@/constants/color'

export default {
    name: 'Tex',
    props: {
        /**
         * Sets text alignment.
         */
        align: {
            type: String,
            validator: value =>
                ['left', 'center', 'right'].indexOf(value) !== -1,
        },
        /**
         * Applies text color.
         */
        color: {
            default: 'Gray1',
            type: String,
            validator: value => value in codes,
        },
        /**
         * The element rendered that contains `slot`.
         */
        el: {
            default: 'Div',
            type: String,
            validator: value => value in elements,
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
         * Sets the size of the text.
         */
        size: {
            default: 'Md',
            type: String,
            validator: value => value in sizes,
        },
        /**
         * Sets the weight of the text.
         */
        weight: {
            default: 400,
            type: Number,
            validator: value => weights.indexOf(value) !== -1,
        },
    },
    computed: {
        attrs() {
            return {
                id: this.id,
            }
        },
        style() {
            return {
                color: codes[this.color],
                fontFamily: this.font,
                fontSize: sizes[this.size],
                fontWeight: this.weight,
                lineHeight: this.lineHeight,
                margin: this.noMargin && 0,
                textAlign: this.align,
            }
        },
    },
    render(createElement) {
        const element = elements[this.el]
        return createElement(
            element,
            {
                attrs: this.attrs,
                style: this.style,
            },
            this.$slots.default,
        )
    },
}
</script>

<docs>
```
<Box>
    <Tex size="Md">The quick brown fox jumped over the lazy dogs.</Tex>
</Box>
```

#### Sizes

```
<Box>
    <Tex size="Xs">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Sm">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Md">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Lg">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxxl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxxxl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxxxxl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxxxxxl">The quick brown fox jumped over the lazy dogs.</Tex>
    <Tex size="Xxxxxxxl">The quick brown fox jumped over the lazy dogs.</Tex>
</Box>
```
</docs>
