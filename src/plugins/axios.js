import axios from 'axios'
import qs from 'qs'
const request = {
  install(Vue) {
    async function request({
      method = 'post',
      url,
      data,
      mime = 'json'
    }) {
      Vue.prototype.$Progress.start()
      try {
        let res = await axios({
          method,
          url,
          data: mime === 'json' ? data : qs.stringify(data),
          params: method=='get' ? data : undefined,
          baseURL: window.http_domain,
          // withCredentials: true,  // 是否允许跨域设置cookie
        })

        if (res.data.code !== 0) {
          if (false) {
            // 如果登陆失效则跳转到登陆页
            window.location.replace(window.location.protocol + '//' + window.location.host + window.location.pathname + '#/login')
            return
          }
          throw new Error(`code: ${res.data.code}, message: ${res.data.message}`)
        }
        return res.data
      } catch (err) {
        if (err.message === 'Network Error') {
          err.message = '请求失败，网络错误'
        } else if (err.message.substr(0, 14) === 'Request failed') {
          err.message = `请求失败，code:${err.message.split('code')[1]}`
        }
        await Vue.prototype.$confirm({
          content: err.message,
          hidecancel: true
        })
        throw err
      } finally {
        Vue.prototype.$Progress.finish()
      }
    }


    Vue.prototype.$request = {

      async login(data) {
        return await request({
          url: '/user/login',
          data
        })
      },

      // 查询用户列表
      async queryUser(data){
        return await request({
          url: '/power/queryuser',
          data
        })
      },

      //  用户增删改
      async UserAction(data){
        return await request({
          url: '/power/changeuser',
          data
        })
      }

    }
  }
}

export default request
