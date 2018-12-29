<template>
  <div class="item blank" v-if="blank"></div>
  <div class="item" v-else>
    <div>{{item}}</div>
    <div class="actions">
      <div class="update action" @click="update">修改</div>
      <div class="shift action" @click="shift">删除</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      // 组件数据
      type: Object,
      required: true
    },
    blank: {
      // 是否是用来做填充的组件
      type: Boolean,
      default: false
    },
    batching: {
      // 是否处在批量处理模式
      type: Boolean
    }
  },
  props: ['item', 'blank', 'batching'],
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
<style scoped>
.item {
  margin: 0.5rem;
}

.blank {
  height: 0;
  opacity: 0;
}

</style>
