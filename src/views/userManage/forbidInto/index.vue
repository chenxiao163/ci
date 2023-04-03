<style>
  .forbidInto{
    margin: 30px 30px;
  }
</style>
<template>
  <div class="forbidInto">
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="平台" prop="channel">
        <el-select v-model="form.channel" placeholder="请选择平台">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label-width="110px" label="服务器ID">
        <el-input v-model="form.serverId" style="width:200px" placeholder="请填写服务器ID" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="OpenNotarize">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        channel: "",
        serverId: ""
      },
      isShow: false,
      channelOptions: []
    }
  },
  methods: {

    OpenNotarize() {
      this.$confirm(`此操作将禁止进入该服务器:${this.form.serverId}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          channel: this.form.channel
        }
        console.log(params);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁止'
        });
      });
    }
  }
}
</script>

