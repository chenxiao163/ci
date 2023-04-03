<style scoped>
/* 格子奖池 */
.m-label,.m-select-label{
  padding: 5px;
  cursor: pointer;
}
.m-select-label{
  background: #409eff;
  color: #fff;
}
.m-prize{
  width: 100%;
  /* border-top:1px solid #ccc; */
  padding-top:10px;
  border:1px solid #ccc;
}
.m-email{
  padding: 10px 0;
  border:1px solid #ccc;
}
.m-mall{
  padding: 10px 0;
  border:1px solid #ccc;
}
.m-titletip{
  width: 100px;
  /* padding: 10px 10px 0 10px; */
  height: 30px;
  line-height: 30px;
  background:#304156;
  color: #fff;
  text-align: center;
  margin-top: 10px;

}

.m-undoedit{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div class="app-container">
    <!-- 1、活动配置 -->
    <div>
      <el-form
        ref="activeForm"
        :inline="true"
        :model="activeForm"
        label-width="80px"
        :rules="ruleValidate"
      >
        <el-form-item label="活动id">
          <el-select v-model="activeForm.actId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动版本号">
          <el-input v-model="activeForm.actVersion" />
        </el-form-item>
        <el-form-item label="配置来源" prop="whichConf">
          <el-select v-model="activeForm.whichConf" placeholder="请选择">
            <el-option
              v-for="item in whichConfOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="activeForm.actTitle" />
        </el-form-item>
        <el-form-item label="活动消耗道具">
          <el-input v-model="activeForm.consumeItems" />
        </el-form-item>
        <el-form-item label="开始时间" prop="start">
          <el-date-picker
            v-model="activeForm.start"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="end">
          <el-date-picker
            v-model="activeForm.end"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="活动描述" prop="desc">
          <el-input
            v-model="activeForm.desc"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input
            v-model="activeForm.detail"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="是否开启主城图标">
          <el-radio-group v-model="activeForm.isOpenIcon.value">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 是的情况下显示名称、图源、时间 -->
        <el-form-item v-if="activeForm.isOpenIcon.value === 1" label="名称">
          <el-input v-model="activeForm.isOpenIcon.name" />
        </el-form-item>
        <el-form-item v-if="activeForm.isOpenIcon.value === 1" label="图源">
          <el-input v-model="activeForm.isOpenIcon.url" />
        </el-form-item>
      </el-form>
    </div>
    <p style="color:red">备注：配置来源、开始时间、结束时间、活动描述为每个配置提交必填项</p>
    <!-- *************以下内容是需要输入活动id才展示的配置内容************ -->
    <!-- 2、奖池配置 -->
    <div class="m-titletip">奖池配置</div>
    <div class="m-prize">
      <PrizePoolConfig :active-form="activeForm" />
    </div>

    <!-- 3、邮件配置 -->
    <div class="m-titletip">邮件配置</div>
    <div class="m-email">
      <EmailConfig :which-conf="activeForm.whichConf" :active-form="activeForm" />
    </div>

    <!-- 4、商城配置 -->
    <div class="m-titletip">商城配置</div>
    <div class="m-mall">
      <MallConfig :active-form="activeForm" />
    </div>

    <!-- 登录弹框 -->
    <div>
      <LoginModal />
    </div>

    <div style="padding:20px;" class="m-undoedit">
      <el-button type="primary" @click="handleUndoEdit">撤销修改</el-button>
    </div>

  </div>
</template>
<script>
import PrizePoolConfig from './prizePoolConfig.vue'
import EmailConfig from './emailConfig.vue'
import MallConfig from './mallConfig.vue'
import LoginModal from '../components/loginModal.vue'
import { addActiveConfig } from '@/api/activeConfiguration'
export default {
  components: {
    PrizePoolConfig,
    EmailConfig,
    MallConfig,
    LoginModal
  },
  /**
   * TODO 1、奖池配置字段待确定 8.3
   */
  data() {
    return {
      /** 活动配置 */
      activeForm: {
        actId: 'bingo', // 活动id
        actVersion: '', // 活动版本号
        whichConf: '', // 配置来源
        actTitle: '', // 活动名称
        consumeItems: '', // 活动的消耗道具
        start: '', // 开始时间
        end: '', // 结束时间
        desc: '', // 活动描述
        detail: '', // 活动详情
        isOpenIcon: {
          value: 1, // 是否开启主城图标1代表是2代表否
          name: '', // 名称
          url: '', // 图源
          time: ''// 时间
        },
        endDate: null
      },
      ruleValidate: {
        start: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        end: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        whichConf: [
          { required: true, message: "请选择配置来源", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请填写活动描述", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      },
      options: [// 活动id
        { label: 'bingo', value: "bingo" }
      ],
      whichConfOption: [
        { label: '测试服', value: 'trunk' },
        { label: 'check', value: 'check' },
        { label: 'online', value: 'online' },
        { label: '微乐', value: 'hlwl' }
      ],
      timer: null
    }
  },

  watch: {

  },

  mounted() {
    this.timer = setTimeout(() => {
      // alert('daos')
      this.logout()
    }, 10800000)

    // 3 时(小时)=10800000 毫秒
  },

  beforeDestroy() {
    window.clearTimeout(this.timer)
  },

  methods: {
    // 退出登录
    logout() {
      const data = {
        jsonrpc: "2.0",
        method: "bingo.logout",
        id: "1",
        params: {
          whichConf: localStorage.getItem('svnWhichConf'),
          username: localStorage.getItem('svnUserName')
        }
      }
      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.$message.success(res.msg)
          localStorage.removeItem('svnUserName')
          localStorage.removeItem('svnWhichConf')
          location.reload()
          this.$router.go(0)
        }
      })
    },

    // 撤销修改
    handleUndoEdit() {
      const data = {
        jsonrpc: "2.0",
        method: "bingo.clear_buffer",
        id: "1",
        params: {
          whichConf: localStorage.getItem('svnWhichConf'),
          username: localStorage.getItem('svnUserName')
        }
      }
      addActiveConfig(data).then(res => {
        console.log('res', res)
      })
    }
  }
}
</script>
