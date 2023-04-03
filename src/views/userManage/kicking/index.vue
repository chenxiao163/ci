<style>
  .kicking{
    margin: 30px 30px;
  }
  .el-dialog{
    border-radius: 10px;
  }
</style>

<template>
  <div class="kicking">
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
      <el-form-item label="userID" prop="userID">
        <el-input v-model="form.userID" placeholder="请输入userID" style="width:200px;margin-right:30px" />
        <el-button type="primary" @click="SearchState">状态查询</el-button>
      </el-form-item>
      <el-form-item v-if="isShow">
        <span>玩家当前状态:{{ form.state }}</span>
      </el-form-item>
      <el-form-item v-if="isShow">
        <el-button @click="showDialog">强制玩家下线</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="强制玩家下线提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      style="border-radius: 10px;"
    >
      <div>确认将此平台:
        <span style="color:green">{{ form.channel }},</span>&nbsp;&nbsp;userID:
        <span style="color:red">{{ form.userID }}</span>&nbsp;&nbsp;强制玩家下线
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UserLogout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        channel: "",
        userID: "",
        state: "",
        logout: ""
      },
      isShow: false,
      channelOptions: [],
      dialogVisible: false
    }
  },
  created() {

  },
  methods: {
    SearchState() {
      const params = {
        channel: this.form.channel,
        userid: this.form.userID
      }
      console.log(params);
      this.isShow = true
    },
    showDialog() {
      this.dialogVisible = true
    },
    UserLogout() {
      const params = {
        channel: this.form.channel,
        userid: this.form.userID
      }
      console.log(params);
      this.dialogVisible = false
    }
  }
}
</script>

