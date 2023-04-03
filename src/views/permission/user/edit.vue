<template>
  <el-dialog :title="tempData.state==='create'?'新增用户':'编辑用户'" :visible.sync="tempData.visible" width="650px">
    <el-form ref="tempData.form" :rules="rules" :model="tempData.form" label-width="100px" style="margin-right:15px">
      <el-form-item label="姓名" prop="account_name">
        <el-input v-model="tempData.form.account_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="tempData.form.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="tempData.form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="tempData.form.role_id" placeholder="请选择" style="width:495px">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.prevent="cancalWindow()">取 消</el-button>
      <el-button type="primary" @click="updateData('tempData.form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateUser, selRole, addAccount } from '@/api/permission'
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
      roleList: [],
      rules: {
        user_name: [
          { required: true, message: '用户名必填', trigger: ['change', 'blur'] }
        ],
        account_name: [
          { required: true, message: '姓名必填', trigger: ['change', 'blur'] }
        ],
        email: [
          { required: true, message: '邮箱必填', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  created() {
    const self = this
    selRole({}).then(res => {
      if (res.code === 1) {
        self.roleList = res.data
      }
    })
    this.temp = Object.assign({}, this.tempData.form)
  },
  methods: {
    cancalWindow() {
      this.$emit('cancelAdd')
    },
    updateData(formData) {
      const _this = this
      this.$refs[formData].validate(valid => {
        if (valid) {
          if (this.tempData.state === 'create') {
            addAccount(this.tempData.form).then(res => {
              if (res && res.code === 1) {
                _this.$emit('commitAdd')
                _this.$message({
                  type: 'success',
                  message: '更新成功!'
                })
              }
            })
          } else {
            updateUser(this.tempData.form).then(res => {
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

