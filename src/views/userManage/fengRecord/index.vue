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
      <el-form ref="form" :inline="true" :model="form" :rules="ruleValidate" class="demo-form-inline logform">
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
        <el-form-item label="userid">
          <el-input v-model="form.searchUid" placeholder="单行输入" />
        </el-form-item>
        <el-form-item label="操作内容" prop="typ">
          <el-select v-model="form.typ" placeholder="请选择">
            <el-option
              v-for="item in typOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="操作人" prop="searchRoleid">
          <el-input v-model="form.searchRoleid" placeholder="单行输入" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSearch('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="平台" width="120" align="center" prop="channelName" />
      <el-table-column width="250" label="uid" align="center" prop="uid" />
      <el-table-column align="center" label="操作内容" width="180" prop="opt_content" />
      <el-table-column label="原因" align="center" prop="opt_reason" />
      <el-table-column label="期限(天)" width="120" align="center" prop="opt_expiration" />
      <el-table-column label="封禁次数" align="center" prop="current_close_account" />
      <el-table-column label="操作人" align="center" prop="user" />
      <el-table-column label="操作时间" align="center" prop="update_time" />

    </el-table>
    <div class="block">

      <el-pagination
        v-show="limit>0"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100, 200, 500 ]"
        :page-size="limit"
        layout="total,sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>

<script>
import { fengRecord, getChannelOptions } from '@/api/userMange'

export default {
  name: 'FengRecord',
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
      currentPage: 1,
      temUid: '',
      temRoleid: '',
      limit: 10,
      count: null,
      list: null,
      apprstate: '',
      listLoading: false,
      form: {
        typ: 2,
        channel: '',
        searchUid: '',
        searchRoleid: '',
        searchType: '-1'
      },
      channelOptions: [

      ],
      typOptions: [
        {
          value: 2,
          label: '封号记录'
        },
        {
          value: 1,
          label: '禁言记录'
        }
      ],
      ruleValidate: {
        channel: [
          { required: true, message: '请选择平台', trigger: ['blur', 'change'] }
        ],
        searchUid: [
          { required: true, message: '请输入userid', trigger: ['blur', 'change'] }
        ],
        typ: [
          { required: true, message: '请选择操作内容', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  watch: {
    'form.typ'() {
      this.fetchData()
    }
  },
  created() {
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
  },
  methods: {
    fetchData() {
      var request = { typ: this.form.typ, uid: this.form.searchUid, channel: this.form.channel, user: this.form.searchRoleid, limit: this.limit, page: this.currentPage }
      fengRecord(request).then(response => {
        if (response.code === 1) {
          this.list = []
          this.list = response.dataLog
          this.count = response.len
        }
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    onSearch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var request = { typ: this.form.typ, uid: this.form.searchUid, channel: this.form.channel, user: this.form.searchRoleid, limit: this.limit, page: this.currentPage }
          this.getData(request)
        } else {
          this.$message.error('参数缺失')
        }
      })
    },
    getData(params) {
      fengRecord(params).then(response => {
        if (response && response.code === 1) {
          this.list = []
          this.list = response.dataLog
          this.count = response.len
        }
      })
    }

  }
}
</script>

