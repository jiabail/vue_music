/**
 * 请求模块
 */
 import theAxios from 'axios';
 import store from '@/store/index'
  
 //创建axios实例，并在其中进行配置
 const axios = theAxios.create({
   //接口的基准路径
   baseURL: ' http://toutiao.itheima.net',
   timeout:20000  //20秒超时时间
 });
 
 
 //请求拦截器
 // Add a request interceptor
axios.interceptors.request.use(function (config) {
  //请求发起会经过这里
  //config 配置对象
  //console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization=`Bearer ${user.token}`
  }
  //这里务必要返回config对象，否则请求就出不去了
  return config;
}, function (error) {
  // 请求出错（还没有发出去）
  return Promise.reject(error);
});
 
 //响应拦截器
 
 //在外面再封装了一层，使这个封装的网络请求的工具更通用
 //axios是这五个参数
 //jquery中的$.ajax是url,type,data{},headers{}这几个参数
 export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
 return axios({
     url,
     method,
     params,
     data,
     headers
   })
 };