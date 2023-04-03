<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
    .overStyle{
      display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
    }

</style>
<template>
  <div class="app-container">
    <div>

      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="clientId">
          <el-select v-model="listQuery.id" filterable placeholder="请选择" style="width: 600px" @change="fetchData()">
            <el-option
              v-for="item in clientOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!isManage" type="primary" @click="add()">编辑clientId</el-button>
          <el-button v-if="listQuery.id" type="primary" @click="addVersion()">添加新的版本号</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      tooltip-effect="dark"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="版本号" width="100" prop="ver" />
      <el-table-column align="center" label="客户端配置" min-width="120" prop="val">
        <template slot-scope="scope">
          <p class="overStyle">{{ scope.row.val }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button v-if="Number(scope.row.closeType)===1" type="primary" style="padding: 6px 10px" @click="editVersion(scope.row,false)">查看</el-button>
          <el-button v-if="Number(scope.row.closeType)===2" type="primary" style="padding: 6px 10px" @click="editVersion(scope.row,true)">修改</el-button>
          <el-button type="primary" :disabled="!isManage||Number(scope.row.closeType)===1" style="padding: 6px 10px" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="锁定" align="center" width="130">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.closeType"
            :disabled="!isManage"
            active-value="1"
            inactive-value="2"
            active-text="是"
            inactive-text="否"
            @change="changeType($event,scope.row.closeType,scope.row)"
          />
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
    <add v-if="dialogAddData.visible" :temp-data="dialogAddData" @commitAdd="commitAdd" @cancelAdd="cancelAdd" />
    <edit v-if="dialogData.visible" :temp-data="dialogData" @commitAdd="commitEdit" @cancelAdd="cancelAdd" />
  </div>
</template>

<script>
import edit from './edit'
import add from './add'
import { fetchClient, getversionList, delversion, closeType } from '@/api/userMange'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
export default {
  name: 'Client',
  components: { edit, add, Pagination },
  data() {
    return {
      isManage: false,
      tableKey: 1,
      listQuery: {
        page: 1,
        limit: 10,
        id: null
      },
      orderCount: 0,
      dialogAddData: {
        visible: false
      },
      dialogData: {
        visible: false,
        state: 'create',
        ifEdit: false,
        form: {
          val: {},
          id: null,
          ver: ''
        }
      },
      clientOptions: [
      ],
      list: [],
      listLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  created() {
    if (this.mypermissions.indexOf('客户端管理') > -1) {
      this.isManage = true
    }
    this.getOptions()
  },
  methods: {
    getOptions() {
      fetchClient({}).then(response => {
        if (response && response.code === 1) {
          this.clientOptions = response.data.map(ele => {
            return {
              value: ele.id,
              label: ele.descName + ' ' + ele.clientId + '(' + ele.clientIdNum + ')'
            }
          })
        }
      })
    },
    fetchData() {
      this.listLoading = true
      const self = this
      ++this.tableKey
      getversionList(this.listQuery).then(response => {
        self.listLoading = false
        self.list = []
        if (response && response.code === 1) {
          for (var key in response.data.vals) {
            self.list.push(
              {
                ver: key,
                val: response.data.vals[key].content,
                closeType: String(response.data.vals[key].closeType)
              }
            )
          }
        }
      })
    },
    add() {
      this.dialogAddData.visible = true
    },
    changeType(event, val, row) {
      const query = {
        ver: row.ver,
        id: this.listQuery.id,
        type: val
      }
      closeType(query).then(response => {
        if (response && response.code === 1) {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        }
      })
    },
    cancelAdd() {
      this.dialogAddData.visible = false
      this.dialogData.visible = false
    },
    commitEdit() {
      this.dialogData.visible = false
      this.fetchData()
    },
    commitAdd() {
      this.dialogAddData.visible = false
      this.getOptions()
    },
    addVersion() {
      this.dialogData.ifEdit = true
      this.dialogData.state = 'create'
      this.dialogData.form = {
        id: this.listQuery.id,
        val: {},
        ver: ''
      }
      this.dialogData.visible = true
    },
    editVersion(row, flag) {
      this.dialogData.state = 'update'
      this.dialogData.form = Object.assign({}, row)
      if (this.dialogData.form.val) {
        if (this.isJSON(this.dialogData.form.val)) {
          this.dialogData.form.val = JSON.parse(this.dialogData.form.val)
        } else {
          this.$message({
            type: 'warning',
            message: '格式错误!'
          })
        }
      }
      this.$set(this.dialogData.form, 'id', this.listQuery.id)
      this.dialogData.visible = true
      this.dialogData.ifEdit = flag
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(row) {
      const _this = this
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delversion({ id: this.listQuery.id, ver: row.ver }).then(response => {
            if (response && response.code === 1) {
              setTimeout(() => {
                _this.fetchData()
              }, 1000)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    isJSON(str) {
      if (typeof str === 'string') {
        try {
          var obj = JSON.parse(str)
          console.log('转换成功：' + obj)
          return true
        } catch (e) {
          console.log('error：' + str + '!!!' + e)
          return false
        }
      }
    }
  }
}
</script>
