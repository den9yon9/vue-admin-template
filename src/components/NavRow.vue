<template>
  <div class="navrow">
    <div class="menus">
      <a :class="['menu', {active: active==menu.path.split('/')[2]}]" v-for="menu of menus" @click="menuChange(menu)">{{menu.name}}</a>
    </div>
    <div class="status">
      <div class="avator"></div>
      <div class="user">{{'用户名'}}</div>
      <!-- <div class="update-psw">修改密码</div> -->
      <div class="logout" @click="logout"></div>
    </div>
  </div>
</template>
<script>
export default {
  // menus: Object --> { name: 'somethinglist', path: '/something/list'}
  props: ['menus'],
  data() {
    return {
      active: this.$route.path.split('/')[2]
    }
  },
  methods: {
    menuChange(menu) {
      this.active = menu.path.split('/')[2]
      this.$router.push(menu.path)
    },
    async logout() {
      if (await this.$confirm('是否退出登录')) {
        let res = await this.$request.logout({})
        if (res.code === 0) {
          this.$router.push('/login')
        }
      }
    }
  },
  computed: {
    route() {
      return this.$route.path
    }
  },
  watch: {
    route() {
      this.active = this.$route.path.split('/')[2]
    }
  }
}

</script>
<style scoped>
.navrow {
  height: 3.333rem;
  background-color: #fff;
  padding-left: 1.667rem;
  padding-right: 1.667rem;
  justify-content: space-between;
  display: flex;
  flex-shrink: 0;
}

.menus {
  display: flex;
}

.menu {
  color: #999;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2.5rem;
  padding: 0rem 0.2rem;
  border-bottom: solid 0 #fff;
  cursor: pointer;
  transition: all 0.1s;
  min-width: 3.333rem;
}

.active {
  color: #4780ff;
  border-bottom: solid 0.167rem #4780ff;
  transition: all 0.1s;
}


.status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.avator {
  width: 2.083rem;
  height: 2.083rem;
  background: url(../assets/user.png) no-repeat center center;
  background-size: 100% 100%;
  margin-right: 0.729rem;
}

.user {
  font-size: 1rem;
  color: #8e9199;
  margin-right: 1rem;
}

.update-psw {
  margin-right: 1.667rem;
}

.logout {
  width: 2rem;
  height: 2rem;
  background: url(../assets/logout.png) no-repeat center center;
  background-size: 100%;
  cursor: pointer;
}

</style>
