/**
 * 搜索模块
 */

 import request from "@/utils/request";

 /**
  * 搜索_联想菜单
  */
 
 export const getSearchSuggestions = (q) => {
   return request({
     method: 'GET',
     url: '/v1_0/suggestion',
     params:{q},
   })
 }
  /**
  * 搜索_结果菜单
  */
 
   export const getSearchResults = (params) => {
    return request({
      method: 'GET',
      url: '/v1_0/search',
      params,
    })
  }
  