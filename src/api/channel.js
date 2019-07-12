import request from '@/utils/request'
// 获取用户的频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 重置用户的频道列表
export const resetUserChannels = (data) => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: data
  })
}

// 获取所有列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
