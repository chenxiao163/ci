<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    }
    .logform .el-date-editor span.el-range-separator{
      padding: 0;
    }
    button.miniButton{
      border: 0;
      padding: 0;
    }
   .forbiddenUser{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    overflow: hidden;
  }
  .forbiddenUserBox{
    width: 500px;
    height: 550px;
    background: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 15px;

  }
  .cancle{
    width: 60px;
    height: 30px;
    position: absolute;
    bottom: 23px;
    right: 20%;
  }
  .confirmBtn{
    width: 60px;
    height: 30px;
    position: absolute;
    bottom: 23px;
    left:20%;

  }
  .forbiddenUserText{
    display: table-cell;
    vertical-align:middle;
    width:300px;
    height: 100px;
    padding-left:20%;
    text-align: left;
    line-height:30px;
  }
  .forbiddenOperate{
    vertical-align:middle;
    width:300px;
    text-align: left;
    line-height:30px;
    padding-left:12%;
    font-size :12px;;
  }
  .forbiddenfen{
    vertical-align:middle;
    text-align: left;
    line-height:30px;
    padding-left:12%
  }
  .statusStyle{
    margin-left: 60px;
    color:red;
  }
</style>
<template>
  <div class="app-container">
    <div>
      <el-form ref="form" :inline="true" :model="form" :rules="ruleValidate" class="demo-form-inline logform">
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
        <el-form-item label="大区选择" prop="partitionId">
          <el-select v-model="form.partitionId" filterable placeholder="请选择">
            <el-option
              v-for="item in typOptions"
              :key="item.partitionId"
              :label="item.partitionName"
              :value="item.partitionId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区服">
          <el-select v-model="form.serverId" filterable clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in serveOptions"
              :key="index+'serve'"
              :label="item.key"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" clearable placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="form.keywords" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column min-width="120" label="军团ID" align="center" prop="legionId" />
      <el-table-column label="军团长id" sortable min-width="110" align="center" prop="tuanId">
        <template slot-scope="scope">
          <el-button type="text" @click="changetuanId(scope.row)">{{ scope.row.tuanId }}</el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="120" label="军团name" align="center" prop="name" />
      <el-table-column align="center" label="军团等级" min-width="90" prop="level" />
      <el-table-column label="军团所在服" min-width="90" align="center" prop="serverId">
        <template slot-scope="scope">
          <span>S</span>{{ scope.row.serverId }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="军团长ID" min-width="90" prop="" /> -->
      <el-table-column
        align="center"
        label="发布人ID"
        min-width="90"
        prop="publish_user_id"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="changetabel(scope.row)">{{ scope.row.publish_user_id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="公告修改时间" sortable min-width="130" align="center" prop="notice_chg_ts">
        <template slot-scope="scope">
          <span v-if="scope.row.notice_chg_ts">{{ scope.row.notice_chg_ts * 1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="军团公告" min-width="230" align="center" prop="notice" />
      <el-table-column v-if="form.type!=='2'" label="操作" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="isManage" class="detailStyle" @click="toReset(scope.row)">重置</span>
          <span v-else> - </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        v-show="count>0"
        :current-page.sync="form.page"
        :page-sizes="[10, 20, 50, 100, 200, 500 ]"
        :page-size="form.limit"
        layout="total,sizes, prev, pager, next"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-show="showForbidden" class="forbiddenUser">
      <div class="forbiddenUserBox">
        <div class="forbiddenUserText">
          所在服：{{ roleServer }}<br>
          roleid：{{ roleUid }}<br>
          UserID：{{ Userid }}<br>
          充值金额：{{ buyTotalPrice }}<br>
          等级：{{ level }}<br>
          VIP等级：{{ vipLevel }}<br>
          试炼层级：{{ towerLevel }}<br>
        </div>
        <span v-if="chatState===1" class="statusStyle">当前聊天状态为：禁言状态</span><br>
        <span v-if="chatState===0" class="statusStyle">当前聊天状态为：正常状态</span><br>
        <span v-if="status==1" class="statusStyle">当前封号状态为：封号状态</span><br>
        <span v-if="status==2" class="statusStyle">当前封号状态为：正常状态</span><br>
        <div class="forbiddenOperate">
          <span>操作</span>
          <el-radio v-model="radio" label="1" style="margin-left: 20px;">禁言</el-radio>
          <el-radio v-model="radio" label="2">封号</el-radio>
        </div>
        <div class="forbiddenfen">
          <el-form ref="form" :model="form">
            <el-form-item label="操作原因：">
              <el-input
                v-model="textarea"
                type="textarea"
                :rows="2"
                placeholder="请输入操作原因"
                style="height: 80px; margin-right:100px"
              />
            </el-form-item>
            <el-form-item label="封禁天数：" style="margin-top:-25px">
              <el-input-number v-model="num" controls-position="right" :min="1" :max="9999999999" @change="handleChange" />天
            </el-form-item>
          </el-form>
        </div>
        <button type="button" class="cancle" @click="cancle()">取消</button>
        <button type="button" class="confirmBtn" @click="confirmForbidden(roleUid)">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getLegionList, resetlegionAds, getChannelOptions, getServeoptions, getList, state, fengUser, getFengUid } from '@/api/userMange'
// import { getUids } from '@/api/log'
import { mapGetters } from 'vuex'
export default {
  name: 'LegionAds',
  data() {
    return {
      vipLevel: "",
      towerLevel: "",
      buyTotalPrice: "",
      level: "",
      chatState: "",
      status: '',
      userName: '',
      num: 1,
      radio: '1',
      roleServer: "",
      roleUid: "",
      Userid: "",
      textarea: "",
      showForbidden: false,
      count: null,
      list: null,
      listLoading: false,
      isManage: false,
      form: {
        channel: '',
        serverId: '',
        partitionId: '',
        type: '1',
        page: 1,
        limit: 10,
        keywords: ""

      },
      channelOptions: [
      ],
      typOptions: [
      ],
      serveOptions: [
      ],
      typeOptions: [
        {
          value: '1',
          label: '公告'
        }, {
          value: '2',
          label: '邮件'
        }
      ],
      ruleValidate: {
        channel: [
          { required: true, message: '请选择平台', trigger: ['blur', 'change'] }
        ],
        partitionId: [
          { required: true, message: '请选择大区', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'mypermissions'
    ])
  },
  watch: {
    'form.channel'() {
      this.getOptions()
    },
    'form.type'() {
      this.form.page = 1
      this.fetchData()
    },
    'form.serverId'(val) {
      this.form.page = 1
    },
    'form.partitionId'(val) {
      this.form.page = 1
      const self = this
      this.form.serverId = null
      if (this.form.channel) {
        // this.fetchData()
        this.typOptions.forEach(ele => {
          if (ele.partitionId === val) {
            self.serveOptions = ele.servers
          }
        })
      }
    }
  },
  created() {
    if (this.mypermissions.indexOf('军团公告监控') > -1) {
      this.isManage = true
    }
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
  },
  methods: {
    confirmForbidden() {
      if (!this.textarea.trim()) {
        this.$message.error('请填写操作原因!');
      } else {
        // 禁言
        var request = {
          opt_content: '禁言',
          roleId: this.roleUid,
          state: 1,
          channel: this.form.channel,
          fomChat: 1,
          opt_reason: this.textarea,
          days: this.num
        }
        // 封号
        var data = {
          opt_content: '封号',
          uid: this.Userid,
          type: 1,
          state: 1,
          channel: this.form.channel,
          fomChat: 1,
          opt_reason: this.textarea,
          expiration: this.num.toString()
        }
        if (this.radio === '1') {
          state(request).then(response => {
            if (!response.data) {
              this.$message.error('操作失败！')
            } else {
              this.canForbidden = false
              this.$message({
                message: '禁言成功',
                type: 'success'
              })
            }
          })
          this.showForbidden = false
        } else {
          fengUser(data).then(response => {
          // self.list.push(response.data)
            if (response.code === 1) {
              this.$message({
                message: '封号成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: response.msg,
                type: 'info'
              })
            }
          })
          this.showForbidden = false
        }
      }
    },

    handleChange(value) {
      console.log(value);
    },
    async changetabel(row) {
      this.roleServer = ""
      this.roleUid = ""
      this.Userid = ""
      this.buyTotalPrice = ""
      this.level = ""
      this.vipLevel = ""
      this.towerLevel = ""
      this.showForbidden = true
      this.roleServer = row.serverId
      this.roleUid = row.publish_user_id
      const getUserPid = "getUserPid"
      const list = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      const UserInfoRes = await getUserInfo(list)
      const UserInfoData = UserInfoRes.data.roles

      function a() {
        for (let i = 0; i < UserInfoData.length; i++) {
          if (row.publish_user_id === UserInfoData[i].roleId) {
            return UserInfoData[i]
          }
        }
      }
      a()
      const b = a()
      const type = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      state(type).then(res => {
        this.chatState = res.data.state.state
      })
      this.buyTotalPrice = b.buyTotalPrice
      this.level = b.level
      this.vipLevel = b.vipLevel
      this.towerLevel = b.towerLevel
      const request = {
        roleId: this.roleUid,
        method: getUserPid,
        channel: this.form.channel
      }
      const res = await getList(request, this.form.channel)
      if (res.retcode === 1) {
        this.Userid = res.data.pid
        console.log(this.Userid)
      }
      const data = {
        roleId: this.Userid,
        channel: this.form.channel
      }
      const response = await getFengUid(data)
      if (response.code === 1) {
        this.status = response.data.status
        this.userName = response.data.userName
      }
    },
    async changetuanId(row) {
      this.roleServer = ""
      this.roleUid = ""
      this.Userid = ""
      this.buyTotalPrice = ""
      this.level = ""
      this.vipLevel = ""
      this.towerLevel = ""
      this.showForbidden = true
      this.roleServer = row.serverId
      this.roleUid = row.tuanId
      const getUserPid = "getUserPid"
      const list = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      const UserInfoRes = await getUserInfo(list)
      console.log(UserInfoRes, 'UserInfoRes');
      const UserInfoData = UserInfoRes.data.roles
      console.log(UserInfoData, 'UserInfoData');

      function a() {
        for (let i = 0; i < UserInfoData.length; i++) {
          if (row.tuanId === UserInfoData[i].roleId) {
            return UserInfoData[i]
          }
        }
      }
      const b = a()
      console.log(b, 'bbbbb');
      const type = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      state(type).then(res => {
        this.chatState = res.data.state.state
      })
      this.buyTotalPrice = b.buyTotalPrice
      this.level = b.level
      this.vipLevel = b.vipLevel
      this.towerLevel = b.towerLevel
      const request = {
        roleId: this.roleUid,
        method: getUserPid,
        channel: this.form.channel
      }
      const res = await getList(request, this.form.channel)
      if (res.retcode === 1) {
        this.Userid = res.data.pid
        console.log(this.Userid)
      }
      const data = {
        roleId: this.Userid,
        channel: this.form.channel
      }
      const response = await getFengUid(data)
      if (response.code === 1) {
        this.status = response.data.status
        this.userName = response.data.userName
      }
    },
    cancle() {
      this.showForbidden = false
      this.Userid = ""
    },
    getOptions() {
      getServeoptions({ channel: this.form.channel }).then(res => {
        if (res.code === 1) {
          this.typOptions = res.data.serverId
        }
      })
    },
    fetchData() {
      getLegionList(this.form).then(response => {
        if (response && response.code === 1) {
          this.list = []
          this.list = response.result.legions
          this.count = Number(response.result.count)
        }
      })
    },
    handleSizeChange(val) {
      this.form.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.form.page = val
      this.fetchData()
    },
    onSearch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fetchData()
        } else {
          this.$message.error('参数缺失')
        }
      })
    },
    toReset(row) {
      const _this = this
      const request = {
        'legionId': row.legionId,
        'partitionId': row.parentId,
        'serverId': row.serverId,
        'channel': this.form.channel
      }
      this.$confirm('确认要重置该条公告吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetlegionAds(request).then(response => {
            if (response && response.code === 1) {
              _this.fetchData()
              _this.$message({
                type: 'success',
                message: '重置成功!'
              })
            }
          })
        })
        .catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    formatTime(date) {
      var d = new Date(date)
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + (d.getDate())) + ' ' + (d.getHours() > 9 ? d.getHours() : '0' + (d.getHours())) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' + (d.getMinutes())) + ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + (d.getSeconds()))
      return datetime
    }
  }
}
</script>
