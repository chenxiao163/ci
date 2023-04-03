<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
    .logform .el-date-editor span.el-range-separator{
      padding: 0;
    }
</style>
<template>
  <div class="app-container">
    <div>
      <el-form ref="form" :inline="true" :model="form" class="demo-form-inline logform" :rules="ruleValidate">
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
        <el-form-item label="创建人" prop="searchUid">
          <el-input v-model="form.searchUid" placeholder="请输入创建人" />
        </el-form-item>
        <el-form-item label="邮件标题" prop="searchUid">
          <el-input v-model="form.emailTitle" placeholder="请输入邮件标题" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:15px" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list.slice((page-1)*limit,page*limit)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="创建人" width="220" align="center" prop="mail_creator" />
      <el-table-column width="220" label="创建时间" align="center" prop="mail_create_time">
        <template slot-scope="scope">
          <span>
            {{
              (scope.row.mail_create_time * 1000) | dateformat("YYYY-MM-DD HH:mm:ss")
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮件标题" width="220" prop="mail_title" />
      <el-table-column label="邮件类型" align="center" prop="mail_type" width="220" />
      <el-table-column label="发送平台" width="220" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channel_id === 1 ? "手Q": scope.row.channel_id === 2 ? "微信": "前置服" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件" width="220" align="center" prop="appendix" />
      <el-table-column label="礼包" width="220" align="center" prop="products" />
      <!-- <el-table-column label="模板详情" width="220" align="center" prop="client_id" /> -->
      <el-table-column label="操作" align="center" prop="data">
        <template slot-scope="scope">
          <el-button type="text" @click="modification(scope.row)">修改</el-button>
          <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="limit"
        layout="total,sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="修改模板"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="type">
        <p v-if="type.email_create">创建人：{{ type.email_create }}</p>
        <p v-if="type.mail_create_time ">创建时间：{{ (type.mail_create_time * 1000) | dateformat("YYYY-MM-DD HH:mm:ss" ) }}</p>
        <p v-if="type.mail_type">邮件类型：{{ type.mail_type }}</p>
        <p v-if="type.channel_id">发送平台：{{ type.channel_id === 1 ? "手Q": type.channel_id === 2 ? "微信": "前置服" }}</p>
        <p v-if="type.appendix">附件内容：{{ type.appendix }}</p>
        <p v-if="type.products">礼包内容：{{ type.products }}</p>
        <!-- <p>vip：{{ type.is_vip ===1 ? "是" : "否" }}</p> -->
        <el-form-item label="发送原因">
          <el-input v-model="type.send_why" />
        </el-form-item>
        <el-form-item label="邮件标题">
          <el-input v-model="type.email_title" />
        </el-form-item>
        <el-form-item label="邮件内容">
          <el-input v-model="type.mail_content" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTmp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMailTemplate, deleteMailTemplate, updateMailTemplate } from '@/api/email'
import { getChannelOptions } from '@/api/userMange'
export default {
  name: 'Recharge',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      type: {
        email_create: "",
        mail_create_time: "",
        mail_type: "",
        channel_id: "",
        email_title: "",
        mail_content: "",
        appendix: "",
        products: "",
        is_vip: "",
        send_why: "",
        _id: "",
        startTime: "",
        endTime: ""
      },
      dialogVisible: false,
      searchLoading: false,
      page: 1,
      temUid: '',
      first: [],
      temRoleid: '',
      limit: 10,
      count: null,
      list: [
      ],
      apprstate: '',
      listLoading: false,
      form: {
        channel: '',
        searchUid: '',
        searchType: '-1',
        emailTitle: ""
      },
      channelOptions: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timeValue: "",
      ruleValidate: {
      }
    }
  },
  created() {
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
    this.onSearch()
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    onSearch() {
      const data = {
        channel: this.form.channel,
        mail_st: this.form.startTime / 1000,
        mail_et: this.form.endTime / 1000,
        mail_creator: this.form.searchUid,
        mail_title: this.form.emailTitle
      }
      getMailTemplate(data).then(res => {
        this.list = []
        this.list = res.result
        this.count = this.list.length
      })
    },
    modification(row) {
      this.dialogVisible = true
      this.type.email_create = row.mail_creator
      this.type.mail_content = row.mail_content
      this.type.mail_create_time = row.mail_create_time
      this.type.mail_type = row.mail_type
      this.type.channel_id = row.channel_id
      this.type.email_title = row.mail_title
      this.type.appendix = row.appendix
      this.type.products = row.products
      this.type.is_vip = row.is_vip
      this.type.send_why = row.send_why
      this.type._id = row._id
    },
    updateTmp() {
      const data = {
        channel: this.type.channel_id,
        mail_title: this.type.email_title,
        mail_content: this.type.mail_content,
        is_vip: this.type.is_vip,
        send_why: this.type.send_why,
        appendix: this.type.appendix,
        products: this.type.products,
        _id: this.type._id
      }
      updateMailTemplate(data).then(res => {
        if (res.code === 1) {
          this.$message({
            message: '模板已修改成功',
            type: 'success'
          });
        }
        this.dialogVisible = false
        this.onSearch()
      })
    },
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const data = {
          channel: this.form.channel,
          _id: row._id
        }
        const res = await deleteMailTemplate(data)
        if (res.code === 1) {
          this.$message({
            message: '模板已删除成功',
            type: 'success'
          });
          this.onSearch()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

