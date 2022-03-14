import Vue from 'vue'
import App from '@/components/User'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import VueRouter from "vue-router";

let menu=()=>import('@/components/UserMenu.vue');
import axios from 'axios';
Vue.prototype.$axios = axios;


let token = "";
// axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.baseURL = '/api'

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token')
    if (token)
        config.headers.common['token'] = token;
    return config;
}, function (error) {
    console.log("error: ", error);
    Message.error('网络连接异常，请稍后再试！');
    return Promise.reject(error);
});



Vue.use(VueRouter);
Vue.use(iView);

var router = new VueRouter({
  routes: [
      {
          name: "info",
          path: "/",
          components: {
              menu: menu,
              content: () => import("@/components/contents/info.vue")
          },
      },
      {
        name: "schedul",
        path: "/class",
        components: {
            menu: menu,
            content: () => import("@/components/contents/schedul.vue")
        },
      },
      {
        name: "score",
        path: "/score",
        components: {
            menu: menu,
            content: () => import("@/components/contents/score.vue")
        },
    },

      ]
})
  

router.beforeEach((to, from, next) => {
    next()
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
