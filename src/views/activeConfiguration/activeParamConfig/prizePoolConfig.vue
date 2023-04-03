<style scoped>
/* 格子奖池 */
.m-label,.m-select-label{
  padding: 5px;
  cursor: pointer;
}
/* .m-label:hover{
  background: #409eff;
  color: #fff;
} */
.m-popover{
  min-height: 120px;
  overflow: auto;
}

.m-searchkeywords{
  width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.m-saveprize{
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div>

    <!-- *************以下内容是需要输入活动id才展示的配置内容************ -->
    <div>
      <!-- 奖池配置 -->
      <div>
        <el-form
          ref="prizePoolForm"
          :model="prizePoolForm"
          label-width="100px"
        >
          <!-- 格子奖池 -->
          <el-form-item label="格子奖池">
            <el-popover
              v-model="plaidPoolVisible"
              placement="bottom"
              width="570"
            >
              <div class="m-popover">
                <div v-for="(plaidPoolItem,index) in plaidPoolList" :key="index" :class="activeIndex === index?'m-select-label' : 'm-label'" @click="handlePlaidPool(index)">
                  <span>{{ plaidPoolItem.label1 }}</span>

                  <!-- 自定义输入键入模板 -->
                  <!-- item -->
                  <el-autocomplete
                    v-model="plaidPoolList[index].item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    size="mini"
                    style="width:150px;"
                    @select="handleBigSelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                  <!-- 数量 -->
                  <span>{{ plaidPoolItem.label2 }}</span>
                  <el-input v-model="plaidPoolList[index].count" size="mini" style="width:50px" />
                  <!-- min -->
                  <span>{{ plaidPoolItem.label3 }}</span>
                  <el-input v-model="plaidPoolList[index].minTimes" size="mini" style="width:50px" />

                  <!-- max -->
                  <span>{{ plaidPoolItem.label4 }}</span>
                  <el-input v-model="plaidPoolList[index].maxCheckTimes" size="mini" style="width:50px" />

                  <!-- weight -->
                  <span>{{ plaidPoolItem.label5 }}</span>
                  <el-input v-model="plaidPoolList[index].weight" size="mini" style="width:50px" />

                </div>
              </div>

              <div style="margin: 0;padding:10px 0">
                <el-button size="mini" type="primary" @click="addDifferentItem('plaidPool')">新增</el-button>
                <el-button type="primary" size="mini" @click="delDifferentItem('plaidPool')">删除</el-button>
                <el-button type="primary" size="mini" @click="plaidPoolVisible = false">确定</el-button>
              </div>
              <el-input slot="reference" v-model="prizePoolForm.plaidPool" style="width:150px" />
            </el-popover>

            <!-- 新增item配置 -->
            <el-button type="primary" @click="handleAddItem">新增item配置</el-button>
            <AddItemModal ref="addItemMothods" :active-form="activeForm" />
          </el-form-item>

          <!-- 大进度条 -->
          <el-form-item label="大进度条">
            <el-popover
              v-for="(NumEle,eleIndex) in bigProgressBarNum"
              :key="eleIndex"
              v-model="NumEle.visible"
              placement="bottom"
              width="350"
            >
              <div class="m-popover">
                <div v-for="(bigItem,index) in bigProgressBarNum[eleIndex].bigProgressBarList" :key="index" :class="activeIndex === index?'m-select-label' : 'm-label'" @click="handleBigProgressBar(index,eleIndex)">
                  <span>item</span>

                  <!-- 自定义输入键入模板 -->

                  <el-autocomplete
                    v-model="bigProgressBarNum[eleIndex].bigProgressBarList[index].reward.item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    size="mini"
                    style="width:150px;"
                    @select="handleBigSelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>

                  <span>数量</span>
                  <el-input v-model="bigProgressBarNum[eleIndex].bigProgressBarList[index].reward.count" size="mini" style="width:90px" />

                </div>
              </div>
              <div style="margin: 0;padding:10px 0">
                <el-button size="mini" type="primary" @click="addDifferentItem('bigProgressBar',eleIndex)">新增</el-button>
                <el-button type="primary" size="mini" @click="delDifferentItem('bigProgressBar',eleIndex)">删除</el-button>
                <el-button type="primary" size="mini" @click="handleBigSure(eleIndex)">确定</el-button>
              </div>
              <el-input slot="reference" v-model="bigProgressBarNum[eleIndex].barValue" style="width:150px;margin-right:10px;margin-bottom:10px" />
            </el-popover>
            <el-button type="primary" @click="handleAddBig">新增</el-button>
            <el-button type="primary" @click="handleDelBid">删除</el-button>
          </el-form-item>

          <!-- 小进度条 -->
          <el-form-item label="小进度条">
            <el-popover
              v-for="(NumEle,eleIndex) in smallProgressBarNum"
              :key="eleIndex"
              v-model="NumEle.visible"
              placement="bottom"
              width="400"
            >
              <div class="m-popover">
                <div v-for="(smallItem,index) in smallProgressBarNum[eleIndex].smallProgressBarList" :key="index" :class="activeIndex === index?'m-select-label' : 'm-label'" @click="handleSmallProgressBar(index,eleIndex)">
                  <span>item</span>

                  <!-- 自定义输入键入模板 -->

                  <el-autocomplete
                    v-model="smallProgressBarNum[eleIndex].smallProgressBarList[index].rewards.item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    size="mini"
                    style="width:150px;"
                    @select="handleBigSelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>

                  <span>数量</span>
                  <el-input v-model="smallProgressBarNum[eleIndex].smallProgressBarList[index].rewards.count" size="mini" style="width:50px" />

                </div>
              </div>
              <div style="margin: 0;padding:10px 0">
                <el-button size="mini" type="primary" @click="addDifferentItem('smallProgressBar',eleIndex)">新增</el-button>
                <el-button type="primary" size="mini" @click="delDifferentItem('smallProgressBar',eleIndex)">删除</el-button>
                <el-button type="primary" size="mini" @click="handleSmallSure(eleIndex)">确定</el-button>
              </div>
              <el-input slot="reference" v-model="smallProgressBarNum[eleIndex].barValue" style="width:150px;margin-right:10px;margin-bottom:10px" />

              <!-- 进度 -->
              <span slot="reference" style="margin-right:10px">
                <span style="color:#606266">进度</span>
                <el-input v-model="smallProgressBarNum[eleIndex].progress" style="width:120px" />
              </span>
            </el-popover>
            <!-- 进度 -->

            <el-button type="primary" @click="handleAddSmall">新增</el-button>
            <el-button type="primary" @click="handleDelSmall">删除</el-button>
          </el-form-item>

          <!-- 连线奖励 -->
          <el-form-item label="连线奖池">
            <el-popover
              v-model="connectAwardPool"
              placement="bottom"
              width="310"
            >
              <div class="m-popover">
                <div v-for="(connectItem,index) in connectAwardPoolList" :key="index" :class="activeIndex === index?'m-select-label' : 'm-label'" @click="handleConnectAwardPool(index)">
                  <span>item</span>
                  <el-autocomplete
                    v-model="connectAwardPoolList[index].reward.item"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="bigQuerySearch"
                    placeholder="请输入内容"
                    size="mini"
                    style="width:150px;"
                    @select="handleBigSelect"
                  >
                    <template slot-scope="{ item }">
                      <div class="m-searchkeywords" :title="item.name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>

                  <span>数量</span>
                  <el-input v-model="connectAwardPoolList[index].reward.count" size="mini" style="width:50px" />
                </div>
              </div>

              <div style="margin: 0;padding:10px 0">
                <el-button size="mini" type="primary" @click="addDifferentItem('connectAwardPool')">新增</el-button>
                <el-button type="primary" size="mini" @click="delDifferentItem('connectAwardPool')">删除</el-button>
                <el-button type="primary" size="mini" @click="connectAwardPool = false">确定</el-button>
              </div>
              <el-input slot="reference" v-model="prizePoolForm.connectAwardPoolValue" style="width:150px" />
            </el-popover>

          </el-form-item>

        </el-form>
      </div>
      <div class="m-saveprize">
        <el-button type="primary" @click="handlePrizeSave">保存</el-button>
      </div>

      <SaveModal ref="svaeModalMethods" :desc="activeForm.desc" :start="activeForm.start" :end="activeForm.end" />
    </div>
  </div>
</template>
<script>
import AddItemModal from '../components/addItemConfig.vue'
import { getProduct } from '@/api/email'
import { addActiveConfig } from '@/api/activeConfiguration'
import SaveModal from '../components/saveModal.vue'
export default {
  components: {
    AddItemModal,
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
      /** 奖池配置 */
      plaidPoolVisible: false,
      plaidPoolList: [// 格子奖池列表
        { label1: 'item', label2: '数量', label3: 'min', label4: 'max', label5: 'weight', item: '', count: '', minTimes: "", maxCheckTimes: '', weight: '' },
        { label1: 'item', label2: '数量', label3: 'min', label4: 'max', label5: 'weight', item: '', count: '', minTimes: "", maxCheckTimes: '', weight: '' },
        { label1: 'item', label2: '数量', label3: 'min', label4: 'max', label5: 'weight', item: '', count: '', minTimes: "", maxCheckTimes: '', weight: '' },
        { label1: 'item', label2: '数量', label3: 'min', label4: 'max', label5: 'weight', item: '', count: '', minTimes: "", maxCheckTimes: '', weight: '' }
      ],
      activeIndex: 0, // 选中标签的下标
      /** 进度条 */
      prizePoolForm: {
        plaidPool: '', // 格子奖池
        bigProgressBar: null, // 大进度条
        smallProgressBar: null, // 小进度条
        smallProgressBarId: '', // 小进度条id
        connectAwardPoolValue: ''// 连线奖池
      },
      /** 大进度条 */
      bigProgressBarNum: [
        { label: '第1档', visible: false, barValue: '第1档',
          bigProgressBarList: [// 大进度条下拉菜单列表
            {
              rewardId: 0,
              reward: {
                item: '',
                count: null
              }
            },
            {
              rewardId: 0,
              reward: {
                item: '',
                count: null
              }
            }
          ]
        },
        { label: '第2档', visible: false, barValue: '第2档',
          bigProgressBarList: [// 大进度条下拉菜单列表
            {
              rewardId: 0,
              reward: {
                item: '',
                count: null
              }
            }
          ]
        }
      ],
      /** 大进度条 自定义输入键入的模板 */
      restaurants: [],
      state: '',
      /** 小进度条 */
      smallProgressBarNum: [
        { label: '第一档', visible: false, barValue: '第一档',
          smallProgressBarList: [{
            id: 1,
            rewards: [
              {
                item: '',
                count: null
              }
            ]
          }],
          progress: null
        }
      ],
      /** 连线奖池 */
      connectAwardPool: false,
      connectAwardPoolList: [// 连线奖池下拉菜单列表
        { id: 0,
          reward: {
            item: '',
            count: null
          }
        },
        { id: 1,
          reward: {
            item: '',
            count: null
          }
        }
      ]

    }
  },
  mounted() {
    this.getUidsItem()
  },

  methods: {
    // 保存
    handlePrizeSave() {
      /**
        1、bingo连线奖池
        2、bingoAccum大进度条
        3、barItems 小进度条
        4、tileRewardPool格子奖池
       */
      // 格子奖池参数
      const tileRewardPool = this.plaidPoolList.map((element, index) => {
        return {
          id: index,
          item: {
            item: element.item,
            count: +element.count
          },
          minTimes: +element.minTimes,
          maxCheckTimes: +element.maxCheckTimes,
          weight: +element.weight
        }
      })

      // 大进度条参数
      const bingoAccum = this.bigProgressBarNum.map((element, index) => {
        const rewards = element.bigProgressBarList.map(elechild => {
          return {
            rewardId: elechild.rewardId,
            reward: {
              item: elechild.reward.item,
              count: +elechild.reward.count
            }
          }
        })
        return {
          id: index,
          "accum": 1,
          "isChoice": 0,
          rewards: rewards
        }
      })

      // 小进度条
      const barItems = this.smallProgressBarNum.map((element, index) => {
        const rewards = element.smallProgressBarList.map(elechild => {
          return {
            item: elechild.rewards.item,
            count: +elechild.rewards.count
          }
        })
        return {
          "id": index,
          "rewards": rewards,
          "progress": +element.progress
        }
      })

      // 连线奖池bingo参数
      const bingo = this.connectAwardPoolList.map((element, index) => {
        return {
          id: index,
          reward: {
            item: element.reward.item,
            count: +element.reward.count
          }
        }
      })

      const data = {
        jsonrpc: "2.0",
        method: "bingo.act_bingo_0",
        id: "1",
        params: {
          username: localStorage.getItem('svnUserName'),
          whichConf: this.activeForm.whichConf, // 哪个配置
          actVersion: this.activeForm.actVersion,		// 活动版本
          actTitle: this.activeForm.actTitle,	// 活动名称
          start: this.activeForm.start, // 开始时间
          end: this.activeForm.end,	// 结束时间
          help: this.activeForm.detail, // 活动详情
          isOpen: +this.activeForm.isOpenIcon.value, // 是1 否0
          desc: this.activeForm.desc, // 描述
          // "tile": [],
          tileRewardPool: tileRewardPool, // 格子奖池
          bingo: bingo, // 连线奖池
          bingoAccum: bingoAccum, // 大进度条
          consume: this.activeForm.consumeItems, // item:4280 活动消耗的道具
          url: this.activeForm.isOpenIcon.url, // 图源
          name: this.activeForm.isOpenIcon.name, // 图源名称
          barItems: barItems// 小进度条
        }
      }

      if (!this.activeForm.whichConf) {
        this.$message.warning('请选择配置来源')
        return
      } else if (!this.activeForm.actVersion) {
        this.$message.warning('请填写活动版本号')
        return
      } else if (!this.activeForm.actTitle) {
        this.$message.warning('请填写活动名称')
        return
      } else if (!this.activeForm.start) {
        this.$message.warning('请选择开始时间')
        return
      } else if (!this.activeForm.end) {
        this.$message.warning('请选择结束时间')
        return
      } else if (!this.activeForm.detail) {
        this.$message.warning('请填写活动详情')
        return
      } else if (+this.activeForm.isOpenIcon.value === 1) {
        if (!this.activeForm.isOpenIcon.name) {
          this.$message.warning('请填写主城图标名称')
          return
        } else if (!this.activeForm.isOpenIcon.url) {
          this.$message.warning('请填写主城图标图源')
          return
        }
      } else if (!this.activeForm.consumeItems) {
        this.$message.warning('请填写活动消耗的道具')
        return
      } else if (!this.activeForm.desc) {
        this.$message.warning('请填写活动描述')
        return
      }

      addActiveConfig(data).then(res => {
        if (res.code === 1) {
          this.$message.success('奖池配置保存成功')
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
    /** 格子奖池 */
    // 新增
    handleAdd() {
      console.log('新增啦。。。')
    },
    // 删除
    handleDelete() {
      console.log('删除啦')
    },
    // 选中格子奖池某一个值
    handlePlaidPool(index) {
      this.activeIndex = index
      // this.prizePoolForm.plaidPool = label
    },

    /** 新增item配置 */
    handleAddItem() {
      this.$refs.addItemMothods.handleShowAddItem()
    },

    /** 大进度条 */
    handleBigProgressBar(index, eleIndex) {
      this.activeIndex = index
      // 将大进度条的值放进form中
      this.prizePoolForm.bigProgressBar = this.bigProgressBarNum
    },
    // 新增大进度条
    handleAddBig() {
      this.$set(this.bigProgressBarNum, this.bigProgressBarNum.length, {
        label: `第${this.bigProgressBarNum.length + 1}档`,
        visible: false,
        barValue: `第${this.bigProgressBarNum.length + 1}档`,
        bigProgressBarList: [// 大进度条下拉菜单列表
          {
            rewardId: 0,
            reward: {
              item: '',
              count: null
            }
          }
        ]
      })
      this.$forceUpdate()
    },

    // 删除大进度条
    handleDelBid() {
      if (this.bigProgressBarNum.length > 4) {
        this.bigProgressBarNum.pop()
      }
    },

    // 选中大进度条之后点击确定关闭下拉菜单
    handleBigSure(index) {
      this.bigProgressBarNum[index].visible = false
      this.$forceUpdate()
    },

    bigQuerySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

    handleBigSelect(item) {
      // console.log(item);
    },

    /** 小进度条 */
    handleSmallProgressBar(index, eleIndex) {
      this.activeIndex = index
      // 将小进度条的值放进form中
      this.prizePoolForm.smallProgressBar = this.smallProgressBarNum
    },

    // 新增小进度条
    handleAddSmall() {
      this.$set(this.smallProgressBarNum, this.smallProgressBarNum.length, {
        label: `第${this.smallProgressBarNum.length + 1}档`,
        visible: false,
        barValue: `第${this.smallProgressBarNum.length + 1}档`,
        smallProgressBarList: [{
          id: 1,
          rewards: [
            {
              item: '',
              count: null
            }
          ]
        }],
        progress: null
      })

      this.$forceUpdate()
    },

    // 删除小进度条
    handleDelSmall() {
      if (this.smallProgressBarNum.length > 4) {
        this.smallProgressBarNum.pop()
      }
    },

    // 选中小进度条之后点击确定
    handleSmallSure(index) {
      this.smallProgressBarNum[index].visible = false
      this.$forceUpdate()
    },

    /** 连线奖励 */
    handleConnectAwardPool(index) {
      this.activeIndex = index
    },

    // 格子奖池、大进度条、小进度条、连线奖池item新增
    addDifferentItem(type, eleIndex) {
      switch (type) {
        case 'plaidPool':
          this.plaidPoolList.push({ label1: 'item', label2: '数量', label3: 'min', label4: 'max', label5: 'weight', item: '', count: '', minTimes: "", maxCheckTimes: '', weight: '' })
          break
        case 'bigProgressBar':
          this.bigProgressBarNum[eleIndex].bigProgressBarList.push({
            rewardId: 0,
            reward: {
              item: '',
              count: null
            }
          },)
          this.$forceUpdate()
          break
        case 'smallProgressBar':
          this.smallProgressBarNum[eleIndex].smallProgressBarList.push({
            id: 1,
            rewards: [
              {
                item: '',
                count: null
              }
            ],
            progress: null
          })
          break
        case 'connectAwardPool':
          this.connectAwardPoolList.push({ id: this.connectAwardPoolList.length,
            reward: {
              item: '',
              count: null
            }
          })
          break
        default:
      }
    },
    // 格子奖池、大进度条、小进度条、连线奖池item删除
    delDifferentItem(type, eleIndex) {
      switch (type) {
        case 'plaidPool':
          if (this.plaidPoolList.length > 1) {
            this.plaidPoolList.pop()
          }
          break
        case 'bigProgressBar':
          if (this.bigProgressBarNum[eleIndex].bigProgressBarList.length > 1) {
            this.bigProgressBarNum[eleIndex].bigProgressBarList.pop()
            this.$forceUpdate()
          }
          break
        case 'smallProgressBar':
          if (this.smallProgressBarList.length > 1) {
            this.smallProgressBarList.pop()
          }
          break
        case 'connectAwardPool':
          this.connectAwardPoolList.pop()
          break
        default:
      }
    }
  }
}
</script>
