import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // 线下
  // baseURL: 'http://toutiao.course.itcast.cn'
  // 线上接口
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 配置请求拦截器
request.interceptors.request.use(function (config) {
  // 判断 是否否登录 ，如果登录 设置请求头 token
  const { user } = store.state
  if (user) {
    // console.log(user.token)
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
