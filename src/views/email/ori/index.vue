<style>
.divLine {
  background-color: #dcdfe6;
  position: relative;
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 20px;
}
.inline-input {
  width: 200px;
  margin-right: 15px;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.chooseChannel {
  display: inline-block;
  margin-right: 30px;
}
</style>
<template>
  <div class="app-container">
    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      :rules="ruleValidate"
      label-width="100px"
      label-position="left"
    >
      <el-form-item v-if="!gameType" label="选择平台" prop="channel">
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
        <el-input
          v-model="dynamicValidateForm.uid"
          placeholder="玩家userid请用换行符隔开"
          :autosize="{ minRows: 4 }"
          style="width:450px;"
          type="textarea"
        />
      </el-form-item>
      <el-form-item v-show="isErrorUserID" label="错误userid">
        <el-input
          v-model="dynamicValidateForm.erroruid"
          style="width:250px;"
          type="textarea"
        />
      </el-form-item>
      <!-- 是否vip -->
      <el-form-item v-if="cookiesValue === 'hlsg'" prop="isVip" label="VIP">
        <el-radio v-model="dynamicValidateForm.isVip" label="1">是</el-radio>
        <el-radio v-model="dynamicValidateForm.isVip" label="0">否</el-radio>
      </el-form-item>
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
      <div class="divLine" />
      <el-form-item label="邮件标题" prop="title">
        <el-input
          v-model="dynamicValidateForm.title"
          style="width:450px;margin-right:10px"
          maxlength="50"
        />
        <span>({{
          dynamicValidateForm.title ? dynamicValidateForm.title.length : 0
        }}/50字)</span>
      </el-form-item>
      <el-form-item v-if="gameType" label="邮件类型" prop="mail_type">
        <el-select
          v-model="dynamicValidateForm.mail_type"
          placeholder="请选择"
          @change="getVal($event)"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="邮件内容" prop="content">
        <el-input
          v-model="dynamicValidateForm.content"
          :autosize="{ minRows: 6 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="附件内容">
        <div v-for="(item,index) in accessoryList" :key="index">
          <p>附件名称：{{ item.name }}, &nbsp;
            附件数量：{{ item.count }},&nbsp;
            附件id：{{ item.item }}
          </p>
        </div>
      </el-form-item>
      <el-form-item label="礼包内容">
        <div v-for="(item,index) in productList" :key="index">
          <p>礼包名称：{{ item.name }},&nbsp;
            礼包数量：{{ item.count }},&nbsp;
            礼包productId：{{ item.productId }}
          </p>
        </div>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'附件' + (index + 1)"
        prop="domains"
      >
        <el-autocomplete
          v-model="domain.value"
          class="inline-input"
          style="width:380px;"
          :fetch-suggestions="querySearch"
          placeholder="请输入附件内容"
          @select="handleSelect"
        />
        数量
        <el-input
          v-model="domain.count"
          style="width:120px;margin-left:5px"
          type="number"
        />
        <el-button
          v-if="dynamicValidateForm.domains.length > 1"
          @click.prevent="removeDomain(domain)"
        >删除</el-button>
        <el-button
          v-if="index === dynamicValidateForm.domains.length - 1"
          @click.prevent="addDomain('item')"
        >新增附件</el-button>
      </el-form-item>
      <template v-if="!gameType">
        <el-form-item
          v-for="(product, index) in dynamicValidateForm.products"
          :key="product.key"
          :label="'礼包' + (index + 1)"
          prop="products"
        >
          <el-autocomplete
            v-model="product.name"
            class="inline-input"
            style="margin-right:0px"
            :fetch-suggestions="querySearchs"
            placeholder="请输入礼包内容"
            @select="handleSelects($event, index)"
          />
          <el-input
            v-model="product.productId"
            style="width:170px;margin-left:5px;margin-right:15px"
            disabled
          />
          数量
          <el-input
            v-model="product.count"
            style="width:120px;margin-left:5px"
            type="number"
          />
          <el-button
            v-if="dynamicValidateForm.products.length > 1"
            @click.prevent="removeGifts(product)"
          >删除</el-button>
          <el-button
            v-if="index === dynamicValidateForm.products.length - 1"
            @click.prevent="addGifts('product')"
          >新增礼包</el-button>
        </el-form-item>
      </template>

      <el-form-item label="发放原因" prop="send_reason">
        <el-input
          v-model="dynamicValidateForm.send_reason"
          :autosize="{ minRows: 2 }"
          type="textarea"
        />
      </el-form-item>
      <el-form-item v-if="gameType" label="开始时间" prop="send_mailtyp_time">
        <el-date-picker
          v-model="dynamicValidateForm.send_mailtyp_time"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
          value-format="yyyy-MM-dd HH-mm-ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="!isManage"
          :loading="commitLoading"
          @click="submitForm('dynamicValidateForm')"
        >提交审批</el-button>
        <el-button type="primary" :disabled="!isManage" @click="saveTemplate()">保存模板</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getChannelOptions } from "@/api/userMange";
import Cookies from 'js-cookie'
import {
  getProduct,
  sendEmail,
  emailDetai,
  getGifts,
  getEmailtypes,
  getMailTemplate,
  selectMailTemplate,
  saveMailTemplate
} from "@/api/email";
import { mapGetters } from "vuex";
export default {
  name: "Ori",
  data() {
    var validateDomains = (rule, value, callback) => {
      if (value.length === 0) {
        callback();
      } else {
        this.dynamicValidateForm.domains.forEach(element => {
          if (element.value) {
            if (this.products.indexOf(element.value) === -1) {
              callback(new Error("请输入正确的附件!"));
            } else if (!element.count || element.count === 0) {
              callback(new Error("请输入正确的附件数量!"));
            }
          }
        });
        callback();
      }
    };
    var validateProducts = (rule, value, callback) => {
      if (value.length === 0) {
        callback();
      } else {
        this.dynamicValidateForm.products.forEach(element => {
          if (element.name) {
            if (this.gifts.indexOf(element.name) === -1) {
              callback(new Error("请输入正确的礼包!"));
            } else if (!element.count || element.count === 0) {
              callback(new Error("请输入正确的礼包数量!"));
            }
          }
        });
        callback();
      }
    };
    var validateUid = (rule, value, callback) => {
      if (!value) {
        callback(new Error("玩家userId不能为空"));
      } else {
        if (value.indexOf(",") > -1 || value.indexOf("，") > -1) {
          callback(new Error("玩家userId格式错误,多个uid用回车键隔开!"));
        } else {
          this.uids = value.split("\n");
          callback();
        }
      }
    };
    return {
      accessoryList: [],
      productList: [],
      tmpOptions: [
      ],
      isErrorUserID: false,
      cookiesValue: null,
      commitLoading: false,
      isManage: false,
      flag: true,
      products: [],
      restaurants: [],
      myrestaurants: [],
      gifts: [],
      itemType: "item",
      typeOptions: [],
      dynamicValidateForm: {
        title: "",
        content: "",
        mail_type: "",
        mail_type_desc: "",
        channel: "",
        uid: "",
        erroruid: "",
        uids: [],
        isVip: "0", // 是否vip
        tem: "",

        domains: [
          {
            value: "",
            count: "",
            item: ""
          }
        ],
        products: [
          {
            name: "",
            count: "",
            productId: ""
          }
        ],
        send_reason: "",
        send_mailtyp_time: "",
        emailId: null
      },
      channelOptions: [],
      ruleValidate: {
        title: [
          { required: true, message: "请输入邮件标题", trigger: "blur" },
          {
            type: "string",
            min: 2,
            message: "邮件标题不少于2个字符",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "请输入邮件内容", trigger: "blur" },
          {
            type: "string",
            min: 5,
            message: "邮件内容最少5个字符",
            trigger: "blur"
          }
        ],
        uid: [
          { required: true, message: "请输入玩家userId", trigger: "blur" },
          { validator: validateUid, trigger: "blur" }
        ],
        isVip: [
          { required: true, message: '', trigger: 'blur' },
          { type: 'string', required: true, message: '请选择是否VIP', trigger: 'change' }
        ],
        channel: [
          { required: true, message: "请选择平台", trigger: ["blur", "change"] }
        ],
        domains: [
          { required: false, message: "请输入玩家附件", trigger: "blur" },
          { validator: validateDomains, trigger: "blur" }
        ],
        products: [
          { required: false, message: "请输入玩家礼包", trigger: "blur" },
          { validator: validateProducts, trigger: "blur" }
        ],
        send_reason: [
          { required: true, message: "请输入发放原因", trigger: "blur" },
          {
            type: "string",
            min: 2,
            message: "发放原因不少于2个字符",
            trigger: "blur"
          }
        ],
        send_mailtyp_time: [
          {
            required: true,
            message: "请输入开始时间",
            trigger: ["change", "blur"]
          }
        ],
        mail_type: [
          {
            required: true,
            message: "请选择邮件类型",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["mypermissions"]),
    gameType() {
      return this.$store.state.app.gameName.includes("捕鱼");
    }
  },
  watch: {
    "dynamicValidateForm.channel"(val) {
      if (!this.gameType) {
        this.getPros();
      }
    },
    $route(val) {
      if (this.$route.name === "Ori") {
        if (this.$route.query) {
          if (this.$route.query) {
            this.emailId = this.$route.query.id || null;
            if (this.emailId) {
              this.getData();
            }
          }
        } else {
          this.initData();
        }
      }
    }
  },
  created() {
    if (this.mypermissions.indexOf("定向邮件") > -1) {
      this.isManage = true;
    }
    getMailTemplate({}).then(res => {
      if (res.code === 1) {
        this.tmpOptions = []
        let data = []
        data = res.result
        this.tmpOptions = data.filter(item => {
          return item.mail_type === "定向邮件"
        })
        this.tmpOptions.unshift({
          mail_title: "",
          _id: ""
        })
      }
    })
    if (this.gameType) {
      getEmailtypes({}).then(response => {
        if (response && response.code === 1) {
          this.typeOptions = response.data;
        }
      });
      this.getPros();
    } else {
      getChannelOptions({}).then(response => {
        if (response && response.code === 1) {
          this.channelOptions = response.data;
        }
      });
    }
    if (this.$route.query) {
      this.emailId = this.$route.query.id || null;
      if (this.emailId) {
        this.getData();
      }
    }
  },
  mounted() {
    this.cookiesValue = Cookies.get("hl_gameMark")
  },
  methods: {
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
            this.productList = JSON.parse(resData.products)
          }
        })
      } else {
        this.dynamicValidateForm.title = ""
        this.dynamicValidateForm.content = ""
        this.dynamicValidateForm.send_reason = ""
        this.dynamicValidateForm.channel = ""
        // this.dynamicValidateForm.isVip = ""
        this.accessoryList = []
        this.productList = []
      }
    },
    saveTemplate() {
      const sppendArr = []
      var self = this
      var productArr = [];
      self.dynamicValidateForm.products.forEach(element => {
        if (JSON.stringify(element) !== "{}" && element.name) {
          productArr.push(element);
        }
      });
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
      const data = {
        mail_type: "定向邮件",
        mail_creator: this.$store.state.user.name,
        appendix: JSON.stringify(sppendArr),
        channel: this.dynamicValidateForm.channel,
        is_vip: +this.dynamicValidateForm.isVip,
        mail_title: this.dynamicValidateForm.title,
        mail_content: this.dynamicValidateForm.content,
        send_why: this.dynamicValidateForm.send_reason,
        products: JSON.stringify(productArr)
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
    },
    initData() {
      this.flag = false;
      this.products = [];
      this.gifts = [];
      this.dynamicValidateForm = {
        title: "",
        content: "",
        channel: "",
        mail_type: "",
        mail_type_desc: "",
        uid: "",
        uids: [],
        domains: [
          {
            value: "",
            count: "",
            item: ""
          }
        ],
        products: [
          {
            name: "",
            count: "",
            productId: ""
          }
        ],
        send_reason: "",
        send_mailtyp_time: "",
        emailId: null
      };
      this.$nextTick(() => {
        this.$refs["dynamicValidateForm"].clearValidate();
      });
    },
    getPros() {
      var self = this;
      getProduct({ channel: this.dynamicValidateForm.channel }).then(
        response => {
          if (response && response.code === 1) {
            const myProducts = response.data.items;
            self.restaurants = [];
            if (myProducts && myProducts.length) {
              myProducts.forEach(element => {
                var obj = {};
                for (var key in element) {
                  if (key === "name") {
                    obj["value"] = element[key] + "(" + element["item"] + ")";
                  } else {
                    obj[key] = element[key];
                  }
                }
                self.restaurants.push(obj);
                self.products.push(element.name + "(" + element.item + ")");
              });
            }
          }
        }
      );
      getGifts({ channel: this.dynamicValidateForm.channel }).then(response => {
        if (response && response.code === 1) {
          const myGifts = response.data.products;
          self.myrestaurants = [];
          if (myGifts && myGifts.length) {
            myGifts.forEach(element => {
              var obj = {};
              for (var key in element) {
                if (key === "name") {
                  obj["value"] = element[key];
                } else {
                  obj[key] = element[key];
                }
              }
              self.myrestaurants.push(obj);
              self.gifts.push(element.name);
            });
          }
        }
      });
    },
    getVal(value) {
      this.typeOptions.forEach(ele => {
        if (ele.value === value) {
          this.dynamicValidateForm.mail_type_desc = ele.desc;
        }
      });
    },
    querySearch(queryString, cb) {
      if (this.products.length > 0) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      } else {
        if (!this.dynamicValidateForm.channel && !this.gameType) {
          this.$message({
            message: "请先选择平台",
            type: "error"
          });
        } else {
          this.$message({
            message: "无附件数据",
            type: "warning"
          });
        }
      }
    },
    querySearchs(queryString, cb) {
      if (this.gifts.length > 0) {
        var myrestaurants = this.myrestaurants;
        var results = queryString
          ? myrestaurants.filter(this.createFilter(queryString))
          : myrestaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      } else {
        if (!this.dynamicValidateForm.channel && !this.gameType) {
          this.$message({
            message: "请先选择平台",
            type: "error"
          });
        } else {
          this.$message({
            message: "无礼包数据",
            type: "warning"
          });
        }
      }
    },
    getData() {
      var query = { id: this.emailId };
      emailDetai(query).then(response => {
        var mydata = response.data;
        this.dynamicValidateForm.mail_type = mydata.mail_type;
        this.dynamicValidateForm.send_mailtyp_time = mydata.send_mailtyp_time;
        this.dynamicValidateForm.mail_type_desc = mydata.mail_type_desc;
        this.dynamicValidateForm.title = mydata.title;
        this.dynamicValidateForm.content = mydata.content;
        this.dynamicValidateForm.send_reason = mydata.send_reason;
        this.dynamicValidateForm.channel = mydata.channel;
        this.dynamicValidateForm.uid = mydata.uids.join("\n");
        this.dynamicValidateForm.domains = [];
        this.dynamicValidateForm.products = [];
        this.getPros();
        mydata.appendix.forEach(element => {
          var object = {};
          for (var key in element) {
            if (key === "name") {
              object.value = element[key];
            } else {
              object[key] = element[key];
            }
          }
          this.dynamicValidateForm.domains.push(object);
        });
        mydata.products.forEach(element => {
          this.dynamicValidateForm.products.push(element);
        });
      });
    },
    handleSelect(item) {
      console.log(item);
    },
    handleSelects(item, i) {
      this.dynamicValidateForm.products[i].productId = item.productId;
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    submitForm(formName) {
      var self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var sppendArr = [];
          var productArr = [];
          self.dynamicValidateForm.products.forEach(element => {
            if (JSON.stringify(element) !== "{}" && element.name) {
              productArr.push(element);
            }
          });
          self.dynamicValidateForm.domains.forEach(element => {
            var object = {};
            for (var key in element) {
              if (key === "value") {
                self.restaurants.forEach(ele => {
                  if (ele.value === element.value) {
                    object.item = ele.item;
                    object.count = element.count;
                    object.name = element.value;
                  }
                });
              }
            }
            if (JSON.stringify(object) !== "{}") {
              sppendArr.push(object);
            }
          });
          if (this.accessoryList) {
            for (let i = 0; i < this.accessoryList.length; i++) {
              sppendArr.push(this.accessoryList[i])
            }
          }
          if (this.productList) {
            for (let i = 0; i < this.productList.length; i++) {
              productArr.push(this.productList[i])
            }
          }
          this.commitLoading = true;
          var query = {
            // method: "sendMail",
            title: this.dynamicValidateForm.title,
            content: this.dynamicValidateForm.content,
            send_reason: this.dynamicValidateForm.send_reason,
            appendix: JSON.stringify(sppendArr),
            products: JSON.stringify(productArr),
            uids: this.uids,
            // user_type: +this.dynamicValidateForm.isVip,
            channel: this.dynamicValidateForm.channel,
            email_type: 1
          };
          if (this.cookiesValue === 'hlsg') {
            query.user_type = +this.dynamicValidateForm.isVip
          }
          if (this.gameType) {
            query["mail_type"] = this.dynamicValidateForm.mail_type;
            query[
              "send_mailtyp_time"
            ] = this.dynamicValidateForm.send_mailtyp_time;
            query["mail_type_desc"] = this.dynamicValidateForm.mail_type_desc;
          }
          if (this.emailId) {
            query["id"] = this.emailId;
          }
          sendEmail(query).then(response => {
            if (response.code === 0) {
              this.dynamicValidateForm.erroruid = response.data
              this.$message.error(response.msg);
              this.isErrorUserID = true
            }
            this.commitLoading = false;
            if (response && response.code === 1) {
              self.initData();
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.$router.push({ path: "/email/approval" });
            }
          })
        } else {
          this.$message.error("邮件字段不全");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dynamicValidateForm.domains = [{ value: "", count: "", item: "" }];
      this.dynamicValidateForm.products = [
        { name: "", count: "", productId: "" }
      ];
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain(type) {
      this.itemType = type;
      this.dynamicValidateForm.domains.push({
        value: "",
        count: "",
        item: Date.now()
      });
    },
    removeGifts(item) {
      var index = this.dynamicValidateForm.products.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.products.splice(index, 1);
      }
    },
    addGifts(type) {
      this.itemType = type;
      this.dynamicValidateForm.products.push({
        name: "",
        count: "",
        productId: ""
      });
    }
  }
};
</script>
