<template>
  <div class="home">
    <NavCol />
    <transition name="slide" mode="out-in">
      <router-view class="page" />
    </transition>
  </div>
</template>
<script>
  import NavCol from '@/components/NavCol'
  import ws from '@/ws.js'
  export default {
    components: {
      NavCol
    },
    mounted() {
      // ws.connect.call(this)
    },
    beforeDestroy() {
      // ws.client.disconnect(res => {
        // console.log('websocket已断开')
      // })

      if (this.$route.path === '/login') {
        // 回到登录页后刷新整个系统，避免动态添加重复路由
        window.location.reload()
      }
    }
  }

</script>
<style scoped>
  .home {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .page {
    flex-grow: 1;
    overflow: hidden;
    background-color: #f5f7fa;
    display: flex;
    flex-direction: column;
  }

</style>
