// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './lib/store'
import './lib/prototype'
import './assets/css/base.css'
import iView from 'iview'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vuescroll)

Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    scrollingX: false
  },
  rail: {
    size: '3px'
  }
}

iView.LoadingBar.config({
  color: '#009ad6',
  failedColor: '#f0ad4e',
  height: 2
})

iView.LoadingBar.finish()

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  style: ''
})
