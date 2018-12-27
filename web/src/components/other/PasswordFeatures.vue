<template>
    <div class="password-features">
        <ul class="password-features__list">
            <li
                :class="['password-features__item', {
                success: hasLowercaseLetter
            }]"
            >One lowercase letter</li>
            <li
                :class="['password-features__item', {
                success: hasUppercaseLetter
            }]"
            >One uppercase letter</li>
        </ul>
        <ul class="password-features__list">
            <li
                :class="['password-features__item', {
                success: hasNumber
            }]"
            >One number</li>
            <li
                :class="['password-features__item', {
                success: isMinLength
            }]"
            >8 characters minimum</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'PasswordFeatures',
    props: {
        hasLowercaseLetter: {
            required: true,
            type: Boolean,
        },
        hasUppercaseLetter: {
            required: true,
            type: Boolean,
        },
        hasNumber: {
            required: true,
            type: Boolean,
        },
        isMinLength: {
            required: true,
            type: Boolean,
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.password-features {
    @include flex-column;
    @include respond-to(sm) {
        @include flex-row;
    }
    margin: {
        bottom: 1rem;
        top: -0.25rem;
    }
}

.password-features__list {
    list-style-type: none;
    margin: {
        bottom: 0;
        right: 2.5rem;
        top: 0;
    }
    padding-left: 0;
}

.password-features__item {
    @include flex-row;
    align-items: center;
    font: {
        family: $font-sans;
        size: 0.75rem;
    }
    margin-bottom: 0.25rem;
    transition: {
        duration: $transition-duration;
        property: opacity;
    }

    &:before {
        background-color: color(default, background, primary);
        border-radius: 8px;
        content: '';
        display: inline-block;
        height: 8px;
        margin-right: 0.5rem;
        min-height: 8px;
        min-width: 8px;
        width: 8px;
    }

    &.success {
        opacity: 0.35;
    }
}
</style>
