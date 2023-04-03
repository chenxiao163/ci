<template>
  <el-dialog title="编辑clientId" top="60px" :visible.sync="tempData.visible" class="dialogStyle" width="800px">
    <div style="float:right;margin-bottom: 10px">
      <el-button v-if="len===0" size="small" type="primary" @click="addClientId()">新增</el-button>
    </div>
    <el-table
      ref="dragTable"
      tooltip-effect="dark"
      class="tableStyle"
      row-key="id"
      fit
      :data="list"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" label="名称" width="120" prop="descName">
        <template slot-scope="scope">
          <span v-if="scope.$index>len-1&&!ifAdd">
            <el-input v-if="scope.row.ifSet" v-model="scope.row.descName" class="editing" size="small" placeholder="请输入" />
            <span v-else @click="scope.row.ifSet=!scope.row.ifSet">{{ scope.row.descName }} <i class="el-icon-edit colorStyle" /></span>
          </span>
          <span v-else>{{ scope.row.descName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="clientId" min-width="120" prop="clientId">
        <template slot-scope="scope">
          <span v-if="scope.$index>len-1&&!ifAdd">
            <el-select v-if="scope.row.ifSet" v-model="scope.row.clientId" filterable clearable size="small" style="width:330px" placeholder="请选择" @change="getclientNum(scope.row.clientId, scope.$index)">
              <el-option
                v-for="(item,index) in clientOptions"
                :key="index"
                :label="item.clientid_name"
                :value="item.clientid_name"
              />
            </el-select>
            <span v-else @click="scope.row.ifSet=!scope.row.ifSet">{{ scope.row.clientId }} <i class="el-icon-edit colorStyle" /></span>
          </span>
          <span v-else>{{ scope.row.clientId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="clientIdNum" width="110" prop="clientIdNum">
        <template slot-scope="scope">
          <!-- <span v-if="scope.$index>len-1&&!ifAdd">
            <el-input v-if="scope.row.ifSet" v-model="scope.row.clientNum" size="small" placeholder="请输入" @blur="handleEdit(scope.row)" />
            <span v-else @click="scope.row.ifSet=!scope.row.ifSet">{{ scope.row.clientNum }}<i class="el-icon-edit colorStyle" /></span>
          </span> -->
          <span>{{ scope.row.clientIdNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="!isManage" style="padding: 6px 10px" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          <el-button v-if="scope.$index===list.length-1" type="primary" :disabled="!isManage" style="padding: 6px 10px" @click="addClientId()">新增</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click.prevent="cancalWindow()">取 消</el-button>
      <el-button type="primary" @click="createData()">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getClientList, addClient, delClient, dragSort, fetchClient } from '@/api/userMange'
import Sortable from 'sortablejs'
export default {
  name: 'EditPermission',
  props: {
    tempData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      oldList: [],
      newList: [],
      list: [],
      hasEdit: false,
      isManage: true,
      ifAdd: true,
      len: 0,
      clientOptions: [],
      rules: {
        descName: [
          { required: true, message: '名称必填', trigger: ['change', 'blur'] }
        ],
        clientId: [
          { required: true, message: 'clientId必填', trigger: ['change', 'blur'] }
        ]
      }

    }
  },
  created() {
    this.getList()
    getClientList({}).then(res => {
      if (res && res.code === 1) {
        this.clientOptions = res.data
      }
    })
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchClient({})
      this.list = data
      this.len = data.length
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    getclientNum(val, index) {
      this.clientOptions.forEach(ele => {
        if (ele.clientid_name === val) {
          this.list[index].clientIdNum = ele.client_id
        }
      })
    },
    addClientId() {
      this.ifAdd = false
      this.list.push(
        {
          clientId: '',
          clientIdNum: null,
          descName: '',
          ifSet: true
        }
      )
    },
    cancalWindow() {
      this.$emit('cancelAdd')
    },
    handleEdit(row) {
      row.ifSet = !row.ifSet
    },
    createData(formData) {
      const _this = this
      const lists = this.list.slice(this.len)
      let flag = (lists && lists.length) ? 1 : 2
      lists.forEach(ele => {
        if (!ele.clientId || !ele.clientIdNum) {
          flag = 3
        }
      })
      console.log(flag)
      if (flag === 1) {
        const query = { 'item': this.list.slice(this.len) }
        addClient(query).then(res => {
          if (res && res.code === 1) {
            _this.$emit('commitAdd')
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
        })
      } else {
        if (flag === 3) {
          this.$notify({
            title: '提示',
            message: '新增的clientId名称和值不得为空',
            type: 'error',
            duration: 2000
          })
        } else {
          this.$emit('cancelAdd')
        }
      }
    },
    handleDelete(index, row) {
      if (index < this.len) {
        this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delClient({ id: row.id }).then(response => {
              if (response && response.code === 1) {
                // this.$emit('commitAdd')
                this.getList()
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
      } else {
        this.list.splice(index, 1)
      }
    },
    setSort() {
      const _this = this
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = _this.list.splice(evt.oldIndex, 1)[0]
          _this.list.splice(evt.newIndex, 0, targetRow)
          const tempIndex = _this.newList.splice(evt.oldIndex, 1)[0]
          _this.newList.splice(evt.newIndex, 0, tempIndex)
          if (document.querySelector('.editing')) {
            this.$notify({
              title: '提示',
              message: '存在正在新增的元素,无法排序',
              type: 'error',
              duration: 2000
            })
            return false
          }
          _this.dragOrder(_this.newList)
        }
      })
    },
    dragOrder(orderID) {
      const query = {
        dragSort: orderID
      }
      dragSort(query).then(() => {
      })
    }
  }
}
</script>
<style lang="scss">
.fieldTab{
  margin-top:-15px;
  .el-tabs__item{
    width:305px;
    text-align:center
  }
}
i.colorStyle{
  color: #409EFF
}
.dialogStyle .tableStyle{
  max-height: 700px;
  overflow: auto;
}
.dialogStyle .tableStyle.el-table::before{
  height: 0;
}
</style>

