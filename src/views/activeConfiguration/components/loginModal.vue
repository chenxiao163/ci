<template>
  <div>
    <el-dialog :show-close="false" title="svn登录" :visible.sync="dialogFormVisible" width="400px" :close-on-click-modal="false">
      <el-form :model="loginForm">
        <el-form-item label="配置来源" label-width="80px">
          <el-select v-model="loginForm.whichConf" placeholder="请选择" style="width:280px">
            <el-option
              v-for="item in whichConfOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="loginForm.userName" />
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="loginSvn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addActiveConfig } from '@/api/activeConfiguration'
export default {
  data() {
    return {
      loginForm: {
        whichConf: "",
        userName: "",
        password: ""
      },
      loading: false,
      dialogFormVisible: true,
      whichConfOption: [
        { label: '测试服', value: 'trunk' },
        { label: 'check', value: 'check' },
        { label: 'online', value: 'online' },
        { label: '微乐', value: 'hlwl' }
      ]
    }
  },

  created() {
    if (this.$route.name === 'ActiveParamConfig' && localStorage.getItem('svnUserName')) {
      this.dialogFormVisible = false
    }
  },

  methods: {
    loginSvn() {
      this.loading = true
      const Base64 = require('js-base64').Base64
      const password = Base64.encode(this.loginForm.password)

      const data = {
        "jsonrpc": "2.0",
        "method": "bingo.login",
        "id": "1",
        params: {
          whichConf: this.loginForm.whichConf,
          password: password, //
          username: this.loginForm.userName
        }
      }

      addActiveConfig(data).then(res => {
        this.loading = false
        if (res.code === 1) {
          this.$message.success(res.msg)
          localStorage.setItem('svnUserName', this.loginForm.userName)
          localStorage.setItem('svnWhichConf', this.loginForm.whichConf)
          this.dialogFormVisible = false

          // 记录登录时间
          var startDate = new Date();
          localStorage.setItem('startDate', startDate)
        }
      })
    },

    // 取消
    handleCancle() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.el-dialog__wrapper{
  background: rgba(221, 220, 220,0.8);
}
</style>
