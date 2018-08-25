<template>
  <div class="navcol">
    <div class="logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <div class="nav" :class="{active: active=='something'}" @click="navChange('something')">
      <img src="../assets/logo.png">
      <div>something</div>
    </div>
    <div class="nav" :class="{active: active=='nav2'}" @click="navChange('nav2')">
      <img src="../assets/logo.png">
      <div>nav2</div>
    </div>
    <div class="nav" :class="{active: active=='nav3'}" @click="navChange('nav3')">
      <img src="../assets/logo.png">
      <div>nav3</div>
    </div>
    <div class="nav" :class="{active: active=='nav4'}" @click="navChange('nav4')">
      <img src="../assets/logo.png">
      <div>nav4</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: this.$route.path.split('/')[1]
    }
  },
  methods: {
    navChange(nav) {
      this.active = nav
      this.$router.push(`/${nav}`)
    }
  },
  computed: {
    route() {
      return this.$route.path
    }
  },
  watch: {
    route() {
      this.active = this.$route.path.split('/')[1]
    }
  }
}

</script>
<style scoped>
.navcol {
  width: 5rem;
  background-color: #6967ea;
  flex-shrink: 0;
  z-index: 1
}

.logo {
  height: 5.833rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 60%;
}

.nav {
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  box-sizing: border-box;
  opacity: 0.6;
  align-items: center;
  color: #fff;
  font-size: 0.75rem;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.nav img{
  width: 30%;
  margin-bottom: 4px;
}

.active {
  width: 5.167rem;
  background-color: #594bde;
  box-sizing: border-box;
  border-right: solid 0.167rem #ffa800;
  transition: all 0.2s;
  opacity: 1;
}

</style>
