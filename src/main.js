// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import router from './router'
import Layout from './Layout'
import IView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(IView)

Vue.prototype.$Message.config({
  top: 100,
  duration: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  template: '<Layout/>',
  components: { Layout }
})
