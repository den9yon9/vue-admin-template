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
      /*@1：配置菜单*/ 
      menus: [{ name: 'somethinglist', path: '/something/list' }]
    }
  }
}

</script>
<style scoped>


</style>
