<template>
  <div>
    <NavRow :menus="menus" />
    <transition name="slide" mode="out-in">
      <router-view class="container" />
    </transition>
  </div>
</template>
<script>
import NavRow from '@/components/NavRow'
export default {
  components: { NavRow },
  data() {
    return {
      menus: [{ name: '用户库', path: '/users/list' }]
    }
  }
}

</script>
<style scoped>


</style>
