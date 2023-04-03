<template>
  <el-dialog
    title="查看log"
    :visible.sync="logVisible"
    width="800px"
  >
    <div>
      <el-table
        :data="tableData"
        height="500"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="操作人"
          width="180"
        />
        <el-table-column
          prop="active"
          label="活动"
        />
        <el-table-column
          prop="behavior"
          label="行为"
        />
        <el-table-column label="操作" width="200" align="center">
          <template>
            <el-button type="primary" size="mini">查看配置内容</el-button>
            <el-button type="primary" size="mini">撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      logVisible: false,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        active: 'bingo',
        behavior: '上传至测试服'
      }]
    }
  },

  methods: {
    showLogModal() {
      this.logVisible = true
    }
  }
}
</script>
