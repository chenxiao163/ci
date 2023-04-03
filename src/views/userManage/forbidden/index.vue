<style>
.forbidContaner {
  margin: 50px 0 0 30px;
}
.stateStyle {
  padding-left: 80px;
  padding-right: 95px;
}
</style>
<template>
  <div class="forbidContaner">
    <el-form ref="form" :model="form" label-width="110px" :rules="ruleValidate">
      <el-form-item label="平台" prop="channel">
        <el-select v-model="form.channel" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="玩家角色ID" prop="userid">
        <el-input v-model="form.userid" style="width:100px;margin-right:30px" />
        <el-button type="primary" @click="toSearch('form')">状态查询</el-button>
      </el-form-item>
      <el-form-item label="游戏昵称">
        <span v-if="judgecode" class="stateStyle">{{ form.userName }}</span>
      </el-form-item>
      <el-form-item label="玩家当前状态">
        <span v-if="form.state===0&&judgecode" class="stateStyle">正常状态</span>
        <span v-if="form.state===2&&judgecode" class="stateStyle">未到发言级别</span>
        <span v-if="form.state===1&&judgecode" class="stateStyle">禁言状态 <span style="color:red"> (还剩{{ time|formatDate }}解除)</span></span>
      </el-form-item>
      <el-form-item v-if="judgecode" label="操作原因" prop="opt_reason">
        <el-input v-model="form.opt_reason" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" style="width:400px;margin-right:30px" />
      </el-form-item>
      <el-form-item v-if="judgecode" label="禁言天数" prop="days">
        <el-input-number v-model="form.days" controls-position="right" :min="1" style="width:200px;margin-right:30px" />天
      </el-form-item>
      <el-button v-if="judgecode" style="margin-left:30px" type="primary" :disabled="!isManage" @click="toForbidden('form')">立即禁言</el-button>
      <el-button v-if="form.state===1&&judgecode" style="margin-left:30px" :disabled="!isManage" type="primary" @click="toNormal">解除禁言</el-button>
    </el-form>
  </div>
</template>
<script>
import { state, getChannelOptions } from '@/api/userMange'
import { mapGetters } from 'vuex'
export default {
  name: 'Forbidden',
  filters: {
    formatDate: function(ms) {
      const days = parseInt(ms / (60 * 60 * 24)) ? parseInt(ms / (60 * 60 * 24)) + '天' : ''
      const hours = (ms % (60 * 60 * 24)) / (60 * 60) ? parseInt((ms % (60 * 60 * 24)) / (60 * 60)) + '小时' : ''
      const min = parseInt((ms % (60 * 60)) / (60)) + '分钟'
      return days + hours + min
    }
  },
  data() {
    return {
      isManage: false,
      judgecode: '',
      time: null,
      form: {
        userid: '',
        userName: '',
        state: null,
        opt_reason: '',
        days: null,
        channel: null,
        opt_content: ''
      },
      channelOptions: [
      ],
      ruleValidate: {
        userid: [
          { required: true, message: '用户userid必填', trigger: 'blur' },
          { type: 'string', trigger: ['change', 'blur'] }
        ],
        opt_reason: [
          { required: true, message: '禁言原因必填', trigger: ['change', 'blur'] }
        ],
        days: [
          { required: true, message: '禁言天数必填', trigger: 'blur' },
          { type: 'number', trigger: ['change', 'blur'] }
        ],
        channel: [
          { required: true, message: '请选择平台', trigger: 'blur' },
          { type: 'number', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  created() {
    if (this.mypermissions.indexOf('玩家禁言') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
  },
  methods: {
    toForbidden(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.form.opt_reason.trim()) {
            this.$msgbox({
              title: '提示',
              message: '请填写操作原因!'
            })
          } else {
            this.form.state = 3
            var self = this
            var request = { roleId: this.form.userid, opt_content: '禁言', opt_reason: this.form.opt_reason, days: this.form.days, state: 1, channel: this.form.channel }
            state(request).then(res => {
              if (res && res.code === 1) {
                this.$message({
                  message: '禁言成功',
                  type: 'success'
                })
                state({ roleId: this.form.userid, channel: this.form.channel }).then(response => {
                  self.judgecode = response ? response.code : response
                  if (response && response.code === 1) {
                    self.form.state = response.data.state.state
                    self.time = response.data.state.forbiddenTTL
                    self.form.userName = response.data.userName
                  }
                })
              }
            })
          }
        } else {
          this.$message.error('字段不全')
        }
      })
    },
    toSearch(form) {
      this.judgecode = ''
      var self = this
      var request = { roleId: this.form.userid, channel: this.form.channel }
      this.$nextTick(() => {
        this.$refs[form].validate(valid => {
          if (valid) {
            state(request).then(response => {
              this.judgecode = response ? response.code : response
              if (response && response.code === 1) {
                self.form.state = response.data.state.state
                self.time = response.data.state.forbiddenTTL
                self.form.userName = response.data.userName
              } else {
                this.$message({
                  message: '角色ID不存在',
                  type: 'warning'
                })
              }
            })
          } else {
            this.$message.error('查询字段不全')
          }
        })
      })
    },
    toNormal() {
      this.form.state = 3
      var self = this
      var request = { roleId: this.form.userid, state: 0, opt_content: '解禁', channel: this.form.channel }
      state(request).then(response => {
        if (response && response.code === 1) {
          self.form.state = 0
          // this.form.state = response.data
          this.$message({
            message: '解除成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
