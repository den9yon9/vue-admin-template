<template>
  <div>
    <NavRow :menus="menus" />
    <transition name="slide" mode="out-in">
      <router-view class="container"  @menupush="menuPush" @menupop="menuPop" />
    </transition>
  </div>
</template>
<script>
  import NavRow from '@/components/NavRow'
  export default {
    components: {
      NavRow
    },
    data() {
      return {
        menus: [{
          name: '用户',
          path: '/users/list'
        }]
      }
    },
    methods: {
      menuPush(menu) {
        this.menus.push(menu)
      },
      menuPop(menu) {
        this.menus.pop()
      }
    }
  }

</script>
<style scoped>


</style>
