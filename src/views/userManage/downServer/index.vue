<style>
  .DownServer{
    margin: 30px 30px;
  }
</style>

<template>
  <div class="DownServer">
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
      <el-form-item label="ServerId" prop="ServerId">
        <el-input v-model="form.ServerId" placeholder="请输入ServerId" style="width:200px;margin-right:30px" />
        <el-button type="primary" @click="SearchState">状态查询</el-button>
      </el-form-item>
      <el-form-item v-if="isShow">
        <span>服务器状态:&nbsp;&nbsp;&nbsp;{{ form.ServerState }}</span>
      </el-form-item>
      <el-form-item v-if="isShow">
        <el-select v-model="form.switchs" placeholder="请选择服务器开关:">
          <el-option
            v-for="(item,index) in switchOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="isShow">
        <el-button type="primary" @click="OpenNotarize">确认</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="开启或关闭此服务器"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <p>是否将此平台
          <span style="color:green">{{ form.channel }}</span>&nbsp;&nbsp;
          <span style="color:red">{{ form.ServerId }}</span>&nbsp;&nbsp;
          <span style="color:blue">{{ +form.switchs=== 0 ? "开启" : "关闭" }}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="notarize">确 定</el-button>
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
        ServerId: "",
        ServerState: "",
        switchs: ""
      },
      isShow: false,
      dialogVisible: false,
      channelOptions: [],
      switchOptions: [
        {
          label: '开启',
          value: 0
        },
        {
          label: '关闭',
          value: 1
        }
      ]

    }
  },
  methods: {
    SearchState() {
      const params = {
        channel: this.form.channel,
        serverId: this.form.serverId
      }
      console.log(params);
      this.isShow = true
    },
    OpenNotarize() {
      this.dialogVisible = true
    },
    notarize() {
      const params = {
        channel: this.form.channel,
        serverId: this.form.serverId,
        switch: this.form.switchs
      }
      console.log(params);
      this.dialogVisible = false
    }
  }
}
</script>

