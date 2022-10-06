// 用户 - 更新token
export const refreshTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
})