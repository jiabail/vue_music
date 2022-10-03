import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入全局样式
import './styles/index.less'

//浏览器适配
import 'amfe-flexible'
//vant按需引入
import '@/vant/index'
//加载dayjs初始化配置
import './utils/dayjs'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
