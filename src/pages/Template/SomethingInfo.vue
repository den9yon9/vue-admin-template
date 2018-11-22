<template>
  <div>
    <div class="waiting" v-if="waiting">
      <Loading size="60px"></Loading>
      <span>请稍等... </span>
    </div>
    <div class="content-box">
      <div class="content">
        <div class="data">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CubeShadow as Loading
  } from 'vue-loading-spinner'
  export default {
    components: {
      Loading
    },
    data() {
      return {
        waiting: false,
      }
    },
    async created() {
      this.$emit('menupush', {
        name: 'somethingInfo',
        path: '/some/info',
        prevent: true
      })
    },
    beforeDestroy() {
      this.$emit('menupop')
    }
  }

</script>

<style scoped>
  .content {
    margin-top: 1.667rem;
  }

  .data {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1rem;
    flex-direction: column;
  }


  .btn {
    width: 5.833rem;
    height: 2.083rem;
    background-color: #4780ff;
    box-shadow: 0rem 0.333rem 0.625rem 0rem rgba(111, 113, 238, 0.4);
    border-radius: 0.167rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    cursor: pointer;
  }

  .waiting {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    z-index: 2;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*cursor: not-allowed;*/
  }

  .waiting span {
    margin: 1rem;
    color: #999;
    font-size: 1rem;
  }

</style>
