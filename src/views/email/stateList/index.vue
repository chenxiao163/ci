<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
</style>
<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="平台">
          <el-select v-model="query.channel" clearable placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.desc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户roleid">
          <el-input v-model="query.searchUid" clearable placeholder="请输入roleid" />
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
      <el-table-column label="申请人" width="110" align="center" prop="user_name" />
      <el-table-column align="center" prop="created_at" label="申请时间" width="160">
        <template slot-scope="scope">
          <span> {{ scope.row.appli_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请平台" min-width="100" prop="channelName" />
      <el-table-column label="申请详情" min-width="90" align="center">
        <template slot-scope="scope">
          <span class="detailStyle" @click="goPath(scope.row.id)">
            查看
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="110" align="center">
        <template slot-scope="scope">
          <router-link v-if="scope.row.user_name===name&&scope.row.send_type==='4'" :to="{path:'/email/stateAdd',query:{id:scope.row.id}}" class="detailStyle">
            修正
          </router-link>
          <span v-if="scope.row.user_name===name&&scope.row.send_type==='3'" class="detailStyle" @click="toAction(scope.row.id,scope.row.title,1)">发送</span>
          <span v-if="scope.row.user_name===name&&scope.row.send_type==='2'" class="detailStyle" @click="toBack(scope.row.email_type,scope.row.id)">撤回</span>
          <span v-if="scope.row.user_name===name&&scope.row.send_type==='1'">已发送</span>
          <span v-if="scope.row.user_name!==name">-</span>
        </template>

      </el-table-column>

      <el-table-column label="审批状态" min-width="110" align="center">
        <template slot-scope="scope">
          <span v-if="isManage&&scope.row.user_name!==name">
            <span v-if="scope.row.send_type!=='2'">{{ scope.row.send_type==='1'?'已发送':(scope.row.send_type==='3'?'已通过':'已驳回') }}</span>
            <span v-if="scope.row.send_type==='2'">
              <span class="detailStyle" style="margin-right:10px" @click="toAction(scope.row.id,scope.row.title,3)">通过</span>
              <span class="detailStyle" @click="toAction(scope.row.id,scope.row.title,4)">驳回</span>
            </span>
          </span>
          <span v-if="(isManage&&scope.row.user_name===name)||!isManage">
            {{ scope.row.send_type==='4'?"已驳回":(scope.row.send_type==='3'?"已通过":(scope.row.send_type==='1'?"已发送":"正在审批")) }}
          </span>

        </template>
      </el-table-column>

      <el-table-column label="审批人" min-width="110" align="center" prop="appli_name" />
      <el-table-column align="center" prop="created_at" label="审批时间" min-width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.update_time"> {{ scope.row.update_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="发送时间" min-width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.send_time"> {{ scope.row.send_time | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
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
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>你确认要 <span style="color:red">{{ emailName }} {{ emailTitle }} </span> 这条邮件?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getChannelOptions } from '@/api/userMange'
import { emailDetai, emailAction } from '@/api/email'
import { mapGetters } from 'vuex'
export default {
  name: 'StateList',
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
      centerDialogVisible: false,
      emialAction: '',
      emailTitle: '',
      emailName: '',
      emailType: null,
      emailId: null,
      datalist: null,
      apprstate: '',
      channelOptions: [
      ],
      query: {
        page: 1,
        limit: 10,
        searchUid: '',
        superUser: 0,
        email_type: 2,
        channel: ''
      },
      count: null,
      isManage: false,
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
  activated() {
    if (this.mypermissions.indexOf('功能状态调整审批') > -1) {
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
      this.currentPage = val
      this.fetchData()
    },
    goPath(id) {
      this.$router.push({ path: '/email/statedetail', query: { id: id }})
    },
    fetchData() {
      this.listLoading = true
      var self = this
      this.query.superUser = this.isManage ? 1 : 0
      emailDetai(this.query).then(response => {
        self.listLoading = false
        self.count = Number(response.count)
        self.datalist = response.data
      })
    },
    confirm() {
      var query = { id: this.emailId, type: this.emailType, appli_name: this.$store.state.user.name }
      this.centerDialogVisible = false
      emailAction(query).then(response => {
        if (response && response.code === 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchData()
        }
      })
    },
    toAction(id, title, type) {
      this.emailName = type === 1 ? '发送' : (this.emailName = type === 3 ? '通过' : '驳回')
      this.emailTitle = title
      this.emailType = type
      this.emailId = id
      this.centerDialogVisible = true
    },
    toBack(type, id) {
      var query = { id: id, type: 5, appli_name: this.$store.state.user.name }
      emailAction(query).then(response => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.fetchData()
      })
    }
  }
}
</script>
