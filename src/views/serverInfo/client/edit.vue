<template>
  <el-dialog :title="tempData.state==='create'?'新增版本号':'编辑版本号'" top="40px" :visible.sync="tempData.visible" width="650px">
    <el-form ref="tempData.form" :rules="rules" :model="tempData.form" label-width="100px" style="margin-right:15px">
      <el-form-item label="版本号" prop="ver">
        <el-input v-model="tempData.form.ver" :disabled="tempData.state==='update'" autocomplete="off" />
      </el-form-item>
      <el-form-item label="内容" prop="val">
        <json-editor ref="jsonEditor" v-model="tempData.form.val" :disabled="tempData.ifEdit" class="editCode" />
      </el-form-item>
    </el-form>
    <div v-if="tempData.ifEdit" slot="footer" class="dialog-footer">
      <el-button @click.prevent="cancalWindow()">取 消</el-button>
      <el-button type="primary" @click="updateData('tempData.form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addversion, editversion } from '@/api/userMange'
import JsonEditor from '@/components/JsonEditor'
export default {
  name: 'EditClient',
  components: { JsonEditor },
  props: {
    tempData: {
      type: Object,
      required: true
    }
  },
  data() {
    var validateVersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error('版本号不能为空'))
      } else {
        if (value[0] === 'v') {
          callback()
        } else {
          callback(new Error('版本号必须以小写v开头'))
        }
      }
    }
    var validateJSON = (rule, value, callback) => {
      if (!value) {
        callback(new Error('内容不能为空'))
      } else {
        if (document.querySelector('.CodeMirror-lint-marker-error') || !this.isJSON(value)) {
          callback(new Error('JSON格式有误'))
        } else {
          callback()
        }
      }
    }
    return {
      vals: null,
      roleList: [],
      rules: {
        ver: [
          { required: true, message: '版本号必填', trigger: ['change', 'blur'] },
          { validator: validateVersion, trigger: ['change', 'blur'] }
        ],
        val: [
          { required: true, message: '内容必填', trigger: ['change', 'blur'] },
          { validator: validateJSON, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  created() {
    if (this.tempData.state === 'update') {
      if (typeof this.tempData.form.val === 'object') {
        this.vals = JSON.parse(JSON.stringify(this.tempData.form.val))
      }
    }
  },
  methods: {

    cancalWindow() {
      this.$emit('cancelAdd')
    },
    isJSON(str) {
      console.log(typeof str)
      if (typeof str === 'string') {
        try {
          JSON.parse(str)
          return true
        } catch (e) {
          return false
        }
      } else if (typeof str === 'object') {
        return true
      }
    },
    updateData(formData) {
      this.$confirm('此操作将确认版本号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _this = this
        this.$refs[formData].validate(valid => {
          if (valid) {
            if (this.tempData.state === 'create') {
              addversion(this.tempData.form).then(res => {
                if (res && res.code === 1) {
                  setTimeout(() => {
                    _this.$emit('commitAdd')
                  }, 2500)
                  _this.$message({
                    type: 'success',
                    message: '新增成功!'
                  })
                }
              })
            } else {
              if (JSON.stringify(this.vals) === JSON.stringify(this.tempData.form.val)) {
                _this.$emit('commitAdd')
                return false
              }
              editversion(this.tempData.form).then(res => {
                if (res && res.code === 1) {
                  setTimeout(() => {
                    _this.$emit('commitAdd')
                  }, 2500)
                  _this.$message({
                    type: 'success',
                    message: '更新成功!'
                  })
                }
              })
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确定'
        });
      });
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

