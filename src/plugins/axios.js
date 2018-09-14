import axios from 'axios'
import qs from 'qs'
const request = {
  install(Vue) {
    async function request({ method = 'post', url, data }) {
      Vue.prototype.$Progress.start()
      try {
        let res = await axios({
          method,
          url,
          data: qs.stringify(data),
          baseURL: window.domain,
          // withCredentials: true,  // 是否允许跨域设置cookie
        })

        Vue.prototype.$Progress.finish()

        if (res.data.code !== 0) {
          if (false) {
            // 如果登陆失效则跳转到登陆页
            window.location.replace(window.location.protocol + '//' + window.location.host + window.location.pathname + '#/login')
            return
          }
          await Vue.prototype.$confirm({
            content: `${ res.data.message},code:${res.data.code}`,
            hidecancel: true
          })
          return
        }
        return res.data
      } catch (err) {
        Vue.prototype.$Progress.finish()
        if (!err.response) {
          Vue.prototype.$toasted.error('请求发起失败')
          return
        }
        Vue.prototype.$toasted.error(`服务器出错啦, statusCode:${err.response.status}`)
        console.error(err)
      }
    }


    Vue.prototype.$request = {

      async login(data) {
        return await request({
          url: 'login',
          data
        })
      },

      async logout(data) {
        return await request({
          url: 'logout',
          data
        })
      },

      async queryItems(data) {
        return await request({
          url: 'items/query',
          data
        })
      },

      async createItem(data) {
        return await request({
          url: 'items/create',
          data
        })
      },

      async updateItem(data) {
        return await request({
          url: 'items/update',
          data
        })
      },

      async shiftItem(data) {
        return await request({
          url: 'items/shift',
          data
        })
      }

    }
  }
}

export default request
