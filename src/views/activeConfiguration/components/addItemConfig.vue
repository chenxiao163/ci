<style scoped>
 .el-form-item{
  padding: 10px;
}

.m-save{
  display: flex;
  width:100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
</style>
<template>
  <div>
    <el-dialog
      title="新增item配置"
      :visible.sync="addItemVisible"
      width="450px"
    >
      <el-form ref="addItemForm" label-width="100px" :model="addItemForm" :rules="ruleValidate">
        <el-form-item label="kind id" prop="kindId">
          <el-input v-model="addItemForm.kindId" />
        </el-form-item>
        <el-form-item label="所属活动" prop="active">
          <el-input v-model="addItemForm.active" />
        </el-form-item>
        <el-form-item label="item名称" prop="itemName">
          <el-input v-model="addItemForm.itemName" />
        </el-form-item>
        <el-form-item label="item描述" prop="itemDescribe">
          <el-input v-model="addItemForm.itemDescribe" />
        </el-form-item>
        <el-form-item label="item资源" prop="itemSources">
          <el-input v-model="addItemForm.itemSources" />
        </el-form-item>
      </el-form>
      <div class="m-save">
        <el-button type="primary" @click="handleSave('addItemForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addActiveConfig } from '@/api/activeConfiguration'
export default {
  props: {
    activeForm: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      addItemVisible: false,
      addItemForm: {
        kindId: '',
        active: '',
        itemName: '',
        itemDescribe: '',
        itemSources: ''
      },
      ruleValidate: {
        kindId: [
          { required: true, message: "请填写kindId", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        active: [
          { required: true, message: "请填写活动", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请填写item名称", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        itemDescribe: [
          { required: true, message: "请填写item描述", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        itemSources: [
          { required: true, message: "请填写item资源", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    handleShowAddItem() {
      this.addItemVisible = true
    },

    handleSave(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            jsonrpc: "2.0",
            method: "bingo.item_9999_0",
            id: "1",
            params: {
              username: localStorage.getItem('svnUserName'),
              whichConf: this.activeForm.whichConf,
              kindId: this.addItemForm.kindId,
              displayName: this.addItemForm.itemName,
              desc: this.addItemForm.itemDescribe,
              pic: this.addItemForm.itemSources,
              item: this.addItemForm.active
            }
          }

          addActiveConfig(data).then(res => {
            if (res.code === 1) {
              this.$message.success('保存item配置成功')
              this.addItemVisible = false
            }
          })
        } else {
          this.$message.error('请完整填写item配置')
        }
      })
    }
  }
}
</script>
