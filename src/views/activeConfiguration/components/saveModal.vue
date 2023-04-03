<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <span>是否提交：
        <el-radio v-model="radioValue" label="1">是</el-radio>
        <el-radio v-model="radioValue" label="2">否</el-radio>
      </span>
      <p style="color:red">注意：不提交将在3小时之后自动撤销</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addActiveConfig } from '@/api/activeConfiguration'
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      radioValue: '1'
    }
  },
  methods: {
    // 提交是提交到服务器，保存是缓存，提交成功之后将退出重新登录
    handleSure() {
      if (this.radioValue === '1') {
        if (!this.desc) {
          this.$message.warning('请填写活动描述')
          return
        }
        if (!this.start) {
          this.$message.warning('请选择开始时间')
          return
        }
        if (!this.end) {
          this.$message.warning('请选择结束时间')
          return
        }
        const data = {
          jsonrpc: "2.0",
          method: "bingo.svn_commit",
          id: "1",
          params: {
            whichConf: localStorage.getItem('svnWhichConf'),
            username: localStorage.getItem('svnUserName'),
            desc: this.desc,
            start: this.start,
            end: this.end
          }
        }
        addActiveConfig(data).then(res => {
          if (res.code === 1) {
            this.$message.success('提交成功')
            this.dialogVisible = false
            localStorage.removeItem('svnUserName')
            localStorage.removeItem('svnWhichConf')
            location.reload()
          }
        })
      } else {
        this.dialogVisible = false
      }
    },

    showModal() {
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>

</style>
