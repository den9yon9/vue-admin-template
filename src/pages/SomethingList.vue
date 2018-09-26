<template>
  <div>
    <div class="waiting" v-if="waiting">
      <Loading size="60px"></Loading>
      <span>请稍等... </span>
    </div>
    <div class="batch" v-if="hasBatchAction">
      <div class="batch-ready" v-show="!batching" @click="batching = true">批量</div>
      <div class="batch-confirm" v-show="batching" @click="batchAction">操作({{batchItems.length}})</div>
      <div class="batch-cancel" v-show="batching" @click="batching = false">取消</div>
    </div>
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
          <Item v-for="item of items" :item="item" @update="update(item)" @shift="shift(item)" :batching="batching">{{item}}</Item>
          <!-- 占位空白组件，撑开布局 -->
          <Item v-for="item of 10" :blank="true"></Item>
          <div class="hasmore" v-if="showLoadNotice">{{!hasmore?'已经到底了':loading?'加载中...':'下滑加载更多'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
          1.引入Item组件，处理Item组件所需参数
          2.根据情况决定是否使用ItemEditor组件，不需要时注释掉ItemEditor组件，需要时打开新增按钮
          3.替换列表查询接口
          4.正确引用接口返回的列表
          5.是否需要搜索功能，替换搜索关键字段名
          6.处理分页参数名，添加固定参数
          7.是否使用列表去重pick
          8.替换删除接口并完善后续
          9.根据情况开启needStore,并完善needStore配套设施
          10.是否需要批量处理模式
          11.添加其他额外功能
*/

  import ToolBar from '@/components/ToolBar'
  import ItemEditor from '@/components/ItemEditor'
  import Item from '@/components/Item'
  import {
    CubeShadow as Loading
  } from 'vue-loading-spinner'

  export default {
    components: {
      ToolBar,
      ItemEditor,
      Item,
      Loading
    },
    data() {
      return {
        items: [],
        itemToUpdate: null,
        pagesize: 50,
        pagenum: 1,
        keyword: '',

        //  flag
        searching: false,
        hasmore: true,
        loading: false,
        showLoadNotice: false,
        showEditor: false,
        waiting: false, //针对操作时间较长的动作，给出执行动画
        batching: false, // 是否在批量模式

        // switch
        hasBatchAction: false, // 是否有批量处理功能
        pick: true, // 请求分页时去重（如果数据库更新频繁，可能会造成分页紊乱产生重复数据）
        needStore: false // 是否需要websocket实时更新列表
      }
    },

    async created() {
      this.reload(this.needStore)
    },

    methods: {
      async action(item) {
        let confirm = await this.$confirm('是否执行此操作？')
        if (!confirm) return
        // TODO: 数据处理
        console.log(item)

        this.waiting = true
        let res = await this.$request.action()
        this.waiting = false
        if (!res) return
        this.$toasted.success(res.msg)
        // TODO: action result notice and reload

      },

      async batchAction() {
        // TODO: 组装数据
        console.log(this.batchItems)

        this.waiting = true
        let res = await this.$request.batchAction()
        this.waiting = false
        if (!res) return
        this.$toasted.success(res.msg)
        // TODO: action result notice and reload

      },

      async loadData(data = {}) {
        if (this.loading) {
          return;
        }
        this.loading = true;
        data.pageSize = this.pagesize;
        data.pageNum = this.pagenum;

        data.keyword = this.searching ? this.keyword : undefined
        // 此处可添加添加固定参数
        // data.status = '0,1'
        // data.channel = 1

        this.pagenum++
        let res = await this.$request.queryItems(data)
        this.loading = false;
        if (!res) return

        if (!res.result.rows.length) {
          this.pagenum = this.pagenum - 1;
          this.hasmore = false;
        }

        // 每条记录添加响应式checked属性,批量操作需要
        if (this.hasBatchAction) {
          res.result.rows.forEach(n => {
            n.checked = false;
          })
        }

        // websocket推送的消息与历史记录的消息去重（求并集），有实时推送功能或数据库更新频繁时可用到
        if (this.needStore || this.pick) {
          res.result.rows = res.result.rows.filter(
            n => this.items.indexOf(n) === -1
          );
        }

        return res
      },

      // 删除
      async shift(item) {
        let confirm = await this.$confirm('是否删除？')
        if (!confirm) return
        let res = await this.$request.shiftItem({
          id: item.id
        })
        if (!res) return
        this.$toasted.success(res.msg)
        this.reload(this.needStore)

      },

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
    },

    computed: {
      batchItems() {
        return this.items.filter(item => item.checked)
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
    justify-content: space-between;
    padding: 1rem;
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

  .batch {
    color: #fff;
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    overflow: hidden;
    font-size: 1.2rem;
    z-index: 1;
  }

  .batch>div {
    height: 1.2rem;
    width: 1.2rem;
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .batch-cancel {
    border-top: solid 1px #fff;
  }

  .hasmore {
    width: 100%;
    flex-grow: 1;
    height: 3rem;
    color: #666;
    font-size: 16px;
    text-align: center;
    margin: 4rem;
  }

</style>
