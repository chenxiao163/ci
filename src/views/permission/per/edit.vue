<template>
  <el-dialog :title="tempData.state==='create'?'添加权限':'编辑权限'" :visible.sync="tempData.visible" width="650px">
    <el-form ref="temp" :model="temp" :rules="rules" label-width="90px" style="margin-right:15px">
      <el-form-item label="父节点id">
        <el-input v-model="temp.parent_id" autocomplete="off" :disabled="tempData.ifEdit" />
      </el-form-item>
      <el-form-item label="资源权限" prop="resource_name">
        <el-input v-model="temp.resource_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="操作权限">
        <el-select v-model="temp.resource_operate" placeholder="请选择" style="width:505px" multiple clearable>
          <el-option
            v-for="item in oprateotions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="temp.comment" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.prevent="cancalWindow()">取 消</el-button>
      <el-button type="primary" @click="createData('temp')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updatePermisson, addPermisson } from '@/api/permission'
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
      temp: {
        parent_id: '',
        resource_name: '',
        resource_operate: [],
        comment: '',
        id: null
      },
      oprateotions: [{
        label: '查看',
        value: '1'
      }, {
        label: '操作',
        value: '2'
      }],
      rules: {
        resource_name: [
          { required: true, message: '资源权限必填', trigger: ['change', 'blur'] }
        ]
      }

    }
  },
  watch: {
    'this.tempData.id'() {
      this.temp = Object.assign({}, this.tempData.form)
    }
  },
  created() {
    this.temp = Object.assign({}, this.tempData.form)
  },
  methods: {
    cancalWindow() {
      this.$emit('cancelAdd')
    },
    createData(formData) {
      const _this = this
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (this.tempData.state === 'create') {
            addPermisson(this.temp).then(res => {
              if (res && res.code === 1) {
                _this.$emit('commitAdd')
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
              }
            })
          } else {
            updatePermisson(this.temp).then(res => {
              if (res && res.code === 1) {
                _this.$emit('commitAdd')
                _this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
              }
            })
          }
        }
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
</style>

