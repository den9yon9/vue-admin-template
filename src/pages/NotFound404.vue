<template>
  <div class="notfound404">
	<h3>404 Not Found</h3>
	<p>抱歉，您访问的页面不存在</p>	
	<a @click="$router.push('/')">返回首页</a>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style scoped>
.notfound404{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
}

h3{
	font-size: 28px
}

p{
	color: #999;
	font-size: 14px;
	margin: 0 auto 30px auto;
}

a{
	color: #333;
	font-size: 18px;
}
</style>
