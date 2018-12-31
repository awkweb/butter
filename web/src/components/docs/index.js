import Vue from 'vue'
import Vuelidate from 'vuelidate'
import '@/directives'
import * as filters from '@/filters'
import initStyles from '@/styles'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(Vuelidate)

initStyles()

Vue.mixin({
    data() {
        return { email: '' }
    },
})
