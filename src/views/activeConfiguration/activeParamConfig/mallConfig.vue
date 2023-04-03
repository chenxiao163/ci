<style scoped>
.m-savemall{
   width: 100%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
}
</style>
<template>
  <div>
    <el-form ref="ruleValidate" :model="mallForm" label-width="100px" :inline="true" :rules="ruleValidate">
      <el-form-item label="选择商城" prop="mallValue">
        <el-select v-model="mallForm.mallValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleAddGoods">新增</el-button>
        <AddGoodsModal ref="addGoodsMethods" :active-form="activeForm" :mall-form="mallForm" />
      </el-form-item>

      <el-form-item label="商城名称" prop="mallName">
        <el-input v-model="mallForm.mallName" />
      </el-form-item>

      <el-form-item label="商城图标" prop="mallIcon">
        <el-input v-model="mallForm.mallIcon" />
      </el-form-item>

      <el-form-item label="开始时间" prop="mallStartTime">
        <el-date-picker
          v-model="mallForm.mallStartTime"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="结束时间" prop="mallEndTime">
        <el-date-picker
          v-model="mallForm.mallEndTime"
          type="datetime"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      selectable
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="index"
        label="序号"
        width="180"
      />
      <el-table-column
        prop="goodsId"
        label="商品id"
        width="180"
      />
      <el-table-column
        prop="gift"
        label="礼包"
        width="180"
      />
      <el-table-column
        prop="startdate"
        label="开始时间"
        width="180"
      />
      <el-table-column
        prop="enddate"
        label="结束时间"
        width="180"
      />
      <el-table-column
        prop="type"
        label="商品类型"
      />

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="primary" size="mini" @click="copyRow(scope.row)">复制</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <div class="m-savemall">
      <el-button type="primary" @click="handleMallSave('ruleValidate')">保存</el-button>
    </div>
    <SaveModal ref="svaeModalMethods" :desc="activeForm.desc" :start="activeForm.start" :end="activeForm.end" />
  </div>
</template>
<script>
import AddGoodsModal from './addGoodsModal.vue'
import { copyText } from '@/utils/copy.js'
import { addActiveConfig } from '@/api/activeConfiguration'
import SaveModal from '../components/saveModal.vue'
export default {
  components: {
    AddGoodsModal,
    SaveModal
  },
  props: {
    activeForm: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      mallForm: {
        mallValue: '', // 选择商城
        mallName: '', // 商城名称
        mallIcon: '', // 商城图标
        mallStartTime: '', // 商城开始时间
        mallEndTime: ''// 商城结束时间
      },
      options: [{
        value: 'twoWayShop',
        label: 'twoWayShop'
      }, {
        value: 'twoWayShop2',
        label: 'twoWayShop2'
      }, {
        value: 'twoWayShop3',
        label: 'twoWayShop3'
      }, {
        value: 'twoWayShop4',
        label: 'twoWayShop4'
      }, {
        value: 'twoWayShop5',
        label: 'twoWayShop5'
      }],
      value: '',
      tableData: [{
        index: '1',
        goodsId: 'h5_125',
        gift: '激情礼包',
        startdate: '2016-05-02',
        enddate: '2016-05-02',
        type: '军团共享'
      }],
      ruleValidate: {
        mallStartTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        mallEndTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        mallName: [
          { required: true, message: "请填写商城名称", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        mallIcon: [
          { required: true, message: "请填写商城图标", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ],
        mallValue: [
          { required: true, message: "请选择商城", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      }
    }
  },

  watch: {
    'activeForm.start'(val) {
      this.mallForm.mallStartTime = val
    },
    'activeForm.end'(val) {
      this.mallForm.mallEndTime = val
    }
  },

  methods: {
    // 商城保存
    handleMallSave(form) {
      const data = {
        jsonrpc: "2.0",
        method: "bingo.week_acts_tc",
        id: "1",
        params: {
          username: localStorage.getItem('svnUserName'),
          whichConf: this.activeForm.whichConf,
          start: this.mallForm.mallStartTime,
          end: this.mallForm.mallEndTime,
          shopName: this.mallForm.mallValue,
          name: this.mallForm.mallName,
          pic: this.mallForm.mallIcon
        }

      }

      this.$refs[form].validate(validate => {
        if (validate) {
          if (!this.activeForm.whichConf) {
            this.$message.warning('请选择配置来源')
            return
          }
          addActiveConfig(data).then(res => {
            if (res.code === 1) {
              this.$message.success('商城配置保存成功')
              this.$refs.svaeModalMethods.showModal()
            }
          })
        }
      })
    },

    copyRow(row) {
      const txt = Object.values(row).join()
      copyText(txt)
      this.$message.success('复制成功')
    },

    // 新增商品
    handleAddGoods() {
      this.$refs.addGoodsMethods.showAddGoodsModal()
    }
  }
}
</script>

