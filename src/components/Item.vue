<template>
  <div class="item">
  	<div>{{item}}</div>
    <div class="actions">
      <div class="update action" @click="update">修改</div>
      <div class="shift action" @click="shift">删除</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item'],
  methods: {
    update() {
      this.$emit('update', this.item)
    },
    shift() {
      this.$emit('shift', this.item)
    }
  }
}

</script>
