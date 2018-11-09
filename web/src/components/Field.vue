<template>
    <fieldset class="field">
        <label
            :class="['field__label', {
                'active': value,
            }]"
            :for="id"
        >
            {{label}}
        </label>
        <input
            v-focus="autofocus"
            :id="id"
            :placeholder="label"
            :type="type"
            :value="value"
            @input="onInput($event.target.value)"
            class="field__input"
            spellcheck="false"
        >
        <template
            v-if="showSuccess"
        >
            <div
                v-show="isValid"
                class="field__success"
            >
                <InputSuccessIcon />
            </div>
        </template>
    </fieldset>
</template>

<script>
export default {
    name: 'Field',
    components: {
        InputSuccessIcon: () => import('../assets/icons/input-success.svg'),
    },
    props: {
        autofocus: {
            type: Boolean,
            default: false,
        },
        id: {
            required: true,
            type: String,
        },
        isValid: {
            type: Boolean,
        },
        label: {
            type: String,
        },
        showSuccess: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: String,
        },
    },
    methods: {
        onInput(value) {
            this.$emit('input', value)
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

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
        family: $font-sans-serif;
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
        family: $font-sans-serif;
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

.field__success {
    position: absolute;
    right: 1rem;
    top: 0.75rem;
}
</style>
