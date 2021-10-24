import Vue from 'vue'
import App from './App.vue'
import router from './router'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

NutUI.install(Vue);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
