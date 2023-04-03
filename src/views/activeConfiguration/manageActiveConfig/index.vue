
<style scoped>
.m-operate,.m-search{
  padding: 10px 0;
}
.m-page{
  float: right;
  padding: 20px;
}
</style>
<template>
  <div class="app-container">
    <!-- 操作 -->
    <div class="m-operate">
      <el-button type="primary" @click="handleJump">新增活动</el-button>
      <el-button type="primary">上传到测试服</el-button>
      <el-button type="primary">上传到主包仿真服</el-button>
      <el-button type="primary">上传到微乐仿真服</el-button>
      <el-button type="primary" @click="lookLog">上传log</el-button>
      <LookLog ref="logMethods" />
    </div>

    <!-- 根据活动id、活动名称查询 -->
    <div class="m-search">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="ruleValidate"
      >

        <el-form-item label="活动id" prop="activeId">
          <el-input v-model="form.activeId" />
        </el-form-item>
        <!-- <el-form-item label="活动名称" prop="activeName">
          <el-input v-model="form.activeName" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
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
          prop="actId"
          label="活动id"
          width="180"
        />
        <el-table-column
          prop="desc"
          label="描述"
          width="180"
        />
        <el-table-column
          prop="actStartStr"
          label="开始时间"
          width="180"
        />
        <el-table-column
          prop="actEndStr"
          label="结束时间"
          width="180"
        />
        <el-table-column
          prop="status"
          label="状态"
        />
        <el-table-column
          prop="auth"
          label="编辑人"
        />
        <!-- <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="primary" size="mini" @click="copyRow(scope.row)">复制</el-button>
            <el-button type="primary" size="mini">删除</el-button>
            <el-button type="primary" size="mini">锁定</el-button>
          </template>

        </el-table-column> -->
      </el-table>
      <div class="m-page">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageLimit"
          layout="prev, pager, next, jumper"
          :total="totalNum"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 登录弹框 -->
    <div>
      <LoginModal />
    </div>

  </div>
</template>
<script>
import LoginModal from '../components/loginModal.vue'
import LookLog from './lookLog.vue'
import { copyText } from '@/utils/copy.js'
import { addActiveConfig } from '@/api/activeConfiguration'
export default {
  components: {
    LookLog,
    LoginModal
  },
  data() {
    return {
      form: {
        activeId: '',
        activeName: ''
      },
      ruleValidate: {
        activeId: [
          { required: true, message: "请输入活动id", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
        // activeName: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { type: "string", trigger: "blur" }
        // ]
      },
      tableData: [],
      totalNum: 0,
      pageLimit: 10,
      currentPage: 1
    }
  },
  mounted() {
    this.getConfigList()
  },
  methods: {
    // 搜索
    handleSearch() {
      this.getConfigList()
    },

    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getConfigList()
    },

    getConfigList() {
      const data = {
        jsonrpc: "2.0",
        method: "bingo.show_list",
        id: "1",
        params: {
          actId: this.form.activeId, // 未空字符串显示全部，
          per_page: this.pageLimit, // 每页多少条
          page: this.currentPage // 当前页
        }
      }

      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.tableData = res.data
          this.totalNum = res.totalNum
        }
      })
    },
    // 跳转活动参数配置
    handleJump() {
      this.$router.push("/activeConfiguration/activeParamConfig")
    },

    // 查看log
    lookLog() {
      this.$refs.logMethods.showLogModal()
    },

    // 复制整行
    copyRow(row) {
      const txt = Object.values(row).join()
      copyText(txt)
      this.$message.success('复制成功')
    }
  }
}
</script>

