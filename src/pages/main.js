import Vue from 'vue'
import App from '@/components/Form'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.use(iView);

axios.defaults.baseURL = '/api'


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
