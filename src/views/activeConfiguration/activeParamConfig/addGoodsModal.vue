<style scoped>
.m-content{
height: 500px;
overflow: auto;
}
.el-form-item{
  margin-bottom: 10px;
}
.m-goods-content,.m-award{
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-searchkeywords{
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.m-save{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.m-border{
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
.m-titletip{
  width: 130px;
  /* padding: 10px 10px 0 10px; */
  height: 30px;
  line-height: 30px;
  background:#304156;
  color: #fff;
  text-align: center;
  margin-top: 10px;

}
</style>
<template>
  <el-dialog
    title="商品配置"
    :visible.sync="addGoodsVisible"
    width="1100px"
    :append-to-body="true"
  >
    <div class="m-content">
      <!--商品id、 人民币礼包、开始时间、结束时间 -->
      <el-form
        ref="form1"
        :inline="true"
        :model="form1"
        label-width="150px"
      >
        <!-- 商品id -->
        <el-form-item label="商品id">
          <el-input v-model="form1.goodsId" />
        </el-form-item>

        <!-- 人民币礼包 -->
        <el-form-item label="商品类型">
          <el-select v-model="form1.gifts" placeholder="请选择" @change="handleMoneyGifts">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 商城名称 -->
        <el-form-item label="商城名称">
          <el-input v-model="form1.storeDisplayName" />
        </el-form-item>
        <!-- 通宝商品id -->
        <el-form-item label="通宝商品id">
          <el-input v-model="form1.tongBaoId" />
        </el-form-item>
        <!-- 开始时间 -->
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form1.goodsStartTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <!-- 结束时间 -->
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form1.goodsEndTime"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
      </el-form>

      <!-- 商品内容、、、、商品描述 -->
      <div class="m-titletip">基础商品信息</div>
      <div class="m-border">
        <el-form
          ref="form2"
          :inline="true"
          :model="form2"
          label-width="150px"
        >
          <!-- 商品内容 -->
          <el-form-item label="商品内容">
            <div class="m-popover">
              <div v-for="(connectItem,index) in form2.goodsContent" :key="index" style="padding:10px">
                <span>item</span>
                <el-autocomplete
                  v-model="connectItem.itemId"
                  popper-class="my-autocomplete"
                  :fetch-suggestions="bigQuerySearch"
                  placeholder="请输入内容"
                  style="width:150px;"
                >
                  <template slot-scope="{ item }">
                    <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                  </template>
                </el-autocomplete>

                <span>数量</span>
                <el-input v-model="connectItem.count" style="width:100px" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addContent">添加内容</el-button>
            <el-button type="primary" @click="delContent">删除内容</el-button>
          </el-form-item>
          <br>
          <!-- pokerId -->
          <el-form-item label="poker id">
            <el-input v-model="form2.pokerId" />
          </el-form-item>
          <br>
          <!-- 商品名称 -->
          <el-form-item label="商品名称">
            <el-input v-model="form2.name" />
          </el-form-item>
          <br>
          <!-- 限购次数 -->
          <el-form-item label="限购次数">
            <el-input v-model="form2.limitPurchase" />
          </el-form-item>
          <br>
          <!-- 商品价格 -->
          <el-form-item label="商品价格">
            <el-input v-model="form2.goodsPrice" />
          </el-form-item>
          <br>
          <!-- 商品描述 -->
          <el-form-item label="商品描述">
            <el-input
              v-model="form2.goodsDescribe"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
          <!-- 横幅描述 -->
          <br>
          <el-form-item label="横幅描述">
            <el-input
              v-model="form2.bannerDesc"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form>

        <!-- 限时礼包中触发条件、展示条件、置顶条件，人民币礼包不包含这三个条件 -->
        <!--触发条件 -->
        <el-form
          v-if="form1.gifts === '限时礼包'"
          ref="form6"
          :inline="true"
          :model="form6"
          label-width="150px"
        >
          <el-form-item label="触发条件">
            <el-input v-model="form6.triggerCondition1" type="textarea" />
          </el-form-item>
          <!-- 展示条件 -->
          <el-form-item label="展示条件">
            <el-input v-model="form6.displayCondition1" type="textarea" />
          </el-form-item>
          <!-- 置顶条件 -->
          <el-form-item label="置顶条件">
            <el-input v-model="form6.playerLevelValue" type="textarea" />
          </el-form-item>
        </el-form>
        <div class="m-save">
          <el-button type="primary" @click="handleBaseGoodsSave">保存</el-button>
        </div>
      </div>

      <div v-if="form1.gifts === '人民币礼包'">
        <!-- banner展示配置 -->
        <div class="m-titletip">banner展示配置</div>
        <div class="m-border">
          <el-form
            ref="form3"
            :inline="true"
            :model="form3"
            label-width="150px"
          >
            <el-form-item label="是否在banner中展示">
              <el-radio-group v-model="form3.bannerRadio">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item v-if="form3.bannerRadio === 1" label="展示条件">
              <el-input
                v-model="form3.displayCondition"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-form>
          <div class="m-save">
            <el-button type="primary" @click="handleBannerSave">保存</el-button>
          </div>
        </div>

        <!-- 军团礼包配置 -->
        <div class="m-titletip">军团礼包配置</div>
        <div class="m-border">
          <el-form
            ref="form4"
            :inline="true"
            :model="form4"
            label-width="150px"
          >
            <!-- 是否为军团共享礼包 -->
            <el-form-item label="是否为军团共享礼包">
              <el-radio-group v-model="form4.armyRadio">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 奖励 -->
            <br>
            <!-- <el-form-item label="奖励">
              <div class="m-award">
                <el-form-item label="item">
                  <el-input v-model="form4.award" style="margin-right:10px" />
                </el-form-item>
                <el-form-item label="数量">
                  <el-input v-model="form4.awardNum" />
                </el-form-item>
              </div>
            </el-form-item> -->
            <el-form-item label="奖励">
              <div class="m-popover">
                <div v-for="(connectItem,index) in form4.rewards" :key="index" style="padding:10px">
                  <span>item</span>
                  <el-autocomplete
                    v-model="connectItem.item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    style="width:150px;"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>

                  <span>数量</span>
                  <el-input v-model="connectItem.count" style="width:100px" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addRewards">添加奖励</el-button>
              <el-button type="primary" @click="delRewards">删除奖励</el-button>
            </el-form-item>
            <br>
            <!-- 礼包名称 -->
            <!-- <el-form-item label="礼包名称">
              <el-input v-model="form4.giftName" />
            </el-form-item> -->
            <!-- 军团礼包分组 -->
            <el-form-item label="军团礼包分组">
              <el-input v-model="form4.group" />
            </el-form-item>
            <br>
            <!-- 限购次数 -->
            <!-- <el-form-item label="限购次数">
              <el-input v-model="form4.giftLimitPurchase" />
            </el-form-item> -->
            <!-- 邮件内容 -->
            <el-form-item label="邮件内容">
              <el-input
                v-model="form4.emailContent"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
            <br>
          </el-form>
          <div class="m-save">
            <el-button type="primary" @click="handleLegionPack">保存</el-button>
          </div>
        </div>
        <!-- 通宝礼包配置 -->
        <div class="m-titletip">通宝礼包配置</div>
        <div class="m-border">
          <el-form
            ref="form5"
            :inline="true"
            :model="form5"
            label-width="150px"
          >
            <!-- 是否为通宝礼包 -->
            <el-form-item label="是否为通宝礼包">
              <el-radio-group v-model="form5.tongBao">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <!-- 开始时间、结束时间 -->
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form5.start"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form5.end"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>

            <br>
            <!-- 通宝价格 -->
            <el-form-item label="通宝价格">
              <el-input v-model="form5.tongBaoPrices" />
            </el-form-item>
            <br>
            <!-- 横幅描述 -->
            <el-form-item label="横幅描述">
              <el-input v-model="form5.bannerTitle" />
            </el-form-item>
            <br>
            <!-- 通宝商品内容 -->
            <el-form-item label="商品内容">
              <div class="m-popover">
                <div v-for="(connectItem,index) in form5.tongBaoGoodsContent" :key="index" style="padding:10px">
                  <span>item</span>
                  <el-autocomplete
                    v-model="connectItem.item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    style="width:150px;"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>

                  <span>数量</span>
                  <el-input v-model="connectItem.goodsNum" style="width:100px" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addTongBaoContent">添加内容</el-button>
              <el-button type="primary" @click="delTongBaoContent">删除内容</el-button>
            </el-form-item>
            <!-- 通宝限购次数 -->
            <el-form-item label="限购次数">
              <el-input v-model="form5.tongBaoLimitPurchase" />
            </el-form-item>

          </el-form>
          <div class="m-save">
            <el-button type="primary" @click="handleTongbaoSave">保存</el-button>
          </div>

        </div>

      </div>
    </div>
    <SaveModal ref="svaeModalMethods" :desc="activeForm.desc" :start="activeForm.start" :end="activeForm.end" />
  </el-dialog>

</template>
<script>
import { getProduct } from '@/api/email'
import { addActiveConfig } from '@/api/activeConfiguration'
import SaveModal from '../components/saveModal.vue'
export default {
  components: {
    SaveModal
  },
  props: {
    activeForm: {
      type: Object,
      default: () => ({

      })
    },
    mallForm: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {
      addGoodsVisible: false,
      form1: {
        goodsId: '',
        gifts: '人民币礼包', // 人民币礼包
        storeDisplayName: '', // 商城名称
        goodsStartTime: '', // 开始时间
        goodsEndTime: '', // 结束时间
        tongBaoId: '' // 通宝商品id
      },
      form2: {
        goodsContent: [// 商品内容
          {
            itemId: '',
            count: null
          },
          {
            itemId: '',
            count: null
          }
        ],
        pokerId: '', // pokerid
        name: '', // 商品名称
        limitPurchase: '', // 限购次数
        goodsPrice: null, // 商品价格
        goodsDescribe: '', // 商品描述
        bannerDesc: ''// 横幅描述
      },
      form3: {
        bannerRadio: 1,
        displayCondition: ''// 展示条件
      },
      form4: {
        armyRadio: 1, // 是否为军团共享礼包
        // award: '', // 奖励
        // awardNum: null, // 数量
        rewards: [
          {
            item: '',
            count: null
          },
          {
            item: '',
            count: null
          }
        ],
        giftName: '', // 礼包名称
        group: '', // 军团礼包分组
        giftLimitPurchase: '', // 限购次数
        emailContent: '' // 邮件内容
      },
      form5: {
        tongBao: 1, // 是否为通宝礼包
        start: '', // 开始时间
        end: '', // 结束时间
        tongBaoPrices: null, // 通宝价格
        bannerTitle: '', // 横幅描述
        tongBaoGoodsContent: [// 商品内容
          { item: '', goodsNum: null },
          { item: '', goodsNum: null },
          { item: '', goodsNum: null }
        ],
        tongBaoLimitPurchase: '' // 通宝限购次数

      },
      form6: {
        triggerCondition1: '', // 触发条件
        displayCondition1: '', // 展示条件
        playerLevelValue: ''// 玩家等级
      },
      options: [{
        value: '人民币礼包',
        label: '人民币礼包'
      }, {
        value: '限时礼包',
        label: '限时礼包'
      }],
      levelList: [{
        value: '大于',
        label: '>'
      }, {
        value: '等于',
        label: '='
      }, {
        value: '小于',
        label: '<'
      }]
    }
  },

  watch: {
    'activeForm.start'(val) {
      this.form1.goodsStartTime = val
      this.form5.start = val
    },
    'activeForm.end'(val) {
      this.form1.goodsEndTime = val
      this.form5.end = val
    }
  },

  mounted() {
    this.getUidsItem()
  },

  methods: {
    // 基础商品信息保存
    handleBaseGoodsSave() {
      const items = this.form2.goodsContent.map(element => {
        return {
          itemId: element.itemId,
          count: +element.count
        }
      })

      if (this.form1.gifts === '人民币礼包') {
        const data1 = {
          jsonrpc: "2.0",
          method: "bingo.products_9999_0",
          id: "1",
          params: {
            username: localStorage.getItem('svnUserName'),
            whichConf: this.activeForm.whichConf,
            limitCount: +this.form2.limitPurchase, // 限购次数
            displayName: this.form2.name, // 商品名称
            items: items,
            desc: this.form2.goodsDescribe, // 商品描述
            price: +this.form2.goodsPrice, // 商品价格
            priceDiamond: +this.form2.goodsPrice * 10, // 是商品价格的十倍
            productId: this.form1.goodsId, // 商品id
            hengfubanner: this.form2.bannerDesc, //   横幅描述（人民币礼包才有）
            "storeName": "time_limit", // store_tc的区分商场的字段name  写固定
            storeDisplayName: this.form1.storeDisplayName, // 商城名称
            mapId: +this.form2.pokerId, // pokerid
            contentDesc: this.form2.name, // 和displayName一致
            "pic": "https://hlsghw.tytuyoo.com/3kingdoms/Icon/Publicstore/raffle01_20190808.png"// 固定值
          }

        }

        if (!this.activeForm.whichConf) {
          this.$message.warning('请选择配置来源')
          return
        }
        if (!this.form1.goodsId) {
          this.$message.warning('请填写商品id')
          return
        }
        if (!this.form1.storeDisplayName) {
          this.$message.warning('请填写商城名称')
          return
        }
        if (!this.form2.pokerId) {
          this.$message.warning('请输入poker id')
          return
        }
        if (!this.form2.name) {
          this.$message.warning('请填写商品名称')
          return
        }
        if (!this.form2.limitPurchase) {
          this.$message.warning('请填写限购次数')
          return
        }

        if (!this.form2.goodsPrice) {
          this.$message.warning('请填写商品价格')
          return
        }
        if (!this.form2.goodsDescribe) {
          this.$message.warning('请填写商品描述')
          return
        }

        if (!this.form2.bannerDesc) {
          this.$message.warning('请填写横幅描述')
          return
        }

        addActiveConfig(data1).then(res => {
          if (res.code === 1) {
            this.$message.success('基础商品信息保存成功')
            this.$refs.svaeModalMethods.showModal()
          }
        })
      } else if (this.form1.gifts === '限时礼包') {
        const params = {
          jsonrpc: "2.0",
          method: "bingo.time_limit_gift",
          id: "1",
          params: {
            username: localStorage.getItem('svnUserName'),
            whichConf: this.activeForm.whichConf,
            limitCount: +this.form2.limitPurchase,
            items: items,
            desc: this.form2.goodsDescribe,
            price: +this.form2.goodsPrice,
            priceDiamond: +this.form2.goodsPrice * 10,
            productId: this.form1.goodsId,
            hengfubanner: this.form2.bannerDesc,
            displayName: this.form1.storeDisplayName,
            mapId: +this.form2.pokerId,
            contentDesc: this.form2.name,
            "pic": "https://hlsghw.tytuyoo.com/3kingdoms/Icon/Publicstore/raffle01_20190808.png",
            popCond: this.form6.triggerCondition1, // 触发条件
            showCond: this.form6.displayCondition1, // 展示条件
            topCond: this.form6.playerLevelValue// 置顶条件

          }
        }

        if (!this.activeForm.whichConf) {
          this.$message.warning('请选择配置来源')
          return
        }
        if (!this.form1.goodsId) {
          this.$message.warning('请填写商品id')
          return
        }
        if (!this.form1.storeDisplayName) {
          this.$message.warning('请填写商城名称')
          return
        }

        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (!Object.values(items[i])[0] || !Object.values(items[i])[1]) {
              this.$message.warning('请输入商品内容')
              return
            }
          }
        }
        if (!this.form2.pokerId) {
          this.$message.warning('请输入poker id')
          return
        }
        if (!this.form2.name) {
          this.$message.warning('请填写商品名称')
          return
        }
        if (!this.form2.limitPurchase) {
          this.$message.warning('请填写限购次数')
          return
        }

        if (!this.form2.goodsPrice) {
          this.$message.warning('请填写商品价格')
          return
        }
        if (!this.form2.goodsDescribe) {
          this.$message.warning('请填写商品描述')
          return
        }

        if (!this.form2.bannerDesc) {
          this.$message.warning('请填写横幅描述')
          return
        }
        if (!this.form6.triggerCondition1) {
          this.$message.warning('请输入触发条件')
          return
        }
        if (!this.form6.displayCondition1) {
          this.$message.warning('请输入展示条件')
          return
        }
        if (!this.form6.playerLevelValue) {
          this.$message.warning('请输入置顶条件')
          return
        }
        addActiveConfig(params).then(res => {
          if (res.code === 1) {
            this.$message.success('限时礼包保存成功')
            this.$refs.svaeModalMethods.showModal()
          }
        })
      }
    },

    // banner保存
    handleBannerSave() {
      const data = {
        jsonrpc: "2.0",
        method: "bingo.act_banner_gift_0",
        id: "1",
        params: {
          username: localStorage.getItem('svnUserName'),
          whichConf: this.activeForm.whichConf,
          shopId: this.mallForm.mallValue, // 选择商城
          productId: this.form1.goodsId,
          showCond: this.form3.displayCondition
        }
      }

      if (!this.activeForm.whichConf) {
        this.$message.warning('请选择配置来源')
        return
      }
      if (!this.mallForm.mallValue) {
        this.$message.warning('请选择商城')
        return
      }
      if (!this.form1.goodsId) {
        this.$message.warning('请输入商品id')
        return
      }
      if (!this.form3.displayCondition) {
        this.$message.warning('请输入展示条件')
        return
      }
      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.$message.success('banner保存成功')
          this.$refs.svaeModalMethods.showModal()
        }
      })
    },

    // 军团礼包保存
    handleLegionPack() {
      const rewards = this.form4.rewards.map(element => {
        return {
          item: element.item,
          count: +element.count
        }
      })

      const shopId = this.mallForm.mallValue === 'twoWayShop' ? '1' : this.mallForm.mallValue.split('')[this.mallForm.mallValue.split('').length - 1]
      const data = {
        jsonrpc: "2.0",
        method: "bingo.legion_share_gift_0",
        id: "1",
        params: {
          username: localStorage.getItem('svnUserName'),
          whichConf: this.activeForm.whichConf, // 配置来源
          start: this.form1.goodsStartTime,
          end: this.form1.goodsEndTime,
          shopId: shopId,
          productId: this.form1.goodsId,
          rewards: rewards, // 奖励
          mailDesc: this.form4.emailContent,
          tbId: this.form1.tongBaoId
        }
      }

      if (!this.activeForm.whichConf) {
        this.$message.warning('请选择配置来源')
        return
      }
      if (!shopId) {
        this.$message.warning('请选择商城')
        return
      }
      if (!this.form1.goodsId) {
        this.$message.warning('请输入商品id')
        return
      }
      if (!this.form1.tongBaoId) {
        this.$message.warning('请输入通宝商品id')
        return
      }

      if (!this.form1.goodsStartTime) {
        this.$message.warning('请选择开始时间')
        return
      }
      if (!this.form1.goodsEndTime) {
        this.$message.warning('请选择结束时间')
        return
      }

      if (!this.form4.emailContent) {
        this.$message.warning('请输入邮件内容')
        return
      }
      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.$message.success('军团礼包配置保存成功')
          this.$refs.svaeModalMethods.showModal()
        }
      })
    },

    // 通宝礼包保存
    handleTongbaoSave() {
      const contentItems = this.form5.tongBaoGoodsContent.map(element => {
        return {
          itemId: element.item,
          count: +element.goodsNum
        }
      })
      const data = {
        jsonrpc: "2.0",
        method: "bingo.two_way_shop_week",
        id: "1",
        params: {
          username: localStorage.getItem('svnUserName'),
          whichConf: this.activeForm.whichConf,
          start: this.form5.start,
          end: this.form5.end,
          shopId: this.mallForm.mallValue === 'twoWayShop' ? '1' : this.mallForm.mallValue.split('')[this.mallForm.mallValue.split('').length - 1],
          productId: this.form1.goodsId,
          tbId: this.form1.tongBaoId,
          "goodId": "6", // 就一个 写固定
          displayName: this.form1.storeDisplayName,
          bannerTitle: this.form5.bannerTitle, // 横幅描述
          "consumeItems": [// 就一个
            {
              "itemId": "item:4052", // 写固定
              "count": +this.form5.tongBaoPrices// 通宝价格
            }
          ],
          contentItems: contentItems, // 商品内容
          limitCount: this.form5.tongBaoLimitPurchase// 限购次数
        }
      }

      if (!this.activeForm.whichConf) {
        this.$message.warning('请选择配置来源')
        return
      }
      if (!this.mallForm.mallValue) {
        this.$message.warning('请选择商城')
        return
      }
      if (!this.form1.goodsId) {
        this.$message.warning('请输入商品id')
        return
      }
      if (!this.form1.storeDisplayName) {
        this.$message.warning('请输入商城名称')
        return
      }
      if (!this.form1.tongBaoId) {
        this.$message.warning('请输入通宝商品id')
        return
      }
      if (!this.form5.start) {
        this.$message.warning('请选择开始时间')
        return
      }
      if (!this.form5.end) {
        this.$message.warning('请选择结束时间')
        return
      }
      if (!this.form5.tongBaoPrices) {
        this.$message.warning('请输入通宝价格')
        return
      }
      if (contentItems) {
        for (let i = 0; i < contentItems.length; i++) {
          if (!Object.values(contentItems[i])[0] || !Object.values(contentItems[i])[1]) {
            this.$message.warning('请输入商品内容')
            return
          }
        }
      }
      if (!this.form5.bannerTitle) {
        this.$message.warning('请输入横幅描述')
        return
      }
      if (!this.form5.tongBaoLimitPurchase) {
        this.$message.warning('请输入限购次数')
        return
      }

      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.$message.success('通宝礼包配置保存成功')
          this.$refs.svaeModalMethods.showModal()
        }
      })
    },

    // 获取item
    getUidsItem() {
      getProduct({ channel: 1 }).then(response => {
        if (response.code === 1) {
          this.restaurants = response.data.items.map(item => {
            return {
              name: item.name + '(' + `${item.item}` + ')',
              value: item.item
            }
          })
        }
      })
    },
    bigQuerySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    showAddGoodsModal() {
      this.addGoodsVisible = true
    },

    // 商品类型
    handleMoneyGifts() {
      // console.log(this.form1.gifts)
    },

    // 添加内容
    addContent() {
      this.form2.goodsContent.push({
        itemId: '',
        count: null
      },)
    },

    // 删除内容
    delContent() {
      if (this.form2.goodsContent.length > 1) {
        this.form2.goodsContent.pop()
      }
    },

    // 添加奖励
    addRewards() {
      this.form4.rewards.push({
        item: '',
        count: null
      },)
    },

    // 删除奖励
    delRewards() {
      if (this.form4.rewards.length > 1) {
        this.form4.rewards.pop()
      }
    },

    // 通宝添加内容
    addTongBaoContent() {
      this.form5.tongBaoGoodsContent.push({
        item: '', goodsNum: null
      })
    },

    // 通宝删除内容
    delTongBaoContent() {
      if (this.form5.tongBaoGoodsContent.length > 1) {
        this.form5.tongBaoGoodsContent.pop()
      }
    },

    // 保存
    saveGoodsConfig() {
      this.addGoodsVisible = false
    }
  }
}
</script>
