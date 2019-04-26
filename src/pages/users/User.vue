<template>
  <div class="item blank" v-if="blank"></div>
  <div class="item" v-else>
    <div class="cols">
      <div v-for="value of Object.values(item)" class="col">{{value}}</div>
    </div>
    <div class="actions">
      <button class="update action ant" @click="update">修改</button>
      <button class="shift action ant" @click="shift">删除</button>
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
  border-top: solid 1px #f1f1f1;
  width: 100%;
  color: #666;
  padding: 1rem;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
}

.cols{
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
}

.col{
  padding: 10px;
  word-break: break-all;
  max-width: 180px;
  flex-grow: 1;
  text-align: center;
  line-height: 100%;
}

.actions{
  display: flex;
  width: 10%;
  justify-content: center;
  flex-shrink: 0;
}

.action{
  margin: 0.2rem;
}

.blank {
  height: 0;
  opacity: 0;
}



</style>
