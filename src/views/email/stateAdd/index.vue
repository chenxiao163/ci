<style>
  .divLine{
    background-color: #dcdfe6;
    position: relative;
    display: block;
    height: 1px;
    width: 100%;
    margin-bottom: 20px;
  }
  .inline-input{
    width:200px;
    margin-right:15px
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .chooseChannel{
    display: inline-block;
    margin-right: 30px;
  }
</style>
<template>
  <div class="app-container">

    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" :rules="ruleValidate" label-width="100px" label-position="left">
      <el-form-item label="选择平台" prop="channel">
        <el-select v-model="dynamicValidateForm.channel" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="玩家userid" prop="uid">
        <el-input v-model="dynamicValidateForm.uid" :autosize="{ minRows: 4 }" style="width:450px;" type="textarea" />
      </el-form-item>
      <el-form-item label="状态操作" prop="appendix">
        <el-select v-model="dynamicValidateForm.appendix" multiple placeholder="请选择" style="width:100%">
          <el-option
            v-for="(item,index) in appoptions"
            :key="index"
            :label="item.name"
            :value="item.type"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="操作原因" prop="send_reason">
        <el-input v-model="dynamicValidateForm.send_reason" :autosize="{ minRows: 2 }" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!isManage" @click="submitForm('dynamicValidateForm')">提交审批</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { sendEmail, emailDetai, getStates } from '@/api/email'
import { mapGetters } from 'vuex'
import { getChannelOptions } from '@/api/userMange'
export default {
  name: 'StateAdd',
  data() {
    var validateUid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('玩家userId不能为空'))
      } else {
        if (value.indexOf(',') > -1 || value.indexOf('，') > -1) {
          callback(new Error('玩家userId格式错误,多个uid用回车键隔开!'))
        } else {
          this.uids = value.split('\n')
          callback()
        }
      }
    }
    return {
      isManage: false,
      appoptions: [],
      dynamicValidateForm: {
        channel: '',
        uid: '',
        uids: [],
        appendix: [],
        send_reason: '',
        emailId: null
      },
      channelOptions: [

      ],
      ruleValidate: {
        uid: [
          { required: true, message: '请输入玩家userId', trigger: ['change', 'blur'] },
          { validator: validateUid, trigger: ['change', 'blur'] }
        ],
        channel: [
          { required: true, message: '请选择平台', trigger: ['change', 'blur'] }
        ],
        appendix: [
          { required: true, type: 'array', message: '请选择状态操作', trigger: ['change', 'blur'] }
        ],
        send_reason: [
          { required: true, message: '请输入发放原因', trigger: ['change', 'blur'] },
          { type: 'string', min: 2, message: '发放原因不少于2个字符', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  watch: {
    'dynamicValidateForm.channel'(val) {
      this.getPros()
    }
  },
  mounted() {
    if (this.mypermissions.indexOf('功能状态调整') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
    if (this.$route.query) {
      this.emailId = this.$route.query.id || null
      if (this.emailId) {
        this.getData()
      }
    }
  },
  created() {
    if (this.mypermissions.indexOf('功能状态调整') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
    this.getPros()
    if (this.$route.query) {
      this.emailId = this.$route.query.id || null
      if (this.emailId) {
        this.getData()
      }
    }
  },
  methods: {
    initData() {
      this.products = []
      this.dynamicValidateForm = {
        channel: '',
        uid: '',
        uids: [],
        appendix: [],
        send_reason: '',
        emailId: null
      }
      this.$nextTick(() => {
        this.$refs['dynamicValidateForm'].clearValidate()
      })
    },
    getPros() {
      var self = this
      getStates({ channel: this.dynamicValidateForm.channel }).then(response => {
        if (response && response.code === 1) {
          self.appoptions = response.data
          console.log(self.appoptions)
        }
      })
    },
    querySearch(queryString, cb) {
      if (this.products.length > 0) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      } else {
        if (this.flag) {
          this.$message({
            message: '请先选择平台',
            type: 'error'
          })
        }
      }
    },
    getData() {
      var query = { id: this.emailId }
      emailDetai(query).then(response => {
        var mydata = response.data
        this.dynamicValidateForm.send_reason = mydata.send_reason
        this.dynamicValidateForm.channel = mydata.channel
        this.dynamicValidateForm.uid = mydata.uids.join('\n')
        this.dynamicValidateForm.appendix = []
        mydata.appendix.forEach(ele => {
          this.dynamicValidateForm.appendix.push(ele.type)
        })
        console.log(this.dynamicValidateForm)
        this.getPros()
      })
    },
    handleSelect(item) {
      console.log(item)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    submitForm(formName) {
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var sppendArr = []
          self.dynamicValidateForm.appendix.forEach(element => {
            self.appoptions.forEach(ele => {
              if (ele.type === element) {
                sppendArr.push(ele)
              }
            })
          })
          var query = {
            send_reason: this.dynamicValidateForm.send_reason,
            appendix: JSON.stringify(sppendArr),
            uids: this.uids,
            channel: this.dynamicValidateForm.channel,
            email_type: 2
          }
          if (this.emailId) {
            query['id'] = this.emailId
          }
          sendEmail(query).then(response => {
            if (response && response.code === 1) {
              self.initData()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$router.push({ path: '/email/stateList' })
            }
          })
        } else {
          this.$message.error('邮件字段不全')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
