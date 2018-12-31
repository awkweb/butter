<script>
import { convertLazy } from '@/components/utils/css'
import {
    responsiveValidator,
    responsiveBooleanValidator,
} from '@/components/utils/prop-validator'
import Button from './constants'
import {
    ChildrenWrapper,
    LoadingSpinner,
    StyledAnchor,
    StyledButton,
    StyledDiv,
    StyledInput,
} from './styled-components'

/**
 * The `<Button>` component creates a prominent affordance for users to perform an action, such as triggering an API request, navigating to another page, or downloading a file.
 */
export default {
    name: 'Button',
    functional: true,
    props: {
        /**
         * When true, `display: block;`. When false, `display: inline-block;`.
         */
        block: {
            default: false,
            type: Boolean,
        },
        /**
         * Defaults to `Secondary`.
         */
        color: {
            default: 'Secondary',
            type: String,
            validator: value => value in Button.Color,
        },
        /**
         * Applies disabled styling to the button.
         */
        disabled: {
            default: false,
            type: Boolean,
        },
        /**
         * Render as a `<div>`
         */
        div: {
            type: Boolean,
        },
        /**
         * Render the button w/ 100% width.
         */
        fluid: {
            default: false,
            type: [Boolean, Object],
            validator: value => responsiveBooleanValidator(value),
        },
        /**
         * HTML id property.
         */
        id: {
            type: String,
        },
        /**
         * Render as an `<input>`.
         */
        input: {
            type: Boolean,
        },
        /**
         * HTML name property. See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/name).
         */
        name: {
            type: String,
        },
        /**
         * Remove background color.
         */
        noBackground: {
            default: false,
            type: Boolean,
        },
        /**
         * Prevent button text from wrapping.
         */
        noWrap: {
            default: false,
            type: Boolean,
        },
        /**
         * Sets text alignment.
         */
        textAlign: {
            default: 'Center',
            type: String,
            validator: value => value in Button.TextAlign,
        },
        /**
         * Button link destination. When provided, an `<a>` is rendered in place of `<button>`.
         */
        to: {
            type: Object,
        },
        /**
         * HTML `type` attribute. See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
         */
        type: {
            default: 'Button',
            type: String,
            validator: value => value in Button.Type,
        },
        /**
         * In conjunction with the `input` prop, sets the button text.
         */
        value: {
            type: String,
        },
        /**
         * Renders loading spinner in place of the button label.
         */
        isLoading: {
            default: false,
            type: Boolean,
        },
        /**
         * Defaults to `Md`.
         */
        size: {
            default: 'Md',
            type: String,
            validator: value => value in Button.Size,
        },
        /**
         * Callback function for button click.
         * @event onClick
         * @type {any}
         */
        onClick: {
            type: Function,
        },
    },
    render: (h, { props, children }) => {
        const {
            block,
            color,
            disabled,
            div,
            fluid,
            id,
            input,
            isLoading,
            noBackground,
            noWrap,
            onClick,
            size,
            textAlign,
            to,
            type,
            value,
            name,
        } = props

        let click
        if (onClick) {
            click = {
                click: e => {
                    e.preventDefault()
                    if (disabled) return
                    onClick()
                },
            }
        }
        let p = {
            props: {
                block,
                color,
                disabled: isLoading || disabled,
                fluid,
                isClickable: !!(onClick || to || type === 'submit'),
                noBackground,
                noWrap,
                size,
                textAlign,
            },
            attrs: {
                id,
                name,
            },
            nativeOn: {
                ...click,
            },
        }

        const loadingContents = (
            <LoadingSpinner color={color} noBackground={noBackground} />
        )
        const content = (
            <ChildrenWrapper hide={isLoading}>{children}</ChildrenWrapper>
        )
        // Render an <a>
        if (to) {
            p = {
                ...p,
                props: {
                    ...p.props,
                    to,
                },
                attrs: {
                    ...p.attrs,
                },
            }

            return (
                <StyledAnchor {...p}>
                    {isLoading ? loadingContents : null}
                    {content}
                </StyledAnchor>
            )
        }

        const preventDefault = e => e.preventDefault
        p = {
            ...p,
            nativeOn: {
                ...p.nativeOn,
                onmousedown: preventDefault,
            },
        }
        // Render an <input>
        if (input) {
            p = {
                ...p,
                attrs: {
                    ...p.attrs,
                    type,
                    value,
                },
            }
            return <StyledInput {...p} />
        }
        // // Render a div
        if (div) {
            p = {
                ...p,
                attrs: {
                    ...p.attrs,
                    type,
                    value,
                },
            }
            return (
                <StyledDiv {...p}>
                    {isLoading ? loadingContents : null}
                    {content}
                </StyledDiv>
            )
        }
        return (
            <StyledButton {...p}>
                {isLoading ? loadingContents : null}
                {content}
            </StyledButton>
        )
    },
}
</script>

<docs>
```
const loading = false
const logger = () => { }
<Box>
    <Button color="Brand" :isLoading="loading" :onClick="logger">Brand Button</Button>
    <Button color="Primary" :isLoading="loading" :onClick="logger">Primary Button</Button>
    <Button color="Secondary" :isLoading="loading" :onClick="logger">Secondary Button</Button>
    <Button color="Success" :isLoading="loading" :onClick="logger">Success Button</Button>
    <Button color="Error" :isLoading="loading" :onClick="logger">Error Button</Button>
    <Button color="Dark" :isLoading="loading" :onClick="logger">Dark Button</Button>
</Box>
```
</docs>