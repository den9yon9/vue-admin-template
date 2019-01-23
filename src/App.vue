<template>
  <div id="app">
    <v-dialog />
    <vue-progress-bar />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
  import addRouter from '@/router/addRouter.js'

  export default {
    name: 'App',
    beforeCreate() {
      // 刷新时重新分配路由
      addRouter()
    }
  }

</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }

  /*NavRow下方的页面容器*/
  .container {
    overflow: hidden;
    flex-grow: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /*ToolBar下方的内容容器*/
  .content-box {
    padding: 0 1.167rem 0 1.667rem;
    flex-grow: 1;
    height: 0;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-bottom: 0.4rem;
  }

  /*内容区*/
  .content {
    background-color: #fff;
    flex-grow: 1;
  }

  html {
    /*font-size: 12px;*/
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    font-size: 12px;
    width: 100%;
    height: 100%;
    min-width: 880px;
  }

  p,
  ul,
  li,
  section,
  main {
    margin: 0;
    padding: 0;
  }

  a {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  button,
  input,
  textarea {
    background-color: transparent;
    border: solid 1px #f1f1f1;
    padding: 0;
    border-radius: 4px;
    padding-left: 10px;
  }

  button:hover,
  input:hover,
  textarea:hover {
    border: solid 1px #4780ff;
    transition: all 0.2s;
  }

  button:focus,
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #4780ff;
    transition: all 0.2s;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
  }

  button {
    cursor: pointer;
    padding-left: 0;
  }


  /* 渐隐渐现动画*/
  .fade-enter {
    transform: translateX(0) scale(1) skew(0deg) rotate(0deg);
    transition: 0.25s all;
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave {
    transform: translateX(0) scale(1) skew(0deg) rotate(0deg);
    opacity: 1;
    transition: 0.25s all;
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(0) scale(1) skew(0deg) rotate(0deg);
    transition: 0.25s all;
  }

  /*浮现动画*/
  .float-enter {
    transform: translateX(1rem) scale(0.98) skew(1deg) rotate(0deg);
    opacity: 0;
    transition: 0.25s all;
  }

  .float-enter-active,
  .float-leave {
    opacity: 1;
    transition: 0.35s all;
  }

  .float-leave-active {
    opacity: 0.5;
    transform: translateX(1rem) scale(0.98) skew(1deg) rotate(0deg);
    transition: 0.35s all;
  }

  /*滑动动画*/
  .slide-enter {
    transform: translateX(0.3rem) scale(1) skew(0deg) rotate(0deg);
    opacity: 0;
    transition: 0.25s all;
  }

  .slide-enter-active,
  .slide-leave {
    opacity: 1;
    transition: 0.35s all;
  }

  .slide-leave-active {
    opacity: 0.5;
    transform: translateX(0.3rem) scale(1) skew(0deg) rotate(0deg);
    transition: 0.35s all;
  }

</style>
