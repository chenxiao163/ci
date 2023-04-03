<style>
span.detailStyle,
a.detailStyle {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
</style>
<template>
  <div class="app-container">
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item v-if="!gameType" label="平台">
          <el-select v-model="query.channel" clearable placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.desc"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户roleid">
          <el-input
            v-model="query.searchUid"
            clearable
            placeholder="请输入roleid"
          />
        </el-form-item>
        <!-- <el-form-item label="申请人">
          <el-input
            v-model="query.appluName"
            clearable
            placeholder="请输入申请人"
          /> -->
        <!-- </el-form-item> -->
        <el-form-item>
          <span class="demonstration">审批时间</span>
          <el-date-picker
            v-model="query.approveTs"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <span class="demonstration">申请时间</span>
          <el-date-picker
            v-model="query.applyTs"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :key="tableIndex"
      v-loading="listLoading"
      :data="datalist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="申请人"
        min-width="110"
        align="center"
        prop="user_name"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="申请时间"
        min-width="160"
      >
        <template slot-scope="scope">
          <span>
            {{ scope.row.appli_time | dateformat("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件名称" align="center" prop="title" />
      <el-table-column align="center" label="邮件类别" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.email_type === "1" ? "定向邮件" : "全服邮件" }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否VIP" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.user_type === "1" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!gameType"
        align="center"
        label="发送平台"
        min-width="100"
        prop="channelName"
      />
      <el-table-column
        v-if="gameType"
        align="center"
        label="邮件类型"
        min-width="100"
        prop="mail_type_desc"
      />
      <el-table-column
        v-if="gameType"
        align="center"
        label="开始时间"
        min-width="100"
        prop="send_mailtyp_time"
      />
      <el-table-column label="邮件详情" min-width="90" align="center">
        <template slot-scope="scope">
          <router-link :key="scope.row.id" :to="'/email/detail/'+scope.row.id" class="detailStyle">
            <!--:to="{ path: '/email/detail/+scope.row.id', query: { id: scope.row.id } }"-->
            查看
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="110" align="center">
        <template slot-scope="scope">
          <router-link
            v-if="
              scope.row.user_name === name &&
                scope.row.send_type === '4' &&
                scope.row.email_type === '0'
            "
            :to="{ path: '/email/full', query: { id: scope.row.id } }"
            class="detailStyle"
          >
            修正
          </router-link>
          <router-link
            v-if="
              scope.row.user_name === name &&
                scope.row.send_type === '4' &&
                scope.row.email_type === '1'
            "
            :to="{ path: '/email/ori', query: { id: scope.row.id } }"
            class="detailStyle"
          >
            修正
          </router-link>
          <span
            v-if="scope.row.user_name === name && scope.row.send_type === '3'"
            class="detailStyle"
            @click="toAction(scope.row.id, scope.row.title, 1)"
          >
            发送
          </span>
          <span
            v-if="scope.row.user_name === name && scope.row.send_type === '2'"
            class="detailStyle"
            @click="toBack(scope.row.email_type, scope.row.id)"
          >
            撤回
          </span>
          <span
            v-if="scope.row.user_name === name && scope.row.send_type === '1'"
          >
            已发送
          </span>
          &nbsp;&nbsp;
          <span
            v-if="isManage"
            class="detailStyle"
            @click="toAction(scope.row.id, scope.row.title, 6)"
          >
            删除
          </span>
          <span v-else-if="scope.row.user_name !== name">-</span>
        </template>
      </el-table-column>

      <el-table-column label="审批状态" min-width="110" align="center">
        <template slot-scope="scope">
          <span v-if="isManage && scope.row.user_name !== name">
            <span v-if="scope.row.send_type !== '2'">{{
              scope.row.send_type === "1"
                ? "已发送"
                : scope.row.send_type === "3"
                  ? "已通过"
                  : "已驳回"
            }}</span>

            <span v-if="scope.row.send_type === '2'">
              <span
                class="detailStyle"
                style="margin-right:10px"
                @click="toAction(scope.row.id, scope.row.title, 3)"
              >
                通过
              </span>
              <span
                class="detailStyle"
                @click="toAction(scope.row.id, scope.row.title, 4)"
              >
                驳回
              </span>
            </span>
          </span>
          <span v-if="(isManage && scope.row.user_name === name) || !isManage">
            {{
              scope.row.send_type === "4"
                ? "已驳回"
                : scope.row.send_type === "3"
                  ? "已通过"
                  : scope.row.send_type === "1"
                    ? "已发送"
                    : "正在审批"
            }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="审批人"
        min-width="110"
        align="center"
        prop="appli_name"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="审批时间"
        min-width="160"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.update_time">
            {{ scope.row.update_time | dateformat("YYYY-MM-DD HH:mm:ss") }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="created_at"
        label="发送时间"
        min-width="160"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.send_time">
            {{ scope.row.send_time | dateformat("YYYY-MM-DD HH:mm:ss") }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        v-show="count > 0"
        :current-page.sync="query.page"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="query.limit"
        layout="total,sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>
        你确认要
        <span style="color:red">{{ emailName }} {{ emailTitle }} </span>
        这条邮件?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { emailDetai, emailAction } from "@/api/email";
import { mapGetters } from "vuex";
import { getChannelOptions } from "@/api/userMange";
export default {
  name: "Approval",
  data() {
    return {
      tableIndex: 0,
      mailType: false,
      centerDialogVisible: false,
      emialAction: "",
      emailTitle: "",
      emailName: "",
      emailType: null,
      emailId: null,
      datalist: null,
      apprstate: "",
      channelOptions: [],
      query: {
        page: 1,
        limit: 10,
        searchUid: "",
        superUser: 0,
        channel: "",
        approveTs: "",
        applyTs: "",
        appluName: ""
      },
      count: null,
      isManage: false,
      listLoading: false,
      confirmLoading: false
    };
  },
  computed: {
    ...mapGetters(["name", "mypermissions"]),
    gameType() {
      return this.$store.state.app.gameName.includes("捕鱼");
    }
  },
  watch: {
    "query.channel"() {
      this.fetchData();
    }
  },
  activated() {
    if (this.mypermissions.indexOf("邮件审批") > -1) {
      this.isManage = true;
    }
    if (!this.gameType) {
      getChannelOptions({}).then(response => {
        if (response && response.code === 1) {
          this.channelOptions = response.data;
        }
      });
    }
    this.fetchData();
  },
  methods: {
    handleSizeChange(val) {
      this.query.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.fetchData();
    },

    fetchData() {
      ++this.tableIndex;
      this.listLoading = true;
      var self = this;
      this.query.superUser = this.isManage ? 1 : 0;
      const data = {
        page: this.query.page,
        limit: this.query.limit,
        searchUid: self.query.searchUid,
        superUser: self.query.superUser,
        channel: self.query.channel,
        approveTimeSt: self.query.approveTs[0],
        approveTimeEt: self.query.approveTs[1],
        applyTimeSt: self.query.applyTs[0],
        applyTimeEt: self.query.applyTs[1]
      }
      emailDetai(data).then(response => {
        self.listLoading = false;
        self.count = Number(response.count);
        self.datalist = response.data;
      });
    },
    confirm() {
      this.confirmLoading = true;
      var query = {
        id: this.emailId,
        type: this.emailType,
        appli_name: this.$store.state.user.name
      };
      emailAction(query).then(response => {
        this.confirmLoading = false;
        if (response && response.code === 1) {
          this.centerDialogVisible = false;
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$message.error(response.msg)
        }
      });
    },
    toAction(id, title, type) {
      this.emailName =
        type === 1 ? "发送" : (this.emailName = type === 3 ? "通过" : "驳回");
      if (type === 6) {
        this.emailName = '删除';
      }
      this.emailTitle = title;
      this.emailType = type;
      this.emailId = id;
      this.centerDialogVisible = true;
    },
    toBack(type, id) {
      var query = { id: id, type: 5, appli_name: this.$store.state.user.name };
      emailAction(query).then(response => {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.fetchData();
      });
    }
  }
};
</script>
