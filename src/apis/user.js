import request from '@/utils/request'
// import store from '@/store'
/**
 * 登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * @param {string} mobile 手机号
 * @returns Promise
 */
// 发送验证码
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

// 获取用户自己的数据
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 上传头像的请求
// 如果传的是对象,axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formdata表单,那么axios会将表单提交给后端,并且默认加上content-type=multipart/formdata
// 如果后端要的是FormData表单
// const fm = new FormData()
// fm.append(表单的名称或者文档中的body中的photo字段(参数名称),表单项)

/**
 *
 * @param {*} file  图片的file对象
 * @returns Promise
 */
export const uploadAvatar = (file) => {
  // 创建一个表单数据类型 new FormData()
  const fm = new FormData()
  // photo 文档中的photo字段(参数名称) ,file是表单项,是用户传的
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
