<template>
  <div class="login">
    <div class="title">
      <h1>人脸进入系统管理后台</h1>
    </div>
    <div class="login-form">
      <div class="input-item">
        <input type="text" placeholder="用户名" v-model.trim="username">
      </div>
      <div class="input-item">
        <input type="password" placeholder="密码" v-model.trim="password">
      </div>
      <div class="input-item">
        <Selector :value.sync="value" :options="[{name: '站三', value: 0}, { name: '李四', value: 1}]" placeholder="请选择设备"></Selector>
      </div>
      <button @click="login">登陆</button>
    </div>
  </div>
</template>
<script>
  import addRouter from '../router/addRouter.js'
  import Selector from 'selector-for-vue'
  export default {
    components: {
      Selector
    },
    data() {
      return {
        username: '',
        password: '',
        value: 1
      }
    },
    methods: {
      async login() {
        if (!this.username) {
          this.$toasted.error('请输入用户名！')
        } else if (!this.password) {
          this.$toasted.error('请输入密码！')
        } else {
          let res = await this.$request.login({
            email: this.username,
            password: this.password
          })
          addRouter()
          this.$router.push('/')
        }
      }
    }
  }

</script>
<style scoped>
  .login {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(../assets/bg.png) #2f86f0;
    background-size: cover;
  }

  .title {
    margin-top: 60px;
    color: #fff;
  }

  .login-form {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-item {
    width: 300px;
    height: 40px;
    margin: 10px;
    border-radius: 2px;
    padding-left: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding-right: 10px;
    /*overflow: hidden;*/
  }

  .input-item>* {
    height: 100%;
    flex-grow: 1;
  }

  button {
    width: 300px;
    height: 40px;
    background: #1890FF;
    margin-top: 20px;
    color: #fff;
    font-size: 18px;
    letter-spacing: 10px;
  }


  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  input[type=text]:focus,
  input[type=password]:focus,
  textarea:focus {
    -webkit-box-shadow: 0 0 0 1000px white inset;
  }

  input {
    border: none;
  }

  input:focus {
    outline: none;
  }

</style>
