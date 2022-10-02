/**
 * 请求模块
 */
 import theAxios from 'axios';

 //创建axios实例，并在其中进行配置
 const axios = theAxios.create({
   //接口的基准路径
   baseURL: ' http://toutiao.itheima.net',
   timeout:20000  //20秒超时时间
 });
 
 
 //请求拦截器
 
 
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