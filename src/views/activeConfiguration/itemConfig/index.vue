<style scoped>
.m-operate{
}
</style>
<template>
  <div class="app-container">
    <!-- 操作 -->
    <div class="m-operate">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchForm"
        :rules="ruleValidate"
      >
        <el-form-item>
          <el-button type="primary" @click="addItem">新增item</el-button>
          <AddItemConfig ref="addItemConfigMethods" />
        </el-form-item>
        <el-form-item label="itemId" prop="itemId">
          <el-input v-model="searchForm.itemId" />
        </el-form-item>
        <el-form-item label="item名称" prop="itemName">
          <el-input v-model="searchForm.itemName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch('searchForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        selectable
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="itemid"
          label="item id"
          width="180"
        />
        <el-table-column
          prop="active"
          label="所属活动"
          width="180"
        />
        <el-table-column
          prop="itemName"
          label="item名称"
          width="180"
        />
        <el-table-column
          prop="itemDescribe"
          label="item描述"
          width="180"
        />
        <el-table-column
          prop="itemSources"
          label="item资源"
          width="180"
        />
        <el-table-column
          prop="editor"
          label="编辑人"
        />

        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini" @click="copyRow(scope.row)">复制</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </template>

        </el-table-column>
      </el-table>
    </div>

    <!-- 登录弹框 -->
    <div>
      <LoginModal />
    </div>

  </div>
</template>
<script>
import LoginModal from '../components/loginModal.vue'
import { copyText } from '@/utils/copy.js'
import AddItemConfig from '../components/addItemConfig.vue'
export default {
  components: {
    AddItemConfig,
    LoginModal
  },
  data() {
    return {
      searchForm: {
        itemId: '',
        itemName: ""
      },
      tableData: [{
        itemid: '4280',
        active: 'bingo',
        itemName: '足球',
        itemDescribe: '2021年7月激情',
        itemSources: 'http://',
        editor: 'gr'
      }],
      ruleValidate: {
        itemId: [
          { required: true, message: "请填写itemId", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请填写item名称", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    copyRow(row) {
      const txt = Object.values(row).join()
      copyText(txt)
      this.$message.success('复制成功')
    },

    // 查询
    handleSearch(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log('哈哈哈哈都满足条件')
        } else {
          this.$message.error('请完整填写item查询条件')
        }
      })
    },

    // 新增item
    addItem() {
      this.$refs.addItemConfigMethods.handleShowAddItem()
    }
  }
}
</script>
