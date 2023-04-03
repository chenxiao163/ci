<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
    .logform .el-date-editor span.el-range-separator{
      padding: 0;
    }
    button.miniButton{
      border: 0;
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
        <el-form-item label="大区选择" prop="partitionId">
          <el-select v-model="form.partitionId" placeholder="请选择">
            <el-option
              v-for="item in typOptions"
              :key="item.partitionId"
              :label="item.partitionName"
              :value="item.partitionId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区服">
          <el-select v-model="form.serverId" placeholder="请选择">
            <el-option
              v-for="(item,index) in serveOptions"
              :key="index+'serve'"
              :label="item.key"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('form')">查询</el-button>
          <el-button type="primary" :loading="downloadLoading" @click="handleDownload">导出Excel</el-button>
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
      <el-table-column label="大区" min-width="120" align="center" prop="partitionName" />
      <el-table-column min-width="120" label="区服" align="center" prop="key" />
      <el-table-column align="center" label="开区时间" min-width="160" prop="openAt">
        <template slot-scope="scope">
          <span>{{ scope.row.openAt*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="t_num" align="center" min-width="120">
        <template slot="header">
          注册人数<el-tooltip trigger="hover" content="uid加roleid总新增" placement="top"><el-button class="el-icon-question miniButton" /></el-tooltip>
        </template>
        <template slot-scope="scope">{{ scope.row.t_num }}</template>
      </el-table-column>
      <el-table-column min-width="110" align="center" prop="aarcu">
        <template slot="header">
          有效新增<el-tooltip trigger="hover" content="uid新增用户，影响开服" placement="top"><el-button class="el-icon-question miniButton" /></el-tooltip>
        </template>
        <template slot-scope="scope">{{ scope.row.aarcu }}</template>
      </el-table-column>
      <el-table-column label="有效新增角色" min-width="130" align="center" prop="aarcu" />
    </el-table>
    <div class="block">
      <el-pagination
        v-show="count>0"
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
import { getServeoptions, getServelist, getChannelOptions } from '@/api/userMange'
export default {
  name: 'Servelist',
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
      downloadLoading: false,
      limit: 10,
      count: null,
      list: null,
      apprstate: '',
      listLoading: false,
      form: {
        channel: '',
        serverId: '',
        partitionId: ''
      },
      channelOptions: [
      ],
      typOptions: [
      ],
      serveOptions: [
      ],
      ruleValidate: {
        channel: [
          { required: true, message: '请选择平台', trigger: ['blur', 'change'] }
        ],
        partitionId: [
          { required: true, message: '请选择大区', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
    'form.partitionId'(val) {
      const self = this
      this.form.serverId = null
      if (this.form.channel) {
        this.fetchData()
        this.typOptions.forEach(ele => {
          if (ele.partitionId === val) {
            self.serveOptions = ele.servers
          }
        })
      }
    },
    'form.serverId'(val) {
      if (val) {
        this.fetchData()
      }
    },
    'form.channel'() {
      this.getOptions()
      if (this.form.partitionId) {
        this.fetchData()
      }
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
    getOptions() {
      getServeoptions({ channel: this.form.channel }).then(res => {
        if (res.code === 1) {
          this.typOptions = res.data.serverId
          this.typOptions.unshift({
            partitionId: 'test',
            partitionName: '全服',
            servers: []
          }
          )
        }
      })
    },
    fetchData() {
      const partitionId = this.form.partitionId === 'test' ? '' : this.form.partitionId
      var request = { partitionId: partitionId, serverId: this.form.serverId, channel: this.form.channel, limit: this.limit, page: this.currentPage }
      getServelist(request).then(response => {
        if (response && response.code === 1) {
          this.list = []
          this.list = response.data.serverInfo
          this.count = response.data.count
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
          const partitionId = this.form.partitionId === 'test' ? '' : this.form.partitionId
          var request = { partitionId: partitionId, serverId: this.form.serverId, channel: this.form.channel, limit: this.limit, page: this.currentPage }
          this.getData(request)
        } else {
          this.$message.error('参数缺失')
        }
      })
    },
    getData(params) {
      getServelist(params).then(response => {
        if (response && response.code === 1) {
          this.list = []
          this.list = response.data.serverInfo
          this.count = response.data.count
        }
      })
    },
    handleDownload() {
      var _this = this
      if (!this.form.channel || !this.form.partitionId) {
        this.$message({
          message: '请先选择导出数据条件',
          type: 'warning'
        })
        return
      }
      const partitionId = this.form.partitionId === 'test' ? '' : this.form.partitionId
      var request = { partitionId: partitionId, serverId: this.form.serverId, channel: this.form.channel, limit: 10000, page: 1 }
      this.downloadLoading = true
      getServelist(request).then(response => {
        const data = response.data
        if (response && response.code === 1) {
          var downloadList = response.data.serverInfo
          if (!downloadList.length) {
            this.$message({
              message: '数据为空，无需下载',
              type: 'warning'
            })
            this.downloadLoading = false
            return
          }
          downloadList.forEach((ele, index) => {
            ele.openAt = this.formatTime(ele.openAt * 1000)
          })
          import('@/utils/Export2Excel').then(excel => {
            const tHeader = ['大区', '区服', '开区时间', '注册人数', '有效新增', '有效新增角色']
            const filterVal = ['partitionName', 'key', 'openAt', 't_num', 'aarcu', 'raccru']
            const data = _this.formatJson(filterVal, downloadList)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '开服进度'
            })
          })
          _this.downloadLoading = false
        } else {
          _this.$notify({
            title: '提示',
            message: data.msg,
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, inde) => filterVal.map((j, index) => {
        if (j === 'index') {
          if (v.index) {
            return v[j]
          } else {
            return inde + 1
          }
        } else {
          return v[j]
        }
      }))
    },
    formatTime(date) {
      var d = new Date(date)
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + (d.getDate())) + ' ' + (d.getHours() > 9 ? d.getHours() : '0' + (d.getHours())) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' + (d.getMinutes())) + ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + (d.getSeconds()))
      return datetime
    },
    renderHeader(h, { column }) {
      if (column.label) {
        return (
          column.label
        )
      }
    }

  }
}
</script>

