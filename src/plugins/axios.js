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
          withCredentials: true,
        })

        Vue.prototype.$Progress.finish()

        if (res.status == 200) {
          // alert('请求成功')
          return res.data
        } else {
          Vue.prototype.$confirm({ content: `服务器出错啦${res.status}，请稍后再试` })
        }
      } catch (err) {
        Vue.prototype.$Progress.finish()
        alert(err)
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
