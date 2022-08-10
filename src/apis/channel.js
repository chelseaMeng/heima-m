import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * 设置用户频道列表
 *
 */
export const setUserChannels = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道列表
 *
 */
export const deleteUserChannels = (channelId) => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
