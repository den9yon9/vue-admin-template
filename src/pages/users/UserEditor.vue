<template>
  <Dialog title="" :showdialog.sync="showdialog" @confirm="confirm" dialogstyle="overflow: visible;">
    <div class="form">
      <div class="avatar">
        <div class="avatar-img">
          <img :src="fileurl" onerror="this.src='./static/avator.png'">
        </div>
        <div class="avatar-upload">
          <span>选择图片</span>
          <input type="file" class="upload-btn" accept="image/png,image/jpeg" @change="chooseFile"  v-if="showdialog">
        </div>
      </div>
      <div class="fields">
        <div class="input"><span class="input-title">user_id</span>
          <input type="text" placeholder="请输入user_id" v-model.trim="user_id">
        </div>

        <div class="input"><span class="input-title">姓名</span>
          <input type="text" placeholder="请输入姓名" v-model.trim="user_name">
        </div>

        <div class="input"><span class="input-title">密码</span>
          <input type="text" placeholder="请输入密码" v-model.trim="password">
        </div>

        <div class="input"><span class="input-title">电话</span>
          <input type="text" placeholder="请输入电话" v-model.trim="phone">
        </div>
        
        <div class="input"><span class="input-title">选项</span>
          <Selector placeholder="请选择field4" :options="options" :value.sync="field4" style="font-size: 1.25rem;flex-grow:1;" titlestyle="width:100%;"></Selector>
        </div>
        <!-- <div class="input"><span class="input-title">时间</span>
          <Datepicker v-model="time" style="border: none;font-size: 1.25rem;"></Datepicker>
        </div> -->
      </div>
    </div>
  </Dialog>
</template>
<script>
import Dialog from 'dialog-for-vue'
import Selector from 'selector-for-vue'
import Datepicker from 'datepicker-for-vue'
export default {
  components: { Dialog, Selector, Datepicker },
  props: ['item', 'showeditor'],
  data() {
    return {
      showdialog: false,

      // 表单辅助字段(根据需要增减)
      fileurl: '',
      options: [], // 选择组件选项

      // 表单字段(根据需要增减)
      user_id: '',
      user_name: '',
      phone: '',
      field4: '',
      // time: [new Date(), new Date(new Date().getTime() + 365 * 24 * 3600 * 1000)],
      file: null // 要上传的文件
    }
  },
  async mounted() {
    // let res = await this.$request.queryoptions({ page_size: 100, page_num: 1 })
    // if (!res) return
     // this.options = res.data.map(n => ({ name: n.name, value: n.id }))
  },

  methods: {
    async confirm() {

      if (!this.user_id || !this.user_name || !this.phone || !this.field4 || this.fileurl === '') {
        this.$toasted.error('请检查资料是否填写完整')
        return
      }

      let formData = new FormData()

      // 修改信息时候，若未修改头像，则构造一个空文件对象给魏工（跟后端商议）
      this.file = this.file || new File([], 'empty')

      formData.append('file', this.file, this.file.name)
      formData.append('user_id', this.user_id)
      formData.append('user_name', this.user_name)
      formData.append('phone', this.phone)
      formData.append('field4', this.field4)
      // formData.append('start_time', this.$util.timeFormat(this.time[0]))
      // formData.append('end_time', this.$util.timeFormat(this.time[1]))

      if (this.item) {
        // 添加待修改信息的主键
        formData.append('id', this.item.id)
        let res = await this.$request.updateitem(formData)
        this.$toasted.success('修改成功')
        this.showdialog = false
        this.$emit('confirm')

      } else {
        // 新增信息
        let res = await this.$request.createitem(formData)
        this.$toasted.success(res.msg)
        this.showdialog = false
        this.$emit('confirm')
      }
    },

    chooseFile(e) {
      let file = e.target.files[0]
      if (!file) {
        return
      } else if (file.size > 1048576) {
        this.$toasted.error('文件大小不能超过1M')
      } else {
        this.file = file
        this.fileurl = URL.createObjectURL(this.file)
      }
    }
  },



  watch: {
    showdialog() {
      this.$emit('update:showeditor', this.showdialog)
    },

    showeditor() {
      this.showdialog = this.showeditor
      if (this.item) {
        this.user_id = this.item.user_id
        this.user_name = this.item.user_name
        this.phone = this.item.user_name
        this.field4 = this.item.field4
        // this.time = [new Date(this.item.start_time), new Date(this.item.end_time)]
        this.fileurl = this.item.fileurl
      } else {
        this.user_id = ''
        this.user_name = ''
        this.phone = ''
        this.field4 = ''
        // this.time = [new Date(), new Date(new Date().getTime() + 365 * 24 * 3600 * 1000)]
        this.fileurl = ''
      }
    }
  }
}

</script>
<style scoped>
.form {
  display: flex;
  flex-grow: 1;
  margin: 0 1.5rem;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-img {
  width: 9.167rem;
  height: 11.333rem;
  overflow: hidden;
  margin-bottom: 1.875rem;
  border: 0.208rem solid #fff;
  box-sizing: border-box;
  outline: #eee 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-img img {
  display: block;
  width: 100%;
}

.avatar-upload {
  width: 5.833rem;
  height: 2.083rem;
  background-color: #7276f0;
  border-radius: 0.167rem;
  color: #fff;
  font-size: 0.75rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.upload-btn {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  z-index: 1;
}

.input {
  width: 20.417rem;
  border-bottom: solid 1px #f5f5f5;
  height: 2.875rem;
  display: flex;
  align-items: center;
}

.input+.input {
  margin-top: 0.458rem;
}

.input span {
  font-size: 1.25rem;
  color: #313944;
  margin-right: 2.2rem;
  width: 3.8rem;
  text-align-last: justify;
}

::-webkit-input-placeholder {
  font-size: 1.25rem;
  color: #e3e4e5;
  line-height: 1.25rem;
  height: 1.25rem
}

input {
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: 1.25rem;
  width: 0;
  flex-grow: 1;
}

.input:focus-within {
  border-color: #7276f0;
  ;
  transition: all 0.3s;
}

.input:focus-within span {
  color: #7276f0;
  transition: all 0.3s;
}

</style>
