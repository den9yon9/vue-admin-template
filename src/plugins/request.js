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
          params: method == 'get' ? data : undefined,
          baseURL: window.http_domain,
          // withCredentials: true,  // 是否允许跨域设置cookie
        })

        if (!res.data.success) {
          if (res.data.message==='登陆失效') {
            // 如果登陆失效则跳转到登陆页
            window.location.replace(window.location.protocol + '//' + window.location.host + window.location.pathname + '#/login')
            return
          }
          throw new Error(`message: ${res.data.message}`)
        }
        return res.data
      } catch (err) {
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
      // 登录
      async login(data) {
        return await request({
          url: '/user/login',
          data
        })
      },

      // 登出
      async logout(data){
        return await request({
          url: '/user/logout',
          data
        })
      },

      // 查询用户列表
      async queryUsers(data) {
        return await request({
          url: '/user/list',
          data
        })
      },

      //  增加用户
      async createUser(data) {
        return await request({
          url: '/user/create',
          data
        })
      },

      // 删除用户
      async deleteUser(data) {
        return await request({
          url: '/user/delete',
          data
        })
      },

      // 修改用户
      async updateUser(data) {
        return await request({
          url: '/user/update',
          data
        })
      }

    }
  }
}

export default request
