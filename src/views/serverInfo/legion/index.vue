<style>
    span.detailStyle,a.detailStyle{
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
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
    width: 600px;
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

      <el-form ref="form" :inline="true" :model="form" class="demo-form-inline" :rules="ruleValidate">

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
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="form.id" placeholder="请输入roleid" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        class="leftTable"
        style="float: left;width: calc(100% - 120px);margin-bottom:30px"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >

        <el-table-column label="军团id" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.legionId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="军团name" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="军团等级" width="80">
          <template slot-scope="scope">
            {{ scope.row.level }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="军团人数" width="90">
          <template slot-scope="scope">
            {{ scope.row.memberCount }}
          </template>
        </el-table-column>
        <el-table-column label="军团所在服" align="center" width="100">
          <template slot-scope="scope">
            {{ scope.row.serverId }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="foundTs" label="军团创建时间" width="160">
          <template slot-scope="scope">
            <span> {{ scope.row.foundTs*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="团长id" align="center" width="90">
          <template slot-scope="scope">
            {{ scope.row.tuanId }}
          </template>
        </el-table-column>

        <el-table-column label="团长name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tuanName }}</span>

          </template>
        </el-table-column>

      </el-table>
      <el-button v-if="list&&list.length" type="danger" :disabled="list&&list.length&&list[0].level>3" style="float: right;margin-right: 20px" @click="del()">解散</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="listDetail"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="玩家id" align="center" prop="userId">
        <template slot-scope="scope">
          <el-button type="text" @click="changetabel(scope.row)">{{ scope.row.userId }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="玩家name" align="center" prop="name" />
      <el-table-column label="玩家职务" align="center">
        <template slot-scope="scope">
          <span>{{ Number(scope.row.identity)===1?"团长":(Number(scope.row.identity)===2?"官员":"普通成员") }}</span>
        </template>
      </el-table-column>

      <el-table-column label="玩家等级" align="center" prop="level" />
      <el-table-column label="加入时间" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row.joinTs*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作时间" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row.joinTs*1000 | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="最后登录时间" align="center">
        <template slot-scope="scope">
          <span> {{ scope.row.lastSignTs | dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="kicking(scope.row)">踢人</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="showForbidden" class="forbiddenUser">
      <div class="forbiddenUserBox">
        <div class="forbiddenUserText">
          <!-- 所在服：{{ roleServer }}<br> -->
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
import { getUserInfo, legionInfo, legionDel, getChannelOptions, state, fengUser, getList, getFengUid, legionKickOutPlayer } from '@/api/userMange'
export default {
  name: 'Legion',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      vipLevel: "",
      towerLevel: "",
      buyTotalPrice: "",
      level: "",
      chatState: "",
      num: 1,
      status: "",
      radio: '1',
      // roleServer: "",
      roleUid: "",
      Userid: "",
      textarea: "",
      showForbidden: false,
      list: [],
      listDetail: [],
      apprstate: '',
      listLoading: false,
      channel: null,
      form: {
        id: '',
        channel: null,
        type: null
      },
      channelOptions: [
      ],
      typeOptions: [
        {
          value: 1,
          label: '军团id'
        }, {
          value: 2,
          label: 'roleId'
        }
      ],
      ruleValidate: {
        id: [
          { required: true, message: '用户userid', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请选择平台', trigger: 'blur' },
          { type: 'number', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' },
          { type: 'number', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getChannelOptions({}).then(response => {
      if (response && response.code === 1) {
        this.channelOptions = response.data
      }
    })
  },
  methods: {
    kicking(row) {
      const data = {
        channel: this.form.channel,
        userId: row.userId
      }
      this.$confirm('此操作将踢人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        legionKickOutPlayer(data).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '踢人成功',
              type: 'success'
            })
            this.onSearch("form")
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    onSearch(form) {
      const self = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          legionInfo(this.form).then(response => {
            self.list = []
            self.listDetail = []
            self.listLoading = false
            self.channel = self.form.channel
            if (response && response.code === 1) {
              if (response.data) {
                self.list.push(response.data)
                self.listDetail = response.data.members
              } else {
                const msg = Number(self.form.type) === 1 ? '信息获取失败' : '该玩家当前暂无军团'
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            }
          })
        } else {
          this.$message.error('查询字段不全')
        }
      })
    },
    getData() {
      const self = this
      legionInfo(this.form).then(response => {
        self.list = []
        self.listDetail = []
        self.listLoading = false
        self.channel = self.form.channel
        if (response && response.code === 1) {
          if (response.data) {
            self.list.push(response.data)
            self.listDetail = response.data.members
          } else {
            const msg = Number(self.form.type) === 1 ? '信息获取失败' : '该玩家当前暂无军团'
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        }
      })
    },
    del() {
      const self = this
      this.$confirm('解散操作不可逆，您确定解散该军团?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        legionDel({ legionId: self.list[0].legionId, channel: self.channel }).then(response => {
          if (response && response.code === 1) {
            self.getData()
            self.$message({
              type: 'success',
              message: '该军团已解散'
            })
          }
        })
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消解散'
        })
      })
    },
    handleChange(value) {
      console.log(value);
    },

    async changetabel(row) {
      console.log(row);
      this.showForbidden = true
      this.roleServer = row.serverId
      this.roleUid = row.userId
      const getUserPid = "getUserPid"
      const list = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      const UserInfoRes = await getUserInfo(list)
      console.log(UserInfoRes);
      const UserInfoData = UserInfoRes.data.roles
      console.log(UserInfoData, 'UserInfoData');

      function a() {
        for (let i = 0; i < UserInfoData.length; i++) {
          if (row.userId === UserInfoData[i].roleId) {
            return UserInfoData[i]
          }
        }
      }
      a()
      const b = a()
      console.log(b, "bbbbb");
      this.buyTotalPrice = b.buyTotalPrice
      this.level = b.level
      this.vipLevel = b.vipLevel
      this.towerLevel = b.towerLevel
      const type = {
        roleId: this.roleUid,
        channel: this.form.channel
      }
      state(type).then(res => {
        this.chatState = res.data.state.state
      })
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
    }
  }
}
</script>
<style>
 .leftTable {
    width: calc(100% - 120px) !important;
  }
</style>

