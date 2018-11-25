<template>
    <fieldset
        :class="['dropdown', {
            'error': isTouched && error,
        }]"
    >
        <label
            :class="['dropdown__label', {
                'active': value || (isTouched && error),
                'error': isTouched && error,
            }]"
            :for="id"
        >
            <template v-if="isTouched && error">{{error}}</template>
            <template v-else>{{label}}</template>
        </label>
        <Multiselect
            :allow-empty="false"
            :options="options"
            :custom-label="customLabel"
            :placeholder="label"
            :searchable="searchable"
            :value="value"
            deselect-label="Selected"
            label="name"
            track-by="name"
            @select="onSelect"
            @close="onTouch"
        />
    </fieldset>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'Dropdown',
    components: {
        Multiselect,
    },
    props: {
        autofocus: {
            default: false,
            type: Boolean,
        },
        error: {
            type: String,
        },
        id: {
            required: true,
            type: String,
        },
        label: {
            type: String,
        },
        options: {
            required: true,
            type: Array,
        },
        placeholder: {
            type: String,
        },
        searchable: {
            default: true,
            type: Boolean,
        },
        type: {
            type: String,
            default: 'text',
        },
        value: {
            type: Object,
        },
    },
    data: () => ({
        isTouched: false,
    }),
    methods: {
        customLabel({ name }) {
            return name
        },
        onSelect(value) {
            this.$emit('input', value)
        },
        onTouch() {
            this.isTouched = true
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.dropdown {
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

    &.error {
        .multiselect__tags {
            border-color: color(default, border, error);
        }
        .multiselect__select:before {
            border-color: color(default, border, error) transparent transparent;
        }
    }
}

.dropdown__label {
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
    z-index: 2;

    &.active {
        opacity: 1;
        pointer-events: all;
        top: -0.4rem;
    }

    &.error {
        color: color(default, font, error);
    }
}

.multiselect__select {
    height: 100%;
}

.multiselect__tags {
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

    &:focus {
        border-color: color(default, border, active);
    }

    &.error {
        border-color: color(default, border, error);
        color: color(default, font, error);
    }
}

.multiselect__placeholder {
    color: color(default, font, placeholder);
    margin-bottom: 0;
    padding-top: 0.56rem;
    z-index: 5;
}

.multiselect--active .multiselect__placeholder {
    display: block;
}

.multiselect__input,
.multiselect__single {
    color: color(default, font);
    font: {
        family: $font-sans-serif;
        size: 0.9rem;
    }
    margin-bottom: 0;
    padding: {
        left: 0;
        top: 0.56rem;
    }
}

.multiselect__input {
    &::-webkit-input-placeholder {
        color: transparent;
    }
}

.multiselect__content-wrapper {
    border: {
        color: color(default, border);
        style: solid;
        width: 1px;
    }
    border-top: 0;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
}

.multiselect__option {
    padding: {
        bottom: 0.8rem;
        left: 1rem;
        right: 1rem;
        top: 0.8rem;
    }
    &:after {
        line-height: 2.5rem;
        bottom: 0;
    }
}

.multiselect__option--selected.multiselect__option--highlight {
    background: #41b883;
    color: #fff;
    &:after {
        background: #41b883;
        color: #fff;
    }
}
</style>
