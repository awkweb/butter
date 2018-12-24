<template>
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/partials/variables';
@import '../../assets/styles/partials/functions';
@import '../../assets/styles/partials/mixins';

@keyframes loader {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0.1;
        transform: translateY(-1rem);
    }
}

.loader {
    @include flex-row;
    @include flex-center;
    height: 30vh;
    div {
        animation: {
            name: loader;
            direction: alternate;
            duration: 0.6s;
            iteration-count: infinite;
        }
        background: color(default, icon, primary);
        border-radius: 50%;
        height: 1rem;
        margin: {
            left: 0.2rem;
            right: 0.2rem;
        }
        width: 1rem;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
}
</style>

<docs>
## Examples

```jsx
<Loader />
```
</docs>
