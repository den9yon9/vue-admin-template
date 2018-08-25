<template>
  <div>
    <ItemEditor :item="itemToUpdate" :showeditor.sync="showEditor" @confirm="reload(needStore)"></ItemEditor>
    <ToolBar @clear="searchClear" @search="search" :keyword.sync="keyword">
      <div class="btn" @click="create">新增</div>
    </ToolBar>
    <div class="content-box" @scroll="loadMore($event)">
      <div class="content">
        <div class="empty" v-if="!items.length&&!loading">
          <img src="../assets/empty.png" alt="empty">
          <span>这里是空的</span>
        </div>
        <div class="data">
          <Item v-for="item of items"  :item="item" @update="update(item)" @shift="shift(item)">{{item}}</Item>
          <div class="hasmore" v-if="showLoadNotice">{{!hasmore?'已经到底了':loading?'加载中...':'下滑加载更多'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ToolBar from '@/components/ToolBar'

/*@1：*/ 
import ItemEditor from '@/components/ItemEditor'

/*@2：*/
import Item from '@/components/Item'


export default {
  components: { ToolBar, ItemEditor, Item },
  data() {
    return {
      items: [],
      itemToUpdate: null,
      pagesize: 50,
      pagenum: 1,
      keyword: '',
      searching: false,
      hasmore: true,
      loading: false,
      showLoadNotice: false,
      showEditor: false,

      /*@3：*/ 
      needStore: false // 是否需要websocket实时更新列表
    }
  },

  async created() {
    this.reload(this.needStore)
  },

  methods: {
    search() {
      this.searching = true
      this.reload();
    },

    searchClear() {
      if (this.searching) {
        this.searching = false
        this.reload(this.needStore)
      }
    },

    create() {
      this.itemToUpdate = null
      this.showEditor = true
    },

    update(item) {
      this.itemToUpdate = item
      this.showEditor = true
    },

    async shift(item) {
      let confirm = await this.$confirm('是否删除？')
      if(!confirm) return 
      
      /*@4：*/ 
      let res = await this.$request.shiftItem({ id: item.id })
      
      if(res.code === 0){
        this.$toasted.success('删除成功')
        this.reload(this.needStore)
      } else{
         this.$toasted.error('操作失败'+res.message)
      }
    },

    async loadData(data = {}) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      data.pageSize = this.pagesize;
      data.pageNum = this.pagenum;

      /*@5：*/ 
      data.keyword = this.searching ? this.keyword : undefined
      // 此处可添加添加固定参数
      // data.status = '0,1'
      // data.channel = 1

      this.pagenum = this.pagenum + 1;

      /*@6：*/ 
      let res = await this.$request.queryItems(data)

      this.loading = false;
      // this.count = res.result.count


      /*@7：批量更改所有的res.result.rows为实际返回的数组*/ 
      if (!res.result.rows.length) {
        this.pagenum = this.pagenum - 1;
        this.hasmore = false;
      }
      // 每条记录添加响应式checked属性,批量操作可能需要
      // res.result.rows.forEach(n => {
      //   n.checked = false;
      // });

      // websocket推送的消息与历史记录的消息去重（求并集），有实时推送功能或数据库更新频繁时可用到
      if (this.needStore) {
        res.result.rows = res.result.rows.filter(
          n => this.items.indexOf(n) === -1
        );
      }

      return res

    },

    async reload(needStore) {
      // needStore 是否接受websocket推送过来的消息
      this.showLoadNotice = false
      this.hasmore = true
      this.pagenum = 1;
      this.$store.commit("clearitems");
      this.items = needStore ? this.$store.state.items : []
      let res = await this.loadData()
      this.items.push(...res.result.rows)
    },

    async loadMore(e) {
      this.showLoadNotice = e.target.scrollHeight > e.target.clientHeight
      if (e.target.scrollHeight - e.target.offsetHeight <= e.target.scrollTop + 2) {
        let res = await this.loadData()
        if (res) {
          this.items.push(...res.result.rows);
        }
      }
    }
  }
}

</script>
<style scoped>
.empty {
  margin: 60px auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #bbb;
  font-size: 24px;
}

.empty img {
  margin-bottom: 30px;
}

.data {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  width: 5.833rem;
  height: 2.083rem;
  background-color: #7276f0;
  box-shadow: 0rem 0.333rem 0.625rem 0rem rgba(111, 113, 238, 0.4);
  border-radius: 0.167rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
}

</style>
