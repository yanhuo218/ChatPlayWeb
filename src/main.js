import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios

new Vue({
    router,
    store,
    silent: true,
    render: h => h(App)
}).$mount('#app')
