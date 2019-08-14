import axios from 'axios'
import { Message } from 'element-ui'
// 拦截请求
axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})
// 拦截回复
axios.interceptors.response.use(data => {
  let result = data.data
  if (typeof (result) === 'string') {
    result = JSON.parse(result)
  }

  // if (result.code!="1") {
  //   if(result.code==="E0004")
  //   {
  //     router.push({
  //       path: '/login',
  //       name: 'Login',
  //     })
  //   }
  //   Message.error({message: result.msg});
  // }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
  } else if (err.response.status === 403) {
    Message.error({ message: '权限不足,请联系管理员!' })
  } else if (err.response.status === 401) {
    Message.error({ message: err.response.data.msg })
  } else {
    if (err.response.data.msg) {
      Message.error({ message: err.response.data.msg })
    } else {
      // Message.error({ message: '未知错误!' })
    }
  }
  // return Promise.resolve(err);
})
// const base = 'http://localhost:8080'
const base = 'http://120.77.205.253:8080'
// const qs = require('qs')
export const getBaseUrl = () => {
  return base
}
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const postFormRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
