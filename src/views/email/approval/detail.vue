<style>
.detailP {
  margin-bottom: 40px;
  font-size: 16px;
  word-break: break-all;
  line-height: 30px;
}
.detailP label {
  display: inline-block;
  width: 100px;
  font-weight: 400;
}
label.fu {
  position: relative;
}
.detailP p {
  margin-left: 100px;
  display: inline-block;
}
.detailDiv {
  position: relative;
  margin-bottom: 40px;
  min-height: 10px;
}
.detailDiv label {
  font-weight: 400;
  position: absolute;
  left: 0;
  top: 0;
}
.valFu {
  font-size: 16px;
  margin-left: 100px;
}
.detialContainer {
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
      {{ myDatas.appli_time | dateformat("YYYY-MM-DD HH:mm:ss") }}
    </p>
    <p class="detailP">
      <label for="">邮件类别：</label>
      {{ myDatas.email_type === "1" ? "定向邮件" : "全服邮件" }}
    </p>
    <p v-if="Number(myDatas.channel)" class="detailP">
      <label for="">发送平台：</label>
      {{ myDatas.channelName }}
    </p>
    <p v-if="myDatas.serverid" class="detailP">
      <label for="">发送区服：</label>
      {{ myDatas.serverids }}
    </p>
    <p v-if="myDatas.uids" class="detailP">
      <label for="">玩家uid：</label>
      {{ myDatas.uids.join(",") }}
    </p>
    <p class="detailP">
      <label for="">邮件名称：</label>
      {{ myDatas.title }}
    </p>
    <p v-if="gameType" class="detailP">
      <label for="">邮件类型：</label>
      {{ myDatas.mail_type_desc }}
    </p>
    <p class="detailP">
      <label for="">邮件内容：</label>
      {{ myDatas.content }}
    </p>
    <div class="detailDiv">
      <label for="" class="fu">附件：</label>
      <div v-for="item in myDatas.appendix" :key="item.item" class="valFu">
        <p>{{ item.name }}*{{ item.count }}</p>
      </div>
    </div>
    <div v-if="myDatas.products && myDatas.products.length" class="detailDiv">
      <label for="" class="fu">礼包：</label>
      <div v-for="item in myDatas.products" :key="item.item" class="valFu">
        <p>{{ item.name }}*{{ item.count }}</p>
      </div>
    </div>
    <p v-if="myDatas.send_type === '1'" class="detailP">
      <label for="">发放时间：</label>
      {{ myDatas.update_time | dateformat("YYYY-MM-DD HH:mm:ss") }}
    </p>
    <p class="detailP">
      <label for="">发放原因：</label>
      {{ myDatas.send_reason }}
    </p>
    <p v-if="gameType" class="detailP">
      <label for="">开始时间：</label>
      {{ myDatas.send_mailtyp_time }}
    </p>
    <p
      v-if="isManage && myDatas.user_name !== name && myDatas.send_type === '2'"
      class="detailP"
    >
      <el-button type="primary" style="margin-right:40px" @click="approval">
        通过
      </el-button>
      <el-button type="danger" @click="reject">驳回</el-button>
    </p>

    <p
      v-if="myDatas.user_name === name && myDatas.send_type !== '1'"
      class="detailP"
    >
      <el-button
        v-if="myDatas.send_type === '4'"
        type="primary"
        style="margin-right:40px"
        @click="edit"
      >
        修正
      </el-button>
      <el-button
        v-if="myDatas.send_type === '3'"
        type="primary"
        style="margin-right:40px"
        @click="toAction"
      >
        发送
      </el-button>
      <el-button
        v-if="myDatas.send_type === '2'"
        type="primary"
        style="margin-right:40px"
        @click="toBack"
      >
        撤回
      </el-button>
      <el-button type="danger" @click="cancel">返回</el-button>
    </p>

    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>
        你确认要
        <span style="color:red">{{ emailType }} {{ myDatas.title }} </span>
        这条邮件?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { emailDetai, emailAction } from "@/api/email";
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      myDatas: {
        appendix: [],
        products: [],
        appli_name: "",
        appli_time: "",
        content: "",
        email_type: "",
        id: "",
        send_reason: "",
        send_mailtyp_time: "",
        send_type: "",
        serverid: null,
        title: "",
        uids: null,
        update_time: "",
        user_name: "",
        serverids: "",
        mail_type: ""
      },
      isManage: false,
      emailTitle: "",
      emailType: "",
      actionType: null,
      emailId: "",
      centerDialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["name", "mypermissions"]),
    gameType() {
      return this.$store.state.app.gameName.includes("捕鱼");
    }
  },
  mounted() {
    this.fetchData();
    if (this.mypermissions.indexOf("邮件详情") > -1) {
      this.isManage = true;
    }
  },
  created() {
    this.fetchData();
    if (this.mypermissions.indexOf("邮件详情") > -1) {
      this.isManage = true;
    }
  },
  methods: {
    approval() {
      this.emailType = "通过";
      this.actionType = 3;
      this.centerDialogVisible = true;
    },
    edit() {
      var paths = this.myDatas.send_type === "1" ? "/email/ori" : "/email/full";
      // eslint-disable-next-line object-curly-spacing
      this.$router.push({ path: paths, query: { id: this.myDatas.id } });
    },
    toAction() {
      this.emailType = "发送";
      this.actionType = 1;
      this.centerDialogVisible = true;
    },
    toBack() {
      this.emailType = "撤回";
      this.actionType = 5;
      this.centerDialogVisible = true;
    },
    cancel() {
      this.$router.push({ path: "/email/approval" });
    },

    reject() {
      this.emailType = "拒绝";
      this.actionType = 4;
      this.centerDialogVisible = true;
    },
    confirm() {
      var query = {
        id: this.$route.params.id,
        type: this.actionType,
        appli_name: this.$store.state.user.name
      };
      this.centerDialogVisible = false;
      emailAction(query).then(response => {
        if (response && response.code === 1) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.$router.push({ path: "/email/approval" });
        }
      });
    },
    fetchData() {
      this.listLoading = true;
      var self = this;
      var query = { id: this.$route.params.id };
      emailDetai(query).then(response => {
        self.myDatas = response.data;
        var str = "";
        if (self.myDatas && self.myDatas.serverid) {
          if (
            self.myDatas.serverid.length === 1 &&
            self.myDatas.serverid[0] === "-1"
          ) {
            self.myDatas.serverids = "所有区服";
          } else {
            self.myDatas.serverid.forEach(element => {
              str += "S" + element + ",";
            });
            self.myDatas.serverids = str.substring(0, str.length - 1);
          }
        }
      });
    }
  }
};
</script>
