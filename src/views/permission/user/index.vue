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
        <el-form-item label="姓名">
          <el-input v-model="listQuery.account_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="listQuery.user_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="listQuery.email" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="listQuery.role_id" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              style="width:495px"
              :label="item.role_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
          <el-button type="primary" :disabled="!isManage" @click="addRole()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      tooltip-effect="dark"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="姓名" min-width="100" prop="account_name" />
      <el-table-column align="center" label="用户名" min-width="110" prop="user_name" />
      <el-table-column align="center" label="邮箱" min-width="160" prop="email" />
      <el-table-column align="center" label="角色" min-width="110" prop="role_name" />
      <el-table-column align="center" label="修改人" min-width="130" prop="updateUser" />
      <el-table-column align="center" label="修改时间" min-width="130" prop="update_time" />
      <el-table-column label="操作" align="center" min-width="130">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="!isManage" style="padding: 6px 10px" @click="editRole(scope.row)">角色修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="orderCount>0"
      :total="orderCount"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <edit v-if="dialogData.visible" :temp-data="dialogData" @commitAdd="commitAdd" @cancelAdd="cancelAdd" />
  </div>
</template>

<script>
import edit from './edit'
import { getUserLists, selRole } from '@/api/permission'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  components: { edit, Pagination },
  data() {
    return {
      isManage: false,
      dialogData: {
        visible: false,
        state: 'create',
        form: {
          role_id: null,
          user_name: '',
          account_name: '',
          email: '',
          id: null
        }
      },
      roleList: [],
      list: [],
      listLoading: false,
      orderCount: 0,
      listQuery: {
        page: 1,
        limit: 10,
        user_name: '',
        account_name: '',
        email: '',
        role_id: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  created() {
    if (this.mypermissions.indexOf('用户管理') > -1) {
      this.isManage = true
    }
    const self = this
    selRole({}).then(res => {
      if (res.code === 1) {
        self.roleList = res.data
      }
    })
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.dialogData.visible = false
      this.listLoading = true
      const self = this
      getUserLists(this.listQuery).then(response => {
        self.listLoading = false
        if (response && response.code === 1) {
          self.list = response.data
          self.orderCount = Number(response.count)
        }
      })
    },
    cancelAdd() {
      this.dialogData.visible = false
    },
    commitAdd() {
      this.dialogData.visible = false
      this.fetchData()
    },
    addRole() {
      this.dialogData.state = 'create'
      this.dialogData.form = {
        user_name: '',
        role_id: null,
        account_name: '',
        email: '',
        id: null
      }
      this.dialogData.visible = true
    },
    editRole(row) {
      this.dialogData.state = 'update'
      this.dialogData.form = {
        user_name: row.user_name,
        role_id: row.role_id,
        account_name: row.account_name,
        email: row.email,
        id: row.id
      }
      this.dialogData.visible = true
    }
  }
}
</script>
