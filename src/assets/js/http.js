import axios from 'axios'
import {getToken} from './auch'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
// 拦截器的本身就是一个方法
// 该方法什么时候执行？
// 拦截器函数接收一个参数 config
// config 就是你当前请求的配置对象
// 当你使用 axios 发起请求的时候，那么就会先经过这个拦截器然后再发出请求
// 也就是说在请求拦截器内部的请求还没有发出去
// 我们可以在这里定制请求之前的行为
http.interceptors.request.use(function (config) {
  // 如果不辞请求不是login接口，则我们就加入请求头
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  // return config就相当于next()允许通过
  return config

// 当请求出错时会调用第二个参数函数
}, function (error) {
  return Promise.reject(error)
})
// 定义一个插件对象
const httpPlugin = {}
// 2. 为插件对象添加一个成员：install
//    install 是一个函数
//    该函数接收两个参数：Vue、options
httpPlugin.install = function (Vue, options) {
  // 3.添加实例方法
  Vue.prototype.$http = http
}
// 4.导出插件方法
export default httpPlugin
