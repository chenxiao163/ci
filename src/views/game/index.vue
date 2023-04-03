<template>
  <div>
    <div v-if="!games && !games.length" class="nogameStyle">
      <img src="https://downqn.tuyoo.com/gwapp/sdk/logo.png" alt="">
      <p class="fontStyle">
        您暂未开通系统权限，请先在TMP进行权限申请。
      </p>
      <button
        v-if="name === 'cangle' || name === 'wulei' || name === 'zhanghongbao'"
        class="btnStyle"
        @click="addGame()"
      >
        + 接入游戏
      </button>
    </div>
    <div v-else class="gameStyle">
      <div class="appHeader">
        <p class="myComplication">我的游戏</p>
        <el-input
          v-model="searchText"
          placeholder="游戏名称"
          clearable
          prefix-icon="el-icon-search"
          size="mini"
          input="searchGame"
          style="width: 15em;margin-left: 2em;"
        />
        <button
          v-if="
            name === 'cangle' || name === 'wulei' || name === 'zhanghongbao'
          "
          class="btnStyle"
          @click="addGame()"
        >
          + 接入游戏
        </button>
      </div>
      <div>
        <div class="gameBox">
          <el-row :gutter="40">
            <el-col
              v-for="(mygame, index) in myGames"
              :key="index"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="6"
            >
              <div class="grid-content bg-purple" @click="showGame(mygame)">
                <el-row :gutter="10" class="everyGame">
                  <el-col :span="6">
                    <div class="grid-content myImg">
                      <img
                        :src="
                          mygame.gameIcon
                            ? mygame.gameIcon
                            : 'https://downqn.tuyoo.com/gwapp/tuyoo/logo.png'
                        "
                        alt=""
                        class="myIcon"
                      >
                    </div>
                  </el-col>
                  <el-col :span="15" class="myWords">
                    <div class="grid-content">
                      <p class="styleP">{{ mygame.gameName }}</p>
                      <p class="styleP">{{ mygame.gameMark }}</p>
                    </div>
                  </el-col>
                  <el-col
                    v-if="
                      name === 'cangle' ||
                        name === 'wulei' ||
                        name === 'zhanghongbao'
                    "
                    :span="3"
                  >
                    <div class="grid-content myDot">
                      <el-dropdown @command="handleGame($event, mygame)">
                        <span class="el-dropdown-link" @click.stop>
                          ...
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="edit">
                            编辑游戏
                          </el-dropdown-item>
                          <el-dropdown-item command="del">
                            删除游戏
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <edit
      v-if="dialogData.visible"
      :temp-data="dialogData"
      @commitAdd="commitEdit"
      @cancelAdd="cancelAdd"
    />
  </div>
</template>
<script>
import { setGameMark, getSlider, setGameName } from "@/utils/auth";
import { mapGetters } from "vuex";
import { delGame } from "@/api/permission";
import edit from "./edit";
export default {
  name: "Game",
  components: { edit },
  data() {
    return {
      ifNew: true,
      myToken: "",
      dialogData: {
        visible: false,
        state: "create",
        form: {
          gameName: "",
          gameMark: "",
          gameIcon: "",
          id: null
        }
      },
      gameList: [],
      myGames: [],
      searchText: ""
    };
  },
  computed: {
    ...mapGetters(["ifSlider", "games", "name"])
  },
  watch: {
    searchText(val) {
      this.myGames = this.gameList.filter(item =>
        item.gameName.toLowerCase().includes(val.toLowerCase())
      );
    }
  },
  created() {
    this.$store.dispatch("user/getGames");
    this.$store.dispatch("user/resetMark");
    this.$store.dispatch("permission/resetFlag");
    this.myGames = [...this.games];
    this.gameList = [...this.games];
  },
  mounted() {
    this.$store.state.user.ifSlider = false;
  },
  methods: {
    async showGame(game) {
      setGameMark(game.gameMark);
      setGameName(game.gameName);
      await this.$store.dispatch("app/toggleGameName", game.gameName);
      await this.$store.dispatch("user/resetMark", { mark: game.gameMark });
      await this.$store.dispatch("user/getInfo");
      if (
        JSON.parse(getSlider()).length === 3 &&
        (this.name === "cangle" ||
          this.name === "wulei" ||
          this.name === "zhanghongbao" ||
          this.name === "chenxiaojie")
      ) {
        this.$router.push({
          path: "/permission/user"
        });
      } else {
        if (
          game.gameName.includes("捕鱼") ||
          game.gameName.includes("大棋牌") || game.gameName.includes("麻将")
        ) {
          this.$router.push({
            path: "/email/ori"
          });
        } else {
          this.$router.push({
            path: "/userManage"
          });
        }
      }
    },
    addGame() {
      this.dialogData.state = "create";
      this.dialogData.form = {
        gameName: "",
        gameMark: "",
        gameIcon: "",
        id: null
      };
      this.dialogData.visible = true;
    },
    cancelAdd() {
      this.dialogData.visible = false;
    },
    async commitEdit() {
      await this.$store.dispatch("user/getGames");
      this.myGames = [...this.games];
      console.log(this.myGames);
      this.gameList = [...this.games];
      this.dialogData.visible = false;
    },
    handleGame(command, game) {
      if (command === "edit") {
        this.dialogData.state = "update";
        this.dialogData.form = Object.assign({}, game);
        this.dialogData.visible = true;
      } else {
        this.$confirm("确认要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delGame({ id: game.id, gameName: game.gameName }).then(response => {
              if (response && response.code === 1) {
                this.commitEdit();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    message(row) {
      this.$message.info(row.event);
    }
  }
};
</script>

<style lang="scss" scoped>
.nogameStyle > img {
  width: 80px;
  padding-top: 120px;
  padding-bottom: 20px;
}
.nogameStyle {
  text-align: center;
  .fontStyle {
    font-size: 16px;
    color: #949494;
    text-align: center;
  }
}
button.btnStyle {
  margin-top: 50px;
  width: 118px;
  height: 45px;
  line-height: 45px;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  border: 1px solid#42b983;
  background: #42b983;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

button.btnStyle:hover {
  color: #fff;
  background: #42b983;
  opacity: 0.8;
}

.gameStyle {
  margin: 10px 20px 10px 40px;
  .myComplication {
    font-family: "PingFangSC-Regular", "PingFang SC";
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    color: #797979;
    float: left;
    margin: 0;
  }

  p.styleP {
    color: #414346;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button.btnStyle {
    margin-top: 25px;
    width: 124px;
    height: 35px;
    line-height: 35px;
    float: right;
  }

  .appHeader {
    height: 80px;
    line-height: 80px;
    padding-top: 0px;
  }
  .gameBox {
    margin-top: 3em;
    margin-left: 2em;
  }
  img.myIcon {
    max-width: 60px;
    max-height: 60px;
    vertical-align: middle;
    margin-top: 20px;
  }
  .myWords {
    padding-right: 5px;
    margin: 10px 0;
    padding-left: 10px !important;
    border-left: 1px solid #e8e8e8;
  }
  .myImg {
    text-align: center;
  }
  .myDot {
    height: 10px;
    line-height: 10px;
    text-align: right;
    padding-right: 18px;
    font-size: 25px;
    padding-top: 5px;
    color: #5d5b5b;
    cursor: pointer;
  }
  .everyGame {
    box-shadow: 0px 2px 4px 4px rgba(69, 65, 78, 0.08);
    cursor: pointer;
    margin-bottom: 10px;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.conplicationTitle {
  color: #797979;
  font-size: 14px;
  line-height: 30px;
  height: 40px;
  margin-left: 5px;
  padding: 0;
}
</style>
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #169bd5;
}
.myDot span.el-dropdown-link {
  font-size: 25px;
}
#app .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #159bd5;
}
</style>
