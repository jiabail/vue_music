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

//封装中间件函数插件
const directiveObj = {
  install(Vue) {
    //创建一个全局自定义指令
  Vue.directive('getFocus', {
  inserted(el) {
    let theInput=el.querySelector('input')
    theInput.focus()
  }
  })
  }
}

Vue.use(directiveObj)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
