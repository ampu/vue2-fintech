import Vue from 'vue'
import Vuetify from 'vuetify'

// @ts-ignore-next-line
import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import './style.scss'

Vue.use(Vuetify)

const app = new Vue({
  // @ts-ignore-next-line
  vuetify: new Vuetify(),
  render: h => h(App),
})

app.$mount(`#app`)
