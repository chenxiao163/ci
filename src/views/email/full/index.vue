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

    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" :rules="ruleValidate" label-width="80px" label-position="left">
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
      <el-form-item label="选择区服" prop="type">
        <el-checkbox-group v-model="types">
          <el-checkbox label="全选" name="type" :disabled="products.length === 0" />
        </el-checkbox-group>

        <el-checkbox-group v-model="dynamicValidateForm.type">
          <el-checkbox v-for="(uid, index) in uids" :key="index" :label="uid+'区'" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <!-- 是否vip -->
      <el-form-item v-if="cookiesValue==='hlsg'" prop="isVip" label="VIP">
        <el-radio v-model="dynamicValidateForm.isVip" label="1">是</el-radio>
        <el-radio v-model="dynamicValidateForm.isVip" label="0">否</el-radio>
      </el-form-item>
      <div class="divLine" />
      <!-- 邮件模板 -->
      <el-form-item label="邮件模板">
        <el-select v-model="dynamicValidateForm.tem" filterable placeholder="请选择" @change="getTemId">
          <el-option
            v-for="item in tmpOptions"
            :key="item._id"
            :label="item.mail_title"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <!-- 定时发送 -->
      <!-- <el-form>
        <el-form-item label="定时发送" prop="cycleType">
          <el-radio v-model="cycleType" label="custom">是</el-radio>
          <el-radio v-model="cycleType" label="everyday">否</el-radio>
        </el-form-item>
        <el-form-item v-if="cycleType==='custom'" label="有效时间" prop="datetime">
          <el-date-picker
            v-model="datetime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间"
            default-time="00:00:00"
          />
        </el-form-item>
      </el-form> -->
      <br>
      <el-form-item label="邮件标题" prop="title">
        <el-input v-model="dynamicValidateForm.title" style="width:450px;margin-right:10px" maxlength="50" />
        <span>({{ dynamicValidateForm.title?dynamicValidateForm.title.length:0 }}/50字)</span>
      </el-form-item>
      <el-form-item label="邮件内容" prop="content">
        <el-input v-model="dynamicValidateForm.content" :autosize="{ minRows: 6 }" type="textarea" />
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.item"
        :label="'附件' + (index+1)"
        prop="domains"
      >
        <el-autocomplete
          v-model="domain.value"
          style="width:450px;"
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="请输入附件内容"
          @select="handleSelect"
        />
        数量
        <el-input v-model="domain.count" style="width:200px;margin-left:5px" type="number" />
        <el-button v-if="dynamicValidateForm.domains.length>1" @click.prevent="removeDomain(domain)">删除</el-button>
        <el-button v-if="index===dynamicValidateForm.domains.length-1" @click.prevent="addDomain('item')">新增</el-button>
        <!-- <el-button v-if="index===dynamicValidateForm.domains.length-1" @click.prevent="addDomain('product')">新增礼包</el-button> -->
      </el-form-item>
      <el-form-item label="附件内容">
        <div v-for="(item,index) in accessoryList" :key="index">
          <p>
            附件名称：{{ item.name }}
            附件数量：{{ item.count }}
            附件id：{{ item.item }}
          </p>
        </div>
      </el-form-item>
      <el-form-item label="发放原因" prop="send_reason">
        <el-input v-model="dynamicValidateForm.send_reason" :autosize="{ minRows: 2 }" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="!isManage" @click="submitForm('dynamicValidateForm')">提交审批</el-button>
        <el-button type="primary" :disabled="!isManage" @click="saveTemplate()">保存模板</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getChannelOptions } from '@/api/userMange'
import { getProduct, sendEmail, emailDetai, getUids, saveMailTemplate, selectMailTemplate, getMailTemplate } from '@/api/email'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
export default {
  name: 'Full',
  data() {
    var validateDomains = (rule, value, callback) => {
      if (value.length === 0) {
        callback()
      } else {
        this.dynamicValidateForm.domains.forEach(element => {
          if (element.value) {
            if (this.products.indexOf(element.value) === -1) {
              callback(new Error('请输入正确的附件!'))
            } else if (!element.count || element.count === 0) {
              callback(new Error('请输入正确的附件数量!'))
            }
          }
        })
        callback()
      }
    }
    return {
      accessoryList: [],

      tmpOptions: [
      ],
      cookiesValue: null,
      commmitLoading: false,
      isManage: false,
      flag: true,
      flags: true,
      types: [],
      itemType: 'item',
      products: [],
      uids: [],
      uidLen: null,
      dynamicValidateForm: {
        channel: '',
        title: '',
        content: '',
        restaurants: [],
        type: [],
        isVip: "0", // 是否vip
        tem: "",
        domains: [
          {
            value: '',
            count: '',
            item: ''
          }
        ],
        send_reason: '',
        myProducts: [],
        emailId: null
      },
      channelOptions: [

      ],
      ruleValidate: {
        title: [
          { required: true, message: '请输入邮件标题', trigger: 'blur' },
          { type: 'string', min: 2, message: '邮件标题不少于2个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入邮件内容', trigger: 'blur' },
          { type: 'string', min: 5, message: '邮件内容最少5个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择区服', trigger: 'blur' },
          { type: 'array', required: true, message: '请至少选择一个区服', trigger: 'change' }
        ],
        isVip: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', required: true, message: '请选择是否VIP', trigger: 'change' }
        ],
        channel: [
          { required: true, message: '请选择平台', trigger: ['blur', 'change'] }
        ],
        domains: [
          { required: false, message: '请输入附件', trigger: 'blur' },
          { validator: validateDomains, trigger: 'blur' }
        ],
        send_reason: [
          { required: true, message: '请输入发放原因', trigger: 'blur' },
          { type: 'string', min: 2, message: '发放原因不少于2个字符', trigger: 'blur' }
        ]
      },
      cycleType: [
        { required: true, message: '请选择周期', trigger: 'blur' }
      ],
      datetime: ""
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions', 'name'
    ])
  },
  watch: {
    types(val) {
      if (this.flags) {
        if (this.uidLen) {
          if (val.length > 0 && this.dynamicValidateForm.type && this.dynamicValidateForm.type.length < this.uidLen) {
            // this.uids.forEach
            this.dynamicValidateForm.type = []
            this.uids.forEach(element => {
              this.dynamicValidateForm.type.push(element + '区')
            })
          } else if (val.length === 0 && this.dynamicValidateForm.type && this.dynamicValidateForm.type.length === this.uidLen) {
            this.dynamicValidateForm.type = []
          }
        } else {
          if (this.flag) {
            this.$message({
              message: '请先选择平台',
              type: 'error'
            })
          }
        }
      }
    },
    'dynamicValidateForm.type'(val) {
      if (this.flags) {
        if (val.length === this.uidLen && this.types.length === 0) {
          this.types = ['全选']
        } else if (val.length < this.uidLen && this.types.length > 0) {
          this.types = []
        }
      }
    },
    'dynamicValidateForm.channel'(val) {
      // if (this.flags) {
      this.getUids('empty')
      this.getPros()
      // }
    },
    $route(val) {
      if (this.$route.query) {
        this.flags = false
        this.emailId = this.$route.query.id || null
        if (this.emailId) {
          this.getData()
        }
      } else {
        this.initData()
      }
    }
  },
  created() {
    if (this.mypermissions.indexOf('全服邮件') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
    if (this.$route.query) {
      this.flags = false
      this.emailId = this.$route.query.id || null
      if (this.emailId) {
        this.getData()
      }
    }
    getMailTemplate({}).then(res => {
      if (res.code === 1) {
        this.tmpOptions = []
        let data = []
        data = res.result
        this.tmpOptions = data.filter(item => {
          return item.mail_type === "全服邮件"
        })
        this.tmpOptions.unshift({
          mail_title: "",
          _id: ""
        })
      }
    })
  },

  mounted() {
    this.cookiesValue = Cookies.get("hl_gameMark")
  },

  methods: {
    handleSelect() {
    },
    getTemId(val) {
      if (val) {
        const data = {
          _id: val
        }
        selectMailTemplate(data).then(res => {
          if (res.code === 1) {
            const resData = res.result
            this.dynamicValidateForm.title = resData.mail_title
            this.dynamicValidateForm.content = resData.mail_content
            this.dynamicValidateForm.send_reason = resData.send_why
            this.dynamicValidateForm.channel = resData.channel_id
            // this.dynamicValidateForm.isVip = resData.is_vip ? 0 : "0" || resData.is_vip ? 1 : "1"
            this.accessoryList = JSON.parse(resData.appendix)
          }
        })
      } else {
        this.dynamicValidateForm.title = ""
        this.dynamicValidateForm.content = ""
        this.dynamicValidateForm.send_reason = ""
        this.dynamicValidateForm.channel = ""
        // this.dynamicValidateForm.isVip = ""
        this.accessoryList = []
      }
    },
    initData() {
      this.flag = false
      this.types = []
      this.products = []
      this.uids = []
      this.uidLen = null
      this.dynamicValidateForm = {
        title: '',
        content: '',
        channel: '',
        restaurants: [],
        type: [],
        domains: [
          {
            value: '',
            count: '',
            item: ''
          }
        ],
        send_reason: '',
        myProducts: [],
        emailId: null
      }
      this.$refs['dynamicValidateForm'].clearValidate()
    },
    getPros() {
      var self = this
      getProduct({ channel: this.dynamicValidateForm.channel }).then(response => {
        self.myProducts = response.data.items
        self.restaurants = []
        self.myProducts.forEach(element => {
          var obj = {}
          for (var key in element) {
            if (key === "name") {
              obj["value"] = element[key] + "(" + element["item"] + ")";
            } else {
              obj[key] = element[key];
            }
          }
          self.restaurants.push(obj);
          self.products.push(element.name + "(" + element.item + ")");
        })
      })
    },
    querySearch(queryString, cb) {
      if (this.products.length > 0) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
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
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    getData() {
      var query = { id: this.emailId }
      emailDetai(query).then(response => {
        this.types = []
        this.dynamicValidateForm.type = []
        var mydata = response.data
        this.dynamicValidateForm.channel = mydata.channel
        this.dynamicValidateForm.title = mydata.title
        this.dynamicValidateForm.content = mydata.content
        this.dynamicValidateForm.send_reason = mydata.send_reason
        this.getPros()
        this.dynamicValidateForm.domains = []

        mydata.appendix.forEach(element => {
          var object = {}
          for (var key in element) {
            if (key === 'name') {
              object.value = element[key]
            } else {
              object[key] = element[key]
            }
          }
          this.dynamicValidateForm.domains.push(object)
        })
        this.getUids(mydata.serverid)
      })
    },
    getUids(number) {
      var self = this
      getUids({ channel: this.dynamicValidateForm.channel }).then(response => {
        if (response.code === 1) {
          self.uids = response.data
          self.uidLen = self.uids.length
          if (number === 'empty') {
            self.types = []
            self.dynamicValidateForm.type = []
          } else if (number.length === 1 && number.indexOf('-1') > -1) {
            self.types = ['全选']
            self.uids.forEach(element => {
              self.dynamicValidateForm.type.push(element + '区')
            })
          } else {
            number.forEach(element => {
              self.dynamicValidateForm.type.push(element + '区')
            })
          }
          self.flags = true
        }
      })
    },
    submitForm(formName) {
      // if (this.cycleType === "custom") {
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var sppendArr = []
          self.dynamicValidateForm.domains.forEach(element => {
            var object = {}
            for (var key in element) {
              if (key === 'value') {
                self.restaurants.forEach(ele => {
                  if (ele.value === element.value) {
                    object.item = ele.item
                    object.count = element.count
                    object.name = element.value
                  }
                })
              }
            }
            sppendArr.push(object)
          })
          var serverids = []
          if (this.types.length === 1) {
            serverids = ['-1']
          } else {
            this.dynamicValidateForm.type.forEach(ele => {
              serverids.push(ele.substring(0, ele.length - 1))
            })
          }
          this.commmitLoading = true;
          if (this.accessoryList) {
            for (let i = 0; i < this.accessoryList.length; i++) {
              sppendArr.push(this.accessoryList[i])
            }
          }
          var query = {
            // method: "sendMail",
            channel: this.dynamicValidateForm.channel,
            serverid: serverids,
            title: this.dynamicValidateForm.title,
            content: this.dynamicValidateForm.content,
            // user_type: +this.dynamicValidateForm.isVip,
            send_reason: this.dynamicValidateForm.send_reason,
            appendix: JSON.stringify(sppendArr),
            email_type: 0,
            send_ts: this.datetime / 1000
          }
          console.log(query);
          if (this.cookiesValue === "hlsg") {
            query.user_type = +this.dynamicValidateForm.isVip
          }
          if (this.emailId) {
            query['id'] = this.emailId
          }

          sendEmail(query).then(response => {
            this.commmitLoading = false;
            if (response.code === 1) {
              self.initData()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.$router.push({ path: '/email/approval' })
            }
          })
        } else {
          this.$message.error('邮件字段不全')
        }
      })
      // } else if (this.cycleType === "everyday") {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     var sppendArr = []
      //     self.dynamicValidateForm.domains.forEach(element => {
      //       var object = {}
      //       for (var key in element) {
      //         if (key === 'value') {
      //           self.restaurants.forEach(ele => {
      //             if (ele.value === element.value) {
      //               object.item = ele.item
      //               object.count = element.count
      //               object.name = element.value
      //             }
      //           })
      //         }
      //       }
      //       sppendArr.push(object)
      //     })
      //     var serverids = []
      //     if (this.types.length === 1) {
      //       serverids = ['-1']
      //     } else {
      //       this.dynamicValidateForm.type.forEach(ele => {
      //         serverids.push(ele.substring(0, ele.length - 1))
      //       })
      //     }
      //     this.commmitLoading = true;
      //     var query = {
      //       // method: "sendMail",
      //       channel: this.dynamicValidateForm.channel,
      //       serverid: serverids,
      //       title: this.dynamicValidateForm.title,
      //       content: this.dynamicValidateForm.content,
      //       // user_type: +this.dynamicValidateForm.isVip,
      //       send_reason: this.dynamicValidateForm.send_reason,
      //       appendix: JSON.stringify(sppendArr),
      //       email_type: 0

      //     }
      //     console.log(query);
      //     if (this.cookiesValue === "hlsg") {
      //       query.user_type = +this.dynamicValidateForm.isVip
      //     }
      //     if (this.emailId) {
      //       query['id'] = this.emailId
      //     }

      //     // sendEmail(query).then(response => {
      //     //   this.commmitLoading = false;
      //     //   if (response.code === 1) {
      //     //     self.initData()
      //     //     this.$message({
      //     //       message: '操作成功',
      //     //       type: 'success'
      //     //     })
      //     //     this.$router.push({ path: '/email/approval' })
      //     //   }
      //     // })
      //   } else {
      //     this.$message.error('邮件字段不全')
      //   }
      // })

      // }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain(type) {
      this.itemType = type
      this.dynamicValidateForm.domains.push({
        value: '',
        count: '',
        item: Date.now()
      })
    },
    saveTemplate() {
      var self = this
      const sppendArr = []
      self.dynamicValidateForm.domains.forEach(element => {
        var object = {}
        for (var key in element) {
          if (key === 'value') {
            self.restaurants.forEach(ele => {
              if (ele.value === element.value) {
                object.item = ele.item
                object.count = element.count
                object.name = element.value
              }
            })
          }
        }
        sppendArr.push(object)
      })
      if (this.accessoryList) {
        for (let i = 0; i < this.accessoryList.length; i++) {
          sppendArr.push(this.accessoryList[i])
        }
      }
      const data = {
        mail_type: "全服邮件",
        mail_creator: this.$store.state.user.name,
        channel: this.dynamicValidateForm.channel,
        // is_vip: +this.dynamicValidateForm.isVip,
        mail_title: this.dynamicValidateForm.title,
        mail_content: this.dynamicValidateForm.content,
        send_why: this.dynamicValidateForm.send_reason,
        appendix: JSON.stringify(sppendArr),
        products: ""
      }
      this.$confirm('确定将当前邮件内容保存为模板吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveMailTemplate(data).then(res => {
          if (res.code === 1) {
            this.$message({
              message: '邮件模板保存成功',
              type: 'success'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存邮件模板'
        });
      });
    }
  }
}
</script>
