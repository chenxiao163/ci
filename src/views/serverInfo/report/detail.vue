<style scoped>
    .detailP{
        margin-bottom: 25px;
        font-size: 16px;
        word-break: break-all;
        line-height: 30px;
    }
    .detailP label{
        display: inline-block;
        width: 100px;
        font-weight: 400;
    }
    label.fu{
        position: relative;
    }
    .detailP>p{
        display: inline-block;
        width: 80%;
        margin:0;
        padding: 0;
    }
    span.markStyle{
       display: inline-block;
        width: 80%;
        height: 25px;
        line-height: 25px;
    }
    .detailDiv{
        position: relative;
        margin-bottom: 40px;
    }
    .detailDiv label{
        font-weight: 400;
        position:absolute;
        left: 0;
        top:0;
    }
    .valFus{
        font-size: 16px ;
        display: inline-block;
    }
    .detialContainer{
        margin: 50px;
    }

</style>
<template>
  <div v-if="myDatas" class="detialContainer">
    <p class="detailP">
      <label for="">平台：</label>
      {{ channelName }}
    </p>
    <p class="detailP">
      <label for="">举报人id：</label>
      {{ myDatas.userId }}
    </p>
    <p class="detailP">
      <label for="">举报人昵称：</label>
      {{ myDatas.nickName }}
    </p>
    <p class="detailP">
      <label for="">被举报id：</label>
      {{ myDatas.reportedUserId }}
    </p>
    <p class="detailP">
      <label for="">被举报昵称：</label>
      {{ myDatas.reportedNickName }}
    </p>
    <p class="detailP">
      <label for="">举报类型：</label>
      {{ Number(myDatas.type)===1?'昵称违规':(Number(myDatas.type)===2?'发言违规':'其它') }}
    </p>
    <p class="detailP">
      <label for="">举报时间：</label>
      {{ myDatas.ts*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}
    </p>
    <p class="detailP">
      <label for="">具体内容：</label>
      {{ Number(myDatas.type)===2 ? myDatas.chats.join(','): myDatas.desc }}
    </p>
    <p v-if="myDatas.handleType===1" class="detailP">
      <label for="">处理结果：</label>
      {{ myDatas.handleDesc }}
    </p>
    <p v-else class="detailP">
      <label for="" style="vertical-align: top;">处理结果：</label>
      <el-input v-model="myDatas.handleDesc" style="width: 80%" placeholder="可输入50字" :autosize="{ minRows: 3 }" maxlength="50" type="textarea" />
    </p>
    <p v-if="myDatas.handleType===1" class="detailP">
      <label for="">处理人：</label>
      {{ myDatas.handleUser }}
    </p>
    <div v-if="myDatas.handleType===1" class="detailP">
      <label for="" style="vertical-align: top;">备注：</label>
      <p>
        <template v-for="(mark,i) in myDatas.remark">
          <span :key="i" class="markStyle">
            {{ mark }}
          </span>
        </template>
        <el-input v-if="myDatas.remark.length<5" v-model="remarks" style="width: 100%" placeholder="可输入50字" :autosize="{ minRows: 3 }" maxlength="50" type="textarea" />
        <span style="font-size: 13px;color: #ccc;display: inline-block;width:80%">
          备注最多可添加5条
        </span>
      </p>
    </div>
    <p class="detailP">
      <el-button type="primary" :disabled="!isManage" style="margin-right:40px" @click="approval">确认</el-button>
      <el-button type="danger" @click="cancel">返回</el-button>
    </p>

  </div>
</template>
<script>
import { commentReport, reportDatail, handleReport } from '@/api/userMange'
import { mapGetters } from 'vuex'
export default {
  name: 'Reportdetail',
  data() {
    return {
      myDatas: {
        isManage: false,
        userId: null,
        userNickName: '',
        channelName: '',
        id: '',
        reportedUserId: null,
        reportedNickName: '',
        type: null,
        ts: null,
        chats: [],
        desc: '',
        handleType: null,
        handleDesc: '',
        handleUser: '',
        remark: []
      },
      remarks: '',
      channel: 2
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'mypermissions'
    ])
  },
  watch: {
    $route(val) {
      this.channel = this.$route.query.channel || null
      if (this.$route.query.id) {
        this.getData(this.$route.query.id, this.channel)
      }
    }
  },
  created() {
    if (this.mypermissions.indexOf('举报详情') > -1) {
      this.isManage = true
    }
    this.channel = this.$route.query.channel || null
    if (this.$route.query.id) {
      this.getData(this.$route.query.id, this.channel)
    }
  },
  methods: {
    approval() {
      const self = this
      const reportdesc = this.myDatas.handleType === 1 ? this.remarks : this.myDatas.handleDesc
      if (!reportdesc) {
        const msg = this.myDatas.handleType === 1 ? '备注不得为空' : '处理结果不得为空'
        self.$message({
          message: msg,
          type: 'warning'
        })
        return false
      }
      const request = {
        id: this.myDatas.id,
        desc: reportdesc,
        channel: this.channel
      }
      if (this.myDatas.handleType === 1) {
        commentReport(request).then(res => {
          if (res && res.code === 1) {
            self.$message({
              message: '操作成功',
              type: 'success'
            })
            self.getData(this.myDatas.id)
          }
        })
      } else {
        handleReport(request).then(res => {
          if (res && res.code === 1) {
            self.$message({
              message: '操作成功',
              type: 'success'
            })
            self.getData(this.myDatas.id)
          }
        })
      }
    },
    cancel() {
      this.$router.push({ path: '/serve/report' })
    },
    getData(id, channel) {
      var self = this
      reportDatail({ id: id, channel: channel }).then(response => {
        if (response && response.code === 1) {
          self.myDatas = response.data.report
          self.channelName = response.data.channelName
        }
      })
    }
  }
}
</script>

