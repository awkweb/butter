<template>
    <fieldset class="field">
        <template v-if="type === 'textarea'">
            <textarea
                v-focus="autofocus"
                :id="id"
                :class="['field__input', {
                    'error': isTouched && error,
                }]"
                :placeholder="label"
                :type="type"
                :value="value"
                rows="5"
                spellcheck="false"
                @blur="isTouched = true"
                @input="onInput($event.target.value)"
            ></textarea>
        </template>
        <template v-else>
            <label
                :class="['field__label', {
                    'active': value || (isTouched && error),
                    'error': isTouched && error,
                }]"
                :for="id"
            >
                <template v-if="isTouched && error">{{error}}</template>
                <template v-else>{{label}}</template>
            </label>
            <input
                v-focus="autofocus"
                :id="id"
                :class="['field__input', {
                    'error': isTouched && error,
                }]"
                :placeholder="label"
                :type="type"
                :value="value"
                spellcheck="false"
                @blur="isTouched = true"
                @input="onInput($event.target.value)"
            >
            <template v-if="showSuccess">
                <div v-show="isValid" class="field__success">
                    <InputSuccessIcon/>
                </div>
            </template>
        </template>
    </fieldset>
</template>

<script>
export default {
    name: 'Field',
    components: {
        InputSuccessIcon: () => import('../../assets/icons/input-success.svg'),
    },
    props: {
        /**
         * Sets the label `for` and input `id`
         */
        id: {
            required: true,
            type: String,
        },
        /**
         * Whether or not to autofocus input
         */
        autofocus: {
            default: false,
            type: Boolean,
        },
        /**
         * Sets the error message
         */
        error: {
            type: String,
        },
        /**
         * Sets if the input is valid
         */
        isValid: {
            type: Boolean,
        },
        /**
         * Sets the input label shown to user
         */
        label: {
            required: true,
            type: String,
        },
        /**
         * Whether or not to show success icon
         */
        showSuccess: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of input
         */
        type: {
            type: String,
            default: 'text',
        },
        /**
         * @model
         */
        value: {
            required: true,
            type: [Number, String],
        },
        /**
         * Updates value
         */
        onInput: {
            default(value) {
                this.$emit('input', value)
            },
            type: Function,
        },
    },
    data: () => ({
        isTouched: false,
    }),
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.field {
    @include flex-column;
    border: 0;
    margin: {
        bottom: 1rem;
        left: 0;
        right: 0;
        top: 0;
    }
    padding: 0;
    position: relative;

    &.checkbox {
        @include flex-row;
        margin-top: 0.25rem;
    }
}

.field__label {
    color: color(default, font, label);
    background-color: color(default, background);
    font: {
        family: $font-sans;
        size: 0.7rem;
    }
    padding: {
        left: 0.45rem;
        right: 0.45rem;
    }
    opacity: 0;
    pointer-events: none;
    position: absolute;
    left: 0.6rem;
    top: 0;
    transition: {
        duration: $transition-duration / 2;
        property: color, opacity, top;
    }

    &.active {
        opacity: 1;
        pointer-events: all;
        top: -0.4rem;
    }

    &.error {
        color: color(default, font, error);
    }
}

.field__input {
    border: {
        color: color(default, border);
        radius: $border-radius;
        style: solid;
        width: 1px;
    }
    color: color(default, font);
    font: {
        family: $font-sans;
        size: 0.9rem;
    }
    height: 2.5rem;
    outline: 0;
    padding: {
        bottom: 0;
        left: 1rem;
        right: 0;
        top: 0.15rem;
    }
    transition: {
        duration: $transition-duration;
        property: border-color, box-shadow;
    }
    width: 100%;

    &::-webkit-input-placeholder {
        color: color(default, font, placeholder);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        border-color: color(default, border, active);
    }

    &.error {
        border-color: color(default, border, error);
        color: color(default, font, error);
    }
}

textarea.field__input {
    padding: {
        bottom: 0.15rem;
        top: 0.7rem;
    }
    resize: none;
    width: 100% !important;

    &[rows] {
        height: auto;
    }
}

.field__success {
    position: absolute;
    right: 1rem;
    top: 0.75rem;
}
</style>

<docs>
## Examples

```jsx
<Field
    v-model="fieldEmail"
    id="email"
    label="Email"
/>
```
</docs>
