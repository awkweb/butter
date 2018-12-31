<script>
import Box from '@/components/core/layout/Box'
import InputSuccessIcon from '@/assets/icons/input-success.svg'
import Theme from '@/components/theme'
import Field from './constants'
import {
    StyledFieldset,
    StyledLabel,
    StyledInput,
    StyledTextArea,
} from './styled-components'

export default {
    name: 'Field',
    functional: true,
    props: {
        /**
         * Sets autofocus.
         */
        autofocus: {
            default: false,
            type: Boolean,
        },
        /**
         * Sets icon and focused border color.
         */
        color: {
            default: 'Gold3',
            type: String,
            validator: value => value in Theme.Color,
        },
        /**
         * Sets error message.
         */
        error: {
            type: String,
        },
        /**
         * Sets HTML `for` and `id` attributes.
         */
        id: {
            required: true,
            type: String,
        },
        /**
         * Sets if the input is dirty.
         */
        isDirty: {
            type: Boolean,
        },
        /**
         * Sets if the input is valid.
         */
        isValid: {
            type: Boolean,
        },
        /**
         * Sets the label and placeholder.
         */
        label: {
            required: true,
            type: String,
        },
        /**
         * If valid, shows success icon.
         */
        showSuccess: {
            default: false,
            type: Boolean,
        },
        /**
         * Sets type.
         */
        type: {
            default: 'Text',
            type: String,
            validator: value => value in Field.Type,
        },
        /**
         * Sets value.
         * @model
         */
        value: {
            type: [Number, String],
        },
    },
    render(h, { props, listeners }) {
        const {
            id,
            autofocus,
            color,
            error,
            isDirty,
            isValid,
            label,
            showSuccess,
            type,
            value,
        } = props
        const { input } = listeners

        const active = !!value || (isDirty && error)
        const inputProps = {
            props: {
                active,
                color,
                error: isDirty && error,
            },
            attrs: {
                autofocus,
                id,
                type,
                placeholder: label,
                spellcheck: false,
            },
            domProps: {
                value,
            },
            on: {
                input(value) {
                    input(value)
                },
            },
        }

        if (Field.Type[type] === 'textarea') {
            const p = {
                ...inputProps,
                attrs: {
                    ...inputProps.attrs,
                    rows: 5,
                },
            }
            return (
                <StyledFieldset>
                    <StyledTextArea {...p} />
                </StyledFieldset>
            )
        }

        const labelProps = {
            props: {
                active,
                error: isDirty && error,
            },
            attrs: {
                for: id,
            },
        }

        return (
            <StyledFieldset>
                <StyledLabel {...labelProps}>{error || label}</StyledLabel>
                <StyledInput {...inputProps} />
                {showSuccess && isValid && (
                    <Box
                        position="Absolute"
                        css={`
                            right: 0.6rem;
                            top: 0.8rem;
                            fill: ${Theme.Color.Green3};
                        `}
                    >
                        <InputSuccessIcon />
                    </Box>
                )}
            </StyledFieldset>
        )
    },
}
</script>

<docs>
```jsx
<Field
    v-model="email"
    id="email"
    label="Email"
/>
```
</docs>