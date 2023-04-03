<style scoped>
    .detailP{
        margin-bottom: 40px;
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
    .detailP p{
        margin-left: 100px;
        display: inline-block;
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
  <div class="detialContainer">
    <p class="detailP">
      <label for="">申请人：</label>
      {{ myDatas.user_name }}
    </p>
    <p class="detailP">
      <label for="">申请时间：</label>
      {{ myDatas.appli_time | dateformat('YYYY-MM-DD HH:mm:ss') }}
    </p>
    <p v-if="myDatas.channel" class="detailP">
      <label for="">发送平台：</label>
      {{ myDatas.channelName }}
    </p>
    <p v-if="myDatas.uids" class="detailP">
      <label for="">玩家uid：</label>
      {{ myDatas.uids.join(',') }}
    </p>
    <div class="detailDiv">
      <label for="" class="fu">状态操作：</label>
      <div style="margin-left:100px">
        <div v-for="(item,index) in myDatas.appendix" :key="index" class="valFus">
          <span>{{ item.name }} <span v-if="index<myDatas.appendix.length-1"> , </span></span>
        </div>
      </div>
    </div>
    <p v-if="myDatas.send_type==='1'" class="detailP">
      <label for="">发放时间：</label>
      {{ myDatas.update_time | dateformat('YYYY-MM-DD HH:mm:ss') }}
    </p>
    <p class="detailP">
      <label for="">发放原因：</label>
      {{ myDatas.send_reason }}
    </p>
    <p v-if="isManage&&myDatas.user_name!==name&&myDatas.send_type==='2'" class="detailP">
      <el-button type="primary" style="margin-right:40px" @click="approval">通过</el-button>
      <el-button type="danger" @click="reject">驳回</el-button>
    </p>

    <p v-if="myDatas.user_name===name&&myDatas.send_type!=='1'" class="detailP">
      <el-button v-if="myDatas.send_type==='4'" type="primary" style="margin-right:40px" @click="edit">修正</el-button>
      <el-button v-if="myDatas.send_type==='3'" type="primary" style="margin-right:40px" @click="toAction">发送</el-button>
      <el-button v-if="myDatas.send_type==='2'" type="primary" style="margin-right:40px" @click="toBack">撤回</el-button>

      <el-button type="danger" @click="cancel">返回</el-button>
    </p>

    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>你确认要 <span style="color:red">{{ emailType }} {{ myDatas.title }} </span> 这条邮件?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { emailDetai, emailAction } from '@/api/email'
import { mapGetters } from 'vuex'
export default {
  name: 'Statedetail',
  data() {
    return {
      myDatas: {
        appendix: [],
        appli_name: '',
        appli_time: '',
        email_type: '',
        id: '',
        send_reason: '',
        send_time: '',
        send_type: '',
        serverid: null,
        uids: null,
        update_time: '',
        user_name: '',
        serverids: ''

      },
      isManage: false,
      emailTitle: '',
      emailType: '',
      actionType: null,
      emailId: '',
      centerDialogVisible: false

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'mypermissions'
    ])
  },
  mounted() {
    this.fetchData()
    if (this.mypermissions.indexOf('功能状态调整详情') > -1) {
      this.isManage = true
    }
  },
  created() {
    this.fetchData()
    if (this.mypermissions.indexOf('功能状态调整详情') > -1) {
      this.isManage = true
    }
  },
  methods: {
    approval() {
      this.emailType = '通过'
      this.actionType = 3
      this.centerDialogVisible = true
    },
    edit() {
      this.$router.push({ path: '/email/stateAdd', query: { id: this.myDatas.id }})
    },
    toAction() {
      this.emailType = '发送'
      this.actionType = 1
      this.centerDialogVisible = true
    },
    toBack() {
      this.emailType = '撤回'
      this.actionType = 5
      this.centerDialogVisible = true
    },
    cancel() {
      this.$router.push({ path: '/email/stateList' })
    },

    reject() {
      this.emailType = '拒绝'
      this.actionType = 4
      this.centerDialogVisible = true
    },
    confirm() {
      var query = { id: this.$route.query.id, type: this.actionType, appli_name: this.$store.state.user.name }
      this.centerDialogVisible = false
      emailAction(query).then(response => {
        if (response && response.code === 1) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.push({ path: '/email/approval' })
        }
      })
    },
    fetchData() {
      this.listLoading = true
      var self = this
      var query = { id: this.$route.query.id }
      emailDetai(query).then(response => {
        self.myDatas = response.data
      })
    }

  }
}
</script>

