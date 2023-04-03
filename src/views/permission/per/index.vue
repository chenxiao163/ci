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
        <el-form-item label="资源权限">
          <el-input v-model="listQuery.resource_name" placeholder="请输入资源权限" />
        </el-form-item>
        <el-form-item label="操作权限">
          <el-select v-model="listQuery.operation" placeholder="请选择" multiple clearable>
            <el-option
              v-for="item in oprateotions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
          <el-button type="primary" :disabled="!isManage" @click="add()">添加权限</el-button>
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
      <el-table-column align="center" label="权限id" min-width="100" prop="resource_id" />
      <el-table-column align="center" label="资源权限" min-width="110" prop="resource_name" />
      <el-table-column align="center" label="操作权限类型" min-width="130" prop="opration" />
      <el-table-column align="center" label="备注" min-width="100" prop="comment" />
      <el-table-column align="center" label="修改人" min-width="130" prop="check_user" />
      <el-table-column align="center" label="修改时间" min-width="130" prop="update_time" />
      <el-table-column label="操作" align="center" min-width="130">
        <template slot-scope="scope">
          <el-button type="primary" style="padding: 6px 10px" :disabled="!isManage" @click="editRole(scope.row)">修改</el-button>
          <el-button type="primary" style="padding: 6px 10px" :disabled="!isManage" @click="handleDelete(scope.row)">删除</el-button>
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
import { selPermisson, delPermisson } from '@/api/permission'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  name: 'Per',
  components: { edit, Pagination },
  data() {
    return {
      isManage: false,
      dialogData: {
        visible: false,
        state: 'create',
        ifEdit: false,
        form: {
          parent_id: '',
          resource_name: '',
          resource_operate: [],
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
        resource_operate: [],
        resource_name: ''
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
    if (this.mypermissions.indexOf('权限管理') > -1) {
      this.isManage = true
    }
    this.fetchData()
  },
  // created() {
  //   if (this.mypermissions.indexOf('权限管理') > -1) {
  //     this.isManage = true
  //   }
  //   this.fetchData()
  // },
  methods: {
    fetchData() {
      this.dialogData.visible = false
      this.listLoading = true
      const self = this
      selPermisson(this.listQuery).then(response => {
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
      this.dialogData.ifEdit = false
      this.dialogData.visible = true
      this.dialogData.form = {
        parent_id: '',
        resource_name: '',
        resource_operate: [],
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
      this.dialogData.ifEdit = true
      this.dialogData.form = {
        parent_id: row.parent_id,
        resource_name: row.resource_name,
        resource_operate: row.resource_operate,
        comment: row.comment,
        id: row.id
      }
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
          delPermisson({ ids: permissionIDs }).then(response => {
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
