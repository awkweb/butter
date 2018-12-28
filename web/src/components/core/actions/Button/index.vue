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
         * Button link destination. When provided, an `<a>` is rendered in place of `<button>`.
         */
        href: {
            type: String,
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
         * Prevent button text from wrapping.
         */
        noWrap: {
            type: Boolean,
        },
        /**
         * Provide a `target` attribute if an `href` is provided.
         * See the `target` section of the [MDN <a> docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
         */
        target: {
            type: String,
            validator: value => value in Button.Target,
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
         * Defaults to `Normal`.
         */
        size: {
            default: 'Normal',
            type: String,
            validator: value => value in Button.TextSize,
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
            href,
            id,
            input,
            isLoading,
            noWrap,
            noBackground,
            onClick,
            size,
            target,
            type,
            value,
            name,
        } = props

        let click
        if (onClick) {
            click = { click: onClick }
        }
        let p = {
            props: {
                block,
                color,
                disabled: isLoading || disabled,
                fluid,
                isClickable: !!(onClick || href || type === 'submit'),
                noWrap,
                size,
            },
            attrs: {
                id,
                name,
            },
            nativeOn: {
                ...click,
            },
        }

        // // TODO: make LoadingSpinner.size a responsive prop.
        // // For now, just use our size at the xs breakpoint
        // // let sizeForLoadingSpinner = sizesByBreakpoint.xs
        // // if (['xxs', 'xs', 'sm', 'mdsm'].indexOf(sizeForLoadingSpinner) !== -1) {
        // //     sizeForLoadingSpinner = LoadingSpinner.Size.Small
        // // }
        const loadingContents = <LoadingSpinner color={color} />
        const content = (
            <ChildrenWrapper hide={isLoading}>{children}</ChildrenWrapper>
        )
        // Render an <a>
        if (href || target) {
            const anchorProps = {
                href: href || '#',
                role: 'button',
            }
            if (target) {
                anchorProps.target = target
            }

            p = {
                ...p,
                attrs: {
                    ...p.attrs,
                    ...anchorProps,
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
        // /**
        //  *  NOTE: preventDefault is being used on onMouseDown to prevent buttons
        //  *  focusing on a mouse click. This has not been tested with browsers
        //  *  other than Chrome (Mac) and may have unintended side effects.
        //  */
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