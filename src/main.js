// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 一堆插件
import toasted from 'vue-toasted'
import vueProgressBar from 'vue-progressbar'
import modal from './plugins/modal.js'
import axios from './plugins/axios.js'
import util from './plugins/util.js'

Vue.use(toasted, {
  position: "top-center",
  duration: 2000,
  theme: 'outline'
})

Vue.use(vueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})
Vue.use(modal)
Vue.use(axios)
Vue.use(util)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
