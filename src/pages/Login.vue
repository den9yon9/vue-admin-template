<template>
  <div class="login">
    <div class="login-form">
      <input type="text" placeholder="用户名" v-model.trim="username">
      <input type="password" placeholder="密码" v-model.trin="password">
      <button @click="login">登陆</button>
      <Selector :value.sync="value" :options="[{name: '站三', value: 0}, { name: '李四', value: 1}]" placeholder="asasf" style="width: 6rem;"></Selector>
    </div>
  </div>
</template>
<script>
import addRouter from '../router/addRouter.js'
import Selector from 'selector-for-vue'
export default {
  components: { Selector },
  data() {
    return {
      username: '',
      password: '',
      value: 1
    }
  },
  mounted() {

  },
  methods: {
    async login() {
      if (!this.username) {
        this.$toasted.error('请输入用户名！')
      } else if (!this.password) {
        this.$toasted.error('请输入密码！')
      } else {
        let res = await this.$request.login({ username: this.username, password: this.password })
        if (res.code === 0) {
          localStorage.setItem('login', true)
          addRouter()
          this.$router.push('/')
        } else {
          this.$toasted.error(res.message)
        }
      }
    }
  }
}

</script>
<style scoped>


</style>
