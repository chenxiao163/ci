<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
    .overStyle{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    }
</style>
<template>
  <div class="app-container">
    <div>

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="角色">
          <el-input v-model="listQuery.role_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
          <el-button type="primary" :disabled="!isManage" @click="add()">添加角色</el-button>
          <el-button type="primary" :disabled="!isManage" @click="handleDelete()">批量删除</el-button>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column align="center" label="角色名称" min-width="100" prop="role_name" />
      <el-table-column align="center" label="角色负责人" min-width="110" prop="chargename" />
      <el-table-column align="center" label="资源权限" min-width="420" prop="resources_desc">
        <template slot-scope="scope">
          <p class="overStyle">{{ scope.row.resources_desc }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="100" prop="comment" />
      <el-table-column align="center" label="修改人" min-width="110" prop="updateUser" />
      <el-table-column align="center" label="修改时间" min-width="130" prop="update_time" />
      <el-table-column label="操作" align="center" min-width="130">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="!isManage" style="padding: 6px 10px" @click="editRole(scope.row)">修改</el-button>
          <el-button type="primary" :disabled="!isManage" style="padding: 6px 10px" @click="handleDelete(scope.row)">删除</el-button>
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
import { selRole, delRole } from '@/api/permission'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  name: 'Role',
  components: { edit, Pagination },
  data() {
    return {
      isManage: false,
      dialogData: {
        visible: false,
        state: 'create',
        form: {
          role_name: '',
          chargename: '',
          resources: [],
          comment: '',
          id: ''
        }
      },
      multipleSelection: [],
      list: [],
      listLoading: false,
      orderCount: 0,
      listQuery: {
        page: 1,
        limit: 10,
        role_name: ''
      },
      oprateotions: [{
        label: '查看',
        value: 1
      }, {
        label: '操作',
        value: 2
      }]

    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  created() {
    if (this.mypermissions.indexOf('角色管理') > -1) {
      this.isManage = true
    }
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.dialogData.visible = false
      this.listLoading = true
      const self = this
      selRole(this.listQuery).then(response => {
        self.listLoading = false
        if (response && response.code === 1) {
          self.list = response.data
          self.list.forEach(ele => {
            let str = '-'
            if (ele.resource_operate) {
              if (ele.resource_operate.length === 2) {
                str = '查看,操作'
              } else if (Number(ele.resource_operate[0]) === 1) {
                str = '查看'
              } else if (Number(ele.resource_operate[0]) === 2) {
                str = '操作'
              }
            }
            self.$set(ele, 'opration', str)
          })
          self.orderCount = Number(response.count)
        }
      })
    },
    add() {
      this.dialogData.state = 'create'
      this.dialogData.visible = true
      this.dialogData.form = {
        role_name: '',
        chargename: '',
        resources: [],
        comment: '',
        id: ''
      }
    },
    cancelAdd() {
      this.dialogData.visible = false
    },
    commitAdd() {
      this.dialogData.visible = false
      this.fetchData()
    },
    editRole(row) {
      this.dialogData.state = 'update'
      this.dialogData.form = {
        role_name: row.role_name,
        chargename: row.chargename,
        resources: row.resources,
        comment: row.comment,
        id: row.id
      }
      console.log(this.dialogData.form)
      this.dialogData.visible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(row) {
      var _this = this
      var permissionIDs = []
      if (row) {
        permissionIDs.push(row.id)
      } else {
        if (this.multipleSelection.length <= 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除项',
            type: 'success',
            duration: 2000
          })
          return
        }
        this.multipleSelection.forEach(row => {
          permissionIDs.push(row.id)
        })
      }
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delRole({ ids: permissionIDs }).then(response => {
            if (response && response.code === 1) {
              _this.fetchData()
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
