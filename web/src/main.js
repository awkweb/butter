import Vue from 'vue'
import Vuelidate from 'vuelidate'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/directives'

import * as filters from '@/filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

import initFlexboxgrid from '@/components/layout/flexboxgrid'
initFlexboxgrid()

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
