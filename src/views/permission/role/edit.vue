<template>
  <el-dialog :title="tempData.state==='create'?'权限分配':'权限分配'" :visible.sync="tempData.visible" width="650px">
    <el-form ref="temp" :model="temp" :rules="rules" label-width="100px" style="margin-right:15px">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="temp.role_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色负责人" prop="chargename">
        <el-input v-model="temp.chargename" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源权限">
        <el-cascader
          v-model="temp.resources"
          :collapse-tags="temp.resources.length>5"
          style="width:495px"
          clearable
          filterable
          :options="ptree"
          :props="props"
        />
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
import { updateRole, addRole, getPermissonTree } from '@/api/permission'
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
      ptree: [],
      temp: {
        role_name: '',
        chargename: '',
        resources: [],
        comment: '',
        id: null
      },
      props: {
        multiple: true,
        label: 'resource_name',
        value: 'resource_id'
      },
      oprateotions: [{
        label: '查看',
        value: 1
      }, {
        label: '操作',
        value: 2
      }],
      rules: {
        role_name: [
          { required: true, message: '角色名称必填', trigger: ['change', 'blur'] }
        ],
        chargename: [
          { required: true, message: '角色负责人必填', trigger: ['change', 'blur'] }
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
    const self = this
    getPermissonTree({}).then(res => {
      if (res.code === 1) {
        self.ptree = res.data
      }
    })
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
          this.temp.resources = JSON.stringify(this.temp.resources)
          if (this.tempData.state === 'create') {
            addRole(this.temp).then(res => {
              if (res && res.code === 1) {
                _this.$emit('commitAdd')
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
              }
            })
          } else {
            updateRole(this.temp).then(res => {
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

