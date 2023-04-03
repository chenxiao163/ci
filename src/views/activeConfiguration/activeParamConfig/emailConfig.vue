<style scoped>
.m-label,.m-select-label{
  padding: 5px;
  cursor: pointer;
}
/* .m-label:hover{
  background: #409eff;
  color: #fff;
} */
.m-searchkeywords{
  width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.m-popover{
  min-height: 100px;
  overflow: auto;
}
.m-saveemail{
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div>
    <el-form ref="addEmailForm" label-width="100px" :model="addEmailForm" :rules="ruleValidate">
      <el-form-item label="开始时间" prop="start">
        <el-date-picker
          v-model="addEmailForm.start"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="end">
        <el-date-picker
          v-model="addEmailForm.end"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="邮件id" prop="mailId">
        <el-input v-model="addEmailForm.mailId" style="width:180px" />
      </el-form-item>
      <el-form-item label="邮件名称" prop="title">
        <el-input v-model="addEmailForm.title" style="width:180px" />
      </el-form-item>
      <el-form-item label="邮件内容" prop="desc">
        <el-input v-model="addEmailForm.desc" style="width:180px" />
      </el-form-item>
      <el-form-item label="邮件附件">
        <el-popover
          v-model="emailVisible"
          placement="bottom"
          width="310"
        >
          <div class="m-popover">
            <div v-for="(connectItem,index) in emaiLattachmentsList" :key="index" :class="activeIndex === index?'m-select-label' : 'm-label'">
              <span>{{ connectItem.label1 }}</span>
              <el-autocomplete
                v-model="emaiLattachmentsList[index].itemId"
                popper-class="my-autocomplete"
                :fetch-suggestions="bigQuerySearch"
                placeholder="请输入内容"
                size="mini"
                style="width:150px;"
              >
                <template slot-scope="{ item }">
                  <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                </template>
              </el-autocomplete>

              <span>{{ connectItem.label2 }}</span>
              <el-input v-model="emaiLattachmentsList[index].count" size="mini" style="width:50px" />
            </div>
          </div>

          <div style="margin: 0;padding:10px 0">
            <el-button size="mini" type="primary" @click="handleNewadd">新增</el-button>
            <el-button type="primary" size="mini" @click="handleDel">删除</el-button>
            <el-button type="primary" size="mini" @click="emailVisible = false">确定</el-button>
          </div>
          <!-- <el-input slot="reference" v-model="addEmailForm.items" style="width:180px" /> -->
          <el-input slot="reference" style="width:180px" />
        </el-popover>
      </el-form-item>
    </el-form>
    <div class="m-saveemail">
      <el-button type="primary" @click="handleSaveMail('addEmailForm')">保存</el-button>
    </div>

    <SaveModal ref="svaeModalMethods" :desc="activeForm.desc" :start="activeForm.start" :end="activeForm.end" />
  </div>
</template>
<script>
import { getProduct } from '@/api/email'
import { addActiveConfig } from '@/api/activeConfiguration'
import SaveModal from '../components/saveModal.vue'
export default {
  components: {
    SaveModal
  },
  props: {
    whichConf: {
      type: String,
      default: ''
    },
    activeForm: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      emailVisible: false,
      addEmailForm: {
        start: '', // 开始时间
        end: '', // 结束时间
        mailId: '', // 邮件id
        title: '', // 邮件名称
        desc: '', // 邮件内容
        items: null // 邮件附件

      },
      emaiLattachmentsList: [// 邮件附件
        { label1: 'item', label2: '数量', itemId: '', count: '' },
        { label1: 'item', label2: '数量', itemId: '', count: '' },
        { label1: 'item', label2: '数量', itemId: '', count: '' }
      ],
      activeIndex: 0, // 选中标签的下标
      ruleValidate: {
        start: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        end: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        mailId: [
          { required: true, message: "请填写邮件id", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请填写邮件名称", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请填写邮件内容", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      },
      /** 邮件附件 自定义输入键入的模板 */
      restaurants: []
    }
  },

  watch: {
    'activeForm.start'(val) {
      this.addEmailForm.start = val
    },
    'activeForm.end'(val) {
      this.addEmailForm.end = val
    }
  },

  mounted() {
    this.getUidsItem()
  },

  methods: {
    // 保存
    handleSaveMail(form) {
      this.$refs[form].validate(validate => {
        if (validate) {
          // if (!this.whichConf) {
          //   this.$message.warning('请选择配置来源')
          //   return
          // }
          this.addEmailForm.items = this.emaiLattachmentsList.map(item => {
            return {
              itemId: item.itemId,
              count: +item.count
            }
          })
          this.addEmailForm.isItem = this.addEmailForm.items.length === 0 ? '' : 'haseItem'
          const data = {
            jsonrpc: "2.0",
            method: "bingo.login_rewards_tc",
            id: "1",
            params: {
              username: localStorage.getItem('svnUserName'),
              whichConf: this.whichConf, // this.whichConf
              start: this.addEmailForm.start,
              end: this.addEmailForm.end,
              title: this.addEmailForm.title,
              desc: this.addEmailForm.desc,
              mailId: this.addEmailForm.mailId,
              items: this.addEmailForm.items
            }

          }
          addActiveConfig(data).then(res => {
            if (res.code === 1) {
              this.$message.success('邮件配置保存成功')
              this.$refs.svaeModalMethods.showModal()
            }
          })
        } else {
          this.$message.warning('请填写完整')
        }
      })
    },

    // 获取item
    getUidsItem() {
      getProduct({ channel: 1 }).then(response => {
        if (response.code === 1) {
          this.restaurants = response.data.items.map(item => {
            return {
              name: item.name + '(' + `${item.item}` + ')',
              value: item.item
            }
          })
        }
      })
    },

    handleEmail(label, index) {
      this.activeIndex = index
      this.addEmailForm.emaiLattachments = label
    },

    bigQuerySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    // 新增
    handleNewadd() {
      this.emaiLattachmentsList.push({
        label1: 'item', label2: '数量', itemId: '', count: ''
      })
    },

    // 删除
    handleDel() {
      this.emaiLattachmentsList.pop()
    }
  }
}
</script>
