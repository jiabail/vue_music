import Vue from 'vue'
import App from './App.vue'
//淘宝配置移动端适配，配合rem
import './assets/js/flexible'
//清除浏览器默认样式
import './styles/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
