<template>
  <el-dialog :title="tempData.state==='create'?'接入游戏':'编辑游戏'" :visible.sync="tempData.visible" width="650px">
    <el-form ref="tempData.form" :model="tempData.form" :rules="rules" label-width="90px" style="margin-right:15px">
      <el-form-item label="游戏名称" prop="gameName">
        <el-input v-model="tempData.form.gameName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="游戏标识" prop="gameMark">
        <el-input v-model="tempData.form.gameMark" :disabled="Boolean(tempData.form.id)" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="游戏icon">
        <el-input v-model="tempData.form.gameIcon" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.prevent="cancalWindow()">取 消</el-button>
      <el-button type="primary" @click="createData('tempData.form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addGame, editGame } from '@/api/permission'
export default {
  name: 'EditGame',
  props: {
    tempData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rules: {
        gameName: [
          { required: true, message: '游戏名称不得为空', trigger: ['change', 'blur'] },
          {
            message: '游戏名称不得为空',
            trigger: 'blur'
          }
        ],
        gameMark: [
          { required: true, message: '游戏标识不得为空', trigger: ['change', 'blur'] },
          {
            message: '游戏标识不得为空',
            trigger: 'blur'
          }
        ]
      }
    }
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
            addGame(this.tempData.form).then(res => {
              if (res && res.code === 1) {
                _this.$emit('commitAdd')
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
              }
            })
          } else {
            editGame(this.tempData.form).then(res => {
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

