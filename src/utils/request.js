/**
 * 请求模块
 */
 import theAxios from 'axios';
 import store from '@/store/index'
 import {refreshTokenAPI} from './update'
  
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
 axios.interceptors.response.use(function (response) { 
  return response
}, async function (error) {
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:
    // store.commit('setToken', '')
    // router.push({ path: '/login' })

    // token续签方式2: refreshToken(用户无感知)
    store.commit('setToken', '')
    const res = await refreshTokenAPI()
    store.commit('setToken', res.data.data.token)
    // 再调用一次未完成的请求啊(用户无感知)
    // error.config 就是上一次axios请求的配置对象
    // console.dir(error.config)
    // 把新的token赋予到下一次axios请求的请求头中
    error.config.headers.Authorization = 'Bearer ' + res.data.data.token
    // return到await的地方
    return ajax(error.config)
  } else {
    return Promise.reject(error)
  }
})

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