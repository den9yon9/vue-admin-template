<template>
  <div class="toolbar">
    <div class="filter-bar">
    	<slot></slot>
    </div>
    <div class="search-bar">
      <input type="text" v-model.trim="word" :placeholder="searchPlaceholder">
      <div class="icon" @click="search">
        <transition name="fade">
          <div class="clear" @click.stop="clear" v-show="word"></div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['keyword', 'searchPlaceholder'],
  data() {
    return {
    	word: ''
    }
  },
  methods: {
    clear() {
      this.$emit('clear')
      this.word = ''
    },
    search() {
      this.$emit('search')
    }
  },
  watch: {
  	word(){
  		this.$emit('update:keyword', this.word)
  	}
  }
}

</script>
<style scoped>
.toolbar {
  height: 3rem;
  background-color: #fff;
  margin: 1rem 1.86rem 1rem 1.667rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  padding: 0 1rem;
}

.search-bar {
  width: 18.333rem;
  height: 2.083rem;
  background-color: #ffffff;
  display: flex;
  margin-left: 1rem;
}

input {
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1.6rem;
  font-size: 1rem;
  border: solid 1px #e3e4e5;
  border-right: none;
  border-top-left-radius: 0.167rem;
  border-bottom-left-radius: 0.167rem;
}

.icon {
  width: 3rem;
  background: url(../assets/search.png) no-repeat center center #7276f0;
  background-size: 40%;
  flex-shrink: 0;
  border-top-right-radius: 0.167rem;
  border-bottom-right-radius: 0.167rem;
  cursor: pointer;
  position: relative;
}

.clear {
  position: absolute;
  left: -1.5rem;
  width: 1.5rem;
  height: 1rem;
  background: url(../assets/cancel.png) no-repeat center center;
  background-size: 40%;
  height: 80%;
  top: 0;
  bottom: 0;
  margin: auto;
}

.filter-bar{
	flex-grow: 1;
}
</style>
