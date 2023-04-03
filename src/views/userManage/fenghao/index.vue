<style>
.forbidContaner {
  margin: 50px 0 0 30px;
}
.statusStyle {
  padding-left: 80px;
  padding-right: 95px;
}
.forbidContaner .el-input__inner{
  width: 100px;
}
.fengjinCon .el-textarea__inner{
  height:23px !important;
}
.fengTable{
  margin-top: 100px;
}
</style>
<template>
  <div class="forbidContaner">
    <el-form ref="form" :model="form" label-width="110px" :rules="ruleValidate">
      <el-form-item label="平台" prop="channel">
        <el-select v-model="form.channel" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.id"
            :label="item.desc"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="userID" prop="userid">
        <el-input v-model="form.userid" style="width:200px;margin-right:30px" />
        <el-button type="primary" @click="toSearch('form')">状态查询</el-button>
        <!-- <el-button type="primary" @click="aaa()">查询</el-button> -->
      </el-form-item>

      <el-form-item label="昵称">
        <span v-if="judgecode" class="statusStyle">{{ form.userName }}</span>
      </el-form-item>
      <el-form-item label="玩家当前状态">
        <span v-if="form.status==1&&judgecode" class="statusStyle">封号状态</span>
        <span v-if="form.status==2&&judgecode" class="statusStyle">正常状态</span>
      </el-form-item>
      <el-form-item v-if="judgecode===1" label="操作原因">
        <el-input v-model="form.content" :autosize="{ minRows: 6 }" type="textarea" style="width:400px;" />
      </el-form-item>
      <el-form-item v-if="judgecode===1" label="封禁时间">
        <el-input
          v-model="form.fengjinTime"
          class="fengjinCon"
          type="number"
          style="width:100px !important; "
        />天
      </el-form-item>
      <!-- v-if="form.status===0||form.status===2" @click="toForbidden" -->
      <el-button v-if="judgecode===1" type="primary" :disabled="!isManage" @click="toForbidden('form')">立即封号</el-button>
      <el-button v-if="form.status==1&&judgecode===1" type="primary" :disabled="!isManage" @click="toRelease('form')">解封</el-button>
    </el-form>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Fenghao',
  data() {
    return {
      isManage: false,
      judgecode: '',
      form: {
        userid: '',
        userName: '',
        content: '',
        status: null,
        channel: '',
        fengjinTime: ''
      },
      channelOptions: [
      ],
      ruleValidate: {
        userid: [
          { required: true, message: '用户userid', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择平台', trigger: 'blur' },
          { type: 'number', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'mypermissions'
    ])
  },
  created() {
    if (this.mypermissions.indexOf('封号') > -1) {
      this.isManage = true
    }
  },
  methods: {
    toRelease() {
    },
    toForbidden() {
    },
    toSearch() {
    }
  }
}
</script>
