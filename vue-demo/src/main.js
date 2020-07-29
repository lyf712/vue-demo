// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import store from "./store/index";
import './assets/css/icon.css';
import './components/directives';
Vue.use(ElementUI)
// Vue.use(echarts)
Vue.prototype.$echarts = echarts
var axios=require('axios')
Vue.prototype.$axios=axios

axios.defaults.baseURL = "http://127.0.0.1:8082/demo/api"


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
}).$mount('#app');
