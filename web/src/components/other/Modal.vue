<template>
  <div
      @keyup.esc="onCloseModal"
      class="modal"
  >
      <div
          v-click-outside="onCloseModal"
          class="modal__box"
      >
          <header class="modal__header">
              <div class="modal__title">{{title}}</div>
              <button
                  class="modal__close"
                  @click="onCloseModal"
              >
                  <XIcon/>
              </button>
          </header>
          <div class="modal__body">
              <slot/>
          </div>
      </div>
  </div>
</template>

<script>
import XIcon from '@/assets/icons/x.svg'

export default {
    name: 'Modal',
    components: {
        XIcon,
    },
    props: {
        title: {
            type: String,
        },
    },
    methods: {
        onCloseModal() {
            this.$emit('handleOnCloseModal')
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

.modal {
    background-color: color(default, background, modal);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: $z-index-modal;
}

.modal__box {
    @include respond-to(md) {
        border-radius: $border-radius;
        margin: {
            left: auto;
            right: auto;
            top: 5rem;
        }
        min-height: auto;
        max-width: 25rem;
        max-height: none;
    }
    background-color: color(default, background);
    min-height: 100vh;
    max-height: 100vh;
}

.modal__header {
    @include flex-row;
    align-items: center;
    background-color: #efeeea;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;
    height: 3.3rem;
    justify-content: center;
    padding: 1rem;
    position: relative;
}

.modal__title {
    font: {
        size: 0.9rem;
        weight: 600;
    }
    margin-top: 0.25rem;
}

.modal__close {
    @include button;
    background-color: transparent;
    border: 0;
    position: absolute;
    padding: 0;
    right: 1rem;

    svg {
        color: #6b655f;
        height: 1rem;
        margin-top: 0.25rem;
        width: 1rem;
    }
}
</style>
