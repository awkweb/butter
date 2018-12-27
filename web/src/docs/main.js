import Vue from 'vue'
import Vuelidate from 'vuelidate'

import '@/directives'
import * as filters from '@/filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

import initFlexboxgrid from '@/components/layout/flexboxgrid'
initFlexboxgrid()

Vue.use(Vuelidate)
