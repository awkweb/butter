<template>
  <div class="datepicker">
      <div class="datepicker-trigger">
          <slot></slot>
          <AirbnbStyleDatepicker
              :dateOne="dateOne"
              :dateTwo="dateTwo"
              :endDate="endDate"
              :mode="mode"
              :monthsToShow="monthsToShow"
              :showShortcutsMenuTrigger="false"
              fullscreen-mobile
              trigger-element-id="datepicker-trigger"
              @apply="onClickApply"
              @cancelled="onClickClear"
              @closed="onClosed"
              @date-one-selected="onDateOneSelected"
              @date-two-selected="onDateTwoSelected"
          />
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { format } from 'date-fns'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'

const datepickerOptions = {
    colors: {
        selected: '#00a699',
        inRange: '#66e2da',
        selectedText: '#fff',
        text: '#565a5c',
        inRangeBorder: '#33dacd',
        disabled: '#fff',
    },
}
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

export default {
    name: 'DatePicker',
    props: {
        initialDateOne: {
            required: true,
            type: String,
        },
        initialDateTwo: {
            required: false,
            type: String,
        },
        mode: {
            default: 'range',
            type: String,
        },
        monthsToShow: {
            default: 2,
            type: Number,
        },
        triggerElementId: {
            default: 'datepicker-trigger',
            type: String,
        },
    },
    data() {
        return {
            dateOne: this.initialDateOne,
            dateTwo: this.initialDateTwo,
            endDate: format(new Date(), 'YYYY-MM-DD'),
        }
    },
    methods: {
        onClickApply() {
            const data = {
                nextDateOne: this.dateOne,
                nextDateTwo: this.dateTwo,
            }
            this.$emit('handleOnClickApply', data)
        },
        onClickClear() {
            this.dateOne = ''
            this.dateTwo = ''
        },
        onClosed() {
            this.$nextTick(() => {
                this.dateOne = this.initialDateOne
                this.dateTwo = this.initialDateTwo
            })
        },
        onDateOneSelected(value) {
            this.dateOne = value
            if (this.mode === 'single') {
                this.$emit('handleOnSelectDate', this.dateOne)
            }
        },
        onDateTwoSelected(value) {
            this.dateTwo = value
        },
    },
}
</script>

<style src="vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css">
</style>

<style lang="scss">
@import '../assets/styles/variables';
@import '../assets/styles/functions';
@import '../assets/styles/mixins';

/*
.asd__wrapper {
    color: color(default, font);
    border: {
        color: color(default, border, dropdown);
        radius: $border-radius;
    }
    box-shadow: rgba(0, 0, 0, 0.15) 0 14px 36px 2px;
    padding: {
        bottom: 1.5rem;
        left: 2rem;
        right: 2rem;
        top: 2rem;
    }
    top: 50px !important;
    width: 672px !important;
    z-index: 9 !important;
}

.asd__change-month-button button {
    @include flex-row;
    border-radius: $border-radius;
    height: 1.83rem;
    outline: 0;
}

.asd__days-legend {
    &:first-child {
        left: 1rem;
    }
    &:last-child {
        left: 318px;
    }
}

.asd__day-title {
    font-size: 0.75rem;
    margin-left: -1.5px;
}

.asd__month-name {
    font-size: 1rem;
    margin: {
        bottom: 2rem;
        top: 0.15rem;
    }
}

.asd__month {
    max-height: 327px;
    transition: {
        duration: 0.3s;
        property: all;
        timing-function: ease;
    }
}

.asd__month.hidden {
    max-height: 0;
    opacity: 0;
    pointer-events: none;
}

.asd__day--enabled:focus {
    outline: 0;
}

.asd__action-buttons {
    display: flex;
    justify-content: space-between;
    min-height: auto;
    padding-top: 0;
    margin: {
        bottom: 0;
        top: 1rem;
    }

    button {
        outline: 0;
    }

    button:first-child {
        float: none;
        left: 8px;
    }

    button:nth-child(2) {
        float: none;
        right: 8px;
    }
}
*/
</style>
