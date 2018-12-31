import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/directives'
import * as filters from '@/filters'
import initStyles from '@/styles'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(Vuelidate)
Vue.config.productionTip = false

initStyles()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
