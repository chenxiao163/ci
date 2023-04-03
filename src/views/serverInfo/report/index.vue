<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    font-size: 13px;
    }
    button.detailStyle.el-button--primary{
      background-color:#fff;
      border:0;
      outline:none;
      padding: 0;
    }
    button.detailStyle span{
      cursor: pointer;
      color: #409EFF;
      text-decoration: underline;
      font-size: 13px;
    }
    button.detailStyle.is-disabled span{
      color: #a0cfff;
    }
</style>
<template>
  <div class="app-container">
    <div>

      <el-form :inline="true" class="demo-form-inline">

        <el-form-item label="平台">
          <el-select v-model="query.channel" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.desc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="举报人id">
          <el-input v-model="query.userId" clearable placeholder="请输入roleid" />
        </el-form-item>
        <el-form-item label="被举报id">
          <el-input v-model="query.reportedUserId" clearable placeholder="请输入roleid" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="datalist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="平台" width="90" align="center">
        <template>
          <span>{{ channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="举报人id" width="130" prop="userId" />
      <el-table-column label="举报人昵称" align="center" min-width="110" prop="nickName" />
      <el-table-column align="center" label="被举报人id" width="130" prop="reportedUserId" />
      <el-table-column label="被举报人昵称" align="center" min-width="110" prop="reportedNickName" />
      <el-table-column align="center" label="举报类型" width="100">
        <template slot-scope="scope">
          {{ Number(scope.row.type) ===1?"昵称违规":(Number(scope.row.type) ===2?"发言违规":"其它") }}
        </template>
      </el-table-column>
      <el-table-column label="具体内容" width="90" align="center">
        <template slot-scope="scope">
          <span class="detailStyle" @click="goPath(scope.row.id)">
            查看详情
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ts" label="举报时间" width="160">
        <template slot-scope="scope">
          <span> {{ scope.row.ts*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理结果" align="center" min-width="130">
        <template slot-scope="scope">
          <span v-if="Number(scope.row.handleType)===1">
            {{ scope.row.handleDesc }}
          </span>
          <el-button v-else type="primary" class="detailStyle" :disabled="!isManage" @click="goPath(scope.row.id)">处理</el-button>
        </template>
      </el-table-column>
      <el-table-column label="处理人" align="center" width="120" prop="handleUser" />
      <el-table-column label="备注" min-width="150" align="center">
        <template slot-scope="scope">
          <p v-for="(mark,index) in scope.row.remark" :key="index" style="margin:0;padding:0">
            {{ mark }}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        v-show="count>0"
        :current-page.sync="query.page"
        :page-sizes="[10, 20, 50, 100, 200, 500 ]"
        :page-size="query.limit"
        layout="total,sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>
<script>
import { getReportList, getChannelOptions } from '@/api/userMange'
import { mapGetters } from 'vuex'
export default {
  name: 'Report',
  data() {
    return {
      isManage: false,
      emailId: null,
      datalist: [],
      channelName: '',
      channelOptions: [
      ],
      query: {
        page: 1,
        limit: 10,
        userId: null,
        reportedUserId: null,
        channel: 2
      },
      count: 0,
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'mypermissions'
    ])
  },
  watch: {
    'query.channel'() {
      this.fetchData()
    }
  },
  created() {
    if (this.mypermissions.indexOf('举报') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.query.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      var self = this
      getReportList(this.query).then(response => {
        if (response && response.code === 1) {
          self.listLoading = false
          self.count = Number(response.data.counts)
          self.channelName = response.data.channelName
          self.datalist = response.data.reports
        }
      })
    },
    goPath(id) {
      this.$router.push({ path: '/serve/reportdetail', query: { id: id, channel: this.query.channel }})
    }
  }
}
</script>
