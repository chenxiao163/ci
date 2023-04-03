<style>
span.detailStyle,
a.detailStyle {
  cursor: pointer;
  color: #409eff;
  text-decoration: underline;
}
div.jsoneditor-menu a.jsoneditor-poweredBy {
  font-size: 8pt;
  position: absolute;
  right: 0;
  top: 0;
  display: none;
}
</style>
<template>
  <div class="app-container">
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      class="demo-form-inline"
    >
      <el-form-item label="用户user_id" prop="user_id">
        <el-input v-model="form.user_id" placeholder="请输入user_id" />
      </el-form-item>
      <el-form-item label="用户role_id" prop="role_id">
        <el-input v-model="form.role_id" placeholder="请输入role_id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch('form')">查询</el-button>
      </el-form-item>
      <!-- <br><br><br><br> -->
      <div v-for="(item,index) in form.formProp" :key="index">
        <el-form-item label="道具ID" prop="道具ID">
          <el-input v-model="item.prop_id" placeholder="请输入道具ID" />
        </el-form-item>
        <el-form-item label="道具数量" prop="道具数量">
          <el-input v-model="item.prop_count" placeholder="请输入道具数量" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newlyProp()">新增</el-button>
        </el-form-item>
        <el-form-item v-if="form.formProp.length>1">
          <el-button type="primary" @click="delProp()">删除</el-button>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="sendProp()">发送</el-button>
      </el-form-item>
      <vue-json-editor
        v-if="isShowEditor"
        v-model="form.jsonData"
        :show-btns="true"
        :mode="'tree'"
        lang="zh"
        @json-save="onJsonSave"
        @json-change="onchange"
      />
    </el-form>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
import { getUserInfo, handleUserInfo, sendItems } from '@/api/userMange'
import { GamePlayer } from './GameEntity'
import { GamePlayers } from './GameEntity2'
import msgpack from 'msgpack-lite';
import { Base64 } from 'js-base64'
export default {
  name: "UserInfos",
  components: {
    vueJsonEditor
  },
  data() {
    return {
      isShowEditor: true,
      listLoading: false,
      form: {
        user_id: "",
        role_id: "19",
        jsonData: {},
        jsonDatas: {},
        formProp: [
          {
            prop_id: "",
            prop_count: ""
          }
        ]
      },
      channelOptions: [],
      player: {}
    };
  },
  computed: {
    gameType() {
      return this.$store.state.app.gameName.includes("三国");
    },
    jsonData() {
      return JSON.stringify(this.form.jsonData)
    }
  },
  created() {
    this.onSearch()
  },
  methods: {
    newlyProp() {
      this.form.formProp.push({
        prop_id: "",
        prop_count: ""
      })
    },
    delProp() {
      this.form.formProp.pop()
    },
    sendProp() {
      if (this.form.role_id) {
        const result = this.form.formProp.map(item => `${item.prop_id}, ${item.prop_count}`).join(", ");
        const params = {
          role_id: this.form.role_id,
          data: result
        }
        sendItems(params).then(res => {
          console.log(res);
        })
      } else {
        this.$message.error('user_id不能发送道具');
      }
    },
    fetchData() {
      this.listLoading = true;
      // 251
    },
    onSearch() {
      if (this.form.user_id && this.form.role_id) {
        this.$message.error('只支持选择一个用户id进行查询');
      } else {
        if (this.form.user_id) {
          getUserInfo("user_id", this.form.user_id).then(res => {
            if (res.code === 1) {
              const Base64 = require('js-base64').Base64
              const data = Base64.toUint8Array(res.data);
              const decodeData = msgpack.decode(data);
              const NewGamePlayer = new GamePlayer()
              const NewGamePlayers = new GamePlayers()
              NewGamePlayer.MsgReadFromBuffer(decodeData, true);
              NewGamePlayers.MsgReadFromBuffer(decodeData, true);
              this.form.jsonData = NewGamePlayer
              this.player = NewGamePlayers
              this.isShowEditor = true
            }
          })
        } else {
          // getUserInfo("role_id", this.form.role_id).then(res => {
          //   if (res.code === 1) {
          const Base64 = require('js-base64').Base64
          const res = "3gAvABMBzjZN9cMCEgOqVGhyZWUgQm9keQSEAMs/8ZmZmZmZmgHLP/GZmZmZmZoCAQPeABkAywAAAAAAAAAAAcsAAAAAAAAAAALLAAAAAAAAAAADywAAAAAAAAAABMsAAAAAAAAAAAXLAAAAAAAAAAAGywAAAAAAAAAAB8sAAAAAAAAAAAjLAAAAAAAAAAAJywAAAAAAAAAACssAAAAAAAAAAAvLAAAAAAAAAAAMywAAAAAAAAAADcsAAAAAAAAAAA7LAAAAAAAAAAAPywAAAAAAAAAAEMsAAAAAAAAAABHLAAAAAAAAAAASywAAAAAAAAAAE8sAAAAAAAAAABTLAAAAAAAAAAAVywAAAAAAAAAAFssAAAAAAAAAABfLAAAAAAAAAAAYywAAAAAAAAAABYQAywAAAAAAAAAAAcsAAAAAAAAAAAIBA94AGQDLAAAAAAAAAAABywAAAAAAAAAAAssAAAAAAAAAAAPLAAAAAAAAAAAEywAAAAAAAAAABcsAAAAAAAAAAAbLAAAAAAAAAAAHywAAAAAAAAAACMsAAAAAAAAAAAnLAAAAAAAAAAAKywAAAAAAAAAAC8sAAAAAAAAAAAzLAAAAAAAAAAANywAAAAAAAAAADssAAAAAAAAAAA/LAAAAAAAAAAAQywAAAAAAAAAAEcsAAAAAAAAAABLLAAAAAAAAAAATywAAAAAAAAAAFMsAAAAAAAAAABXLAAAAAAAAAAAWywAAAAAAAAAAF8sAAAAAAAAAABjLAAAAAAAAAAAGhADLQFkAAAAAAAABy0BZAAAAAAAAAgED3gAZAMsAAAAAAAAAAAHLAAAAAAAAAAACywAAAAAAAAAAA8sAAAAAAAAAAATLAAAAAAAAAAAFywAAAAAAAAAABssAAAAAAAAAAAfLAAAAAAAAAAAIywAAAAAAAAAACcsAAAAAAAAAAArLAAAAAAAAAAALywAAAAAAAAAADMsAAAAAAAAAAA3LAAAAAAAAAAAOywAAAAAAAAAAD8sAAAAAAAAAABDLAAAAAAAAAAARywAAAAAAAAAAEssAAAAAAAAAABPLAAAAAAAAAAAUywAAAAAAAAAAFcsAAAAAAAAAABbLAAAAAAAAAAAXywAAAAAAAAAAGMsAAAAAAAAAAAeEAMtAk2AAAAAAAAHLQKzsCj1wo9cCfAPeABkAywAAAAAAAAAAAcs//8SbpeNT+ALLAAAAAAAAAAADywAAAAAAAAAABMsAAAAAAAAAAAXLAAAAAAAAAAAGywAAAAAAAAAAB8sAAAAAAAAAAAjLAAAAAAAAAAAJywAAAAAAAAAACssAAAAAAAAAAAvLAAAAAAAAAAAMywAAAAAAAAAADcsAAAAAAAAAAA7LAAAAAAAAAAAPywAAAAAAAAAAEMsAAAAAAAAAABHLAAAAAAAAAAASywAAAAAAAAAAE8sAAAAAAAAAABTLAAAAAAAAAAAVywAAAAAAAAAAFssAAAAAAAAAABfLAAAAAAAAAAAYywAAAAAAAAAACIQAy0AcAAAAAAAAActAHAAAAAAAAAIBA94AGQDLAAAAAAAAAAABywAAAAAAAAAAAssAAAAAAAAAAAPLAAAAAAAAAAAEywAAAAAAAAAABcsAAAAAAAAAAAbLAAAAAAAAAAAHywAAAAAAAAAACMsAAAAAAAAAAAnLAAAAAAAAAAAKywAAAAAAAAAAC8sAAAAAAAAAAAzLAAAAAAAAAAANywAAAAAAAAAADssAAAAAAAAAAA/LAAAAAAAAAAAQywAAAAAAAAAAEcsAAAAAAAAAABLLAAAAAAAAAAATywAAAAAAAAAAFMsAAAAAAAAAABXLAAAAAAAAAAAWywAAAAAAAAAAF8sAAAAAAAAAABjLAAAAAAAAAAAJhADLP/AAAAAAAAAByz/wAAAAAAAAAgED3gAZAMsAAAAAAAAAAAHLAAAAAAAAAAACywAAAAAAAAAAA8sAAAAAAAAAAATLAAAAAAAAAAAFywAAAAAAAAAABssAAAAAAAAAAAfLAAAAAAAAAAAIywAAAAAAAAAACcsAAAAAAAAAAArLAAAAAAAAAAALywAAAAAAAAAADMsAAAAAAAAAAA3LAAAAAAAAAAAOywAAAAAAAAAAD8sAAAAAAAAAABDLAAAAAAAAAAARywAAAAAAAAAAEssAAAAAAAAAABPLAAAAAAAAAAAUywAAAAAAAAAAFcsAAAAAAAAAABbLAAAAAAAAAAAXywAAAAAAAAAAGMsAAAAAAAAAAAqEAMsAAAAAAAAAAAHLAAAAAAAAAAACAQPeABkAywAAAAAAAAAAAcsAAAAAAAAAAALLAAAAAAAAAAADywAAAAAAAAAABMsAAAAAAAAAAAXLAAAAAAAAAAAGywAAAAAAAAAAB8sAAAAAAAAAAAjLAAAAAAAAAAAJywAAAAAAAAAACssAAAAAAAAAAAvLAAAAAAAAAAAMywAAAAAAAAAADcsAAAAAAAAAAA7LAAAAAAAAAAAPywAAAAAAAAAAEMsAAAAAAAAAABHLAAAAAAAAAAASywAAAAAAAAAAE8sAAAAAAAAAABTLAAAAAAAAAAAVywAAAAAAAAAAFssAAAAAAAAAABfLAAAAAAAAAAAYywAAAAAAAAAAC4QAyz/zMzMzMzMzAcs/8zMzMzMzMwIBA94AGQDLAAAAAAAAAAABywAAAAAAAAAAAssAAAAAAAAAAAPLAAAAAAAAAAAEywAAAAAAAAAABcsAAAAAAAAAAAbLAAAAAAAAAAAHywAAAAAAAAAACMsAAAAAAAAAAAnLAAAAAAAAAAAKywAAAAAAAAAAC8sAAAAAAAAAAAzLAAAAAAAAAAANywAAAAAAAAAADssAAAAAAAAAAA/LAAAAAAAAAAAQywAAAAAAAAAAEcsAAAAAAAAAABLLAAAAAAAAAAATywAAAAAAAAAAFMsAAAAAAAAAABXLAAAAAAAAAAAWywAAAAAAAAAAF8sAAAAAAAAAABjLAAAAAAAAAAAMhADLAAAAAAAAAAABywAAAAAAAAAAAgED3gAZAMsAAAAAAAAAAAHLAAAAAAAAAAACywAAAAAAAAAAA8sAAAAAAAAAAATLAAAAAAAAAAAFywAAAAAAAAAABssAAAAAAAAAAAfLAAAAAAAAAAAIywAAAAAAAAAACcsAAAAAAAAAAArLAAAAAAAAAAALywAAAAAAAAAADMsAAAAAAAAAAA3LAAAAAAAAAAAOywAAAAAAAAAAD8sAAAAAAAAAABDLAAAAAAAAAAARywAAAAAAAAAAEssAAAAAAAAAABPLAAAAAAAAAAAUywAAAAAAAAAAFcsAAAAAAAAAABbLAAAAAAAAAAAXywAAAAAAAAAAGMsAAAAAAAAAAA2EAMsAAAAAAAAAAAHLAAAAAAAAAAACAQPeABkAywAAAAAAAAAAAcsAAAAAAAAAAALLAAAAAAAAAAADywAAAAAAAAAABMsAAAAAAAAAAAXLAAAAAAAAAAAGywAAAAAAAAAAB8sAAAAAAAAAAAjLAAAAAAAAAAAJywAAAAAAAAAACssAAAAAAAAAAAvLAAAAAAAAAAAMywAAAAAAAAAADcsAAAAAAAAAAA7LAAAAAAAAAAAPywAAAAAAAAAAEMsAAAAAAAAAABHLAAAAAAAAAAASywAAAAAAAAAAE8sAAAAAAAAAABTLAAAAAAAAAAAVywAAAAAAAAAAFssAAAAAAAAAABfLAAAAAAAAAAAYywAAAAAAAAAADoQAyz/wAAAAAAAAAcs/8AAAAAAAAAIBA94AGQDLAAAAAAAAAAABywAAAAAAAAAAAssAAAAAAAAAAAPLAAAAAAAAAAAEywAAAAAAAAAABcsAAAAAAAAAAAbLAAAAAAAAAAAHywAAAAAAAAAACMsAAAAAAAAAAAnLAAAAAAAAAAAKywAAAAAAAAAAC8sAAAAAAAAAAAzLAAAAAAAAAAANywAAAAAAAAAADssAAAAAAAAAAA/LAAAAAAAAAAAQywAAAAAAAAAAEcsAAAAAAAAAABLLAAAAAAAAAAATywAAAAAAAAAAFMsAAAAAAAAAABXLAAAAAAAAAAAWywAAAAAAAAAAF8sAAAAAAAAAABjLAAAAAAAAAAAPhADLAAAAAAAAAAABywAAAAAAAAAAAgED3gAZAMsAAAAAAAAAAAHLAAAAAAAAAAACywAAAAAAAAAAA8sAAAAAAAAAAATLAAAAAAAAAAAFywAAAAAAAAAABssAAAAAAAAAAAfLAAAAAAAAAAAIywAAAAAAAAAACcsAAAAAAAAAAArLAAAAAAAAAAALywAAAAAAAAAADMsAAAAAAAAAAA3LAAAAAAAAAAAOywAAAAAAAAAAD8sAAAAAAAAAABDLAAAAAAAAAAARywAAAAAAAAAAEssAAAAAAAAAABPLAAAAAAAAAAAUywAAAAAAAAAAFcsAAAAAAAAAABbLAAAAAAAAAAAXywAAAAAAAAAAGMsAAAAAAAAAABCEAMsAAAAAAAAAAAHLAAAAAAAAAAACAQPeABkAywAAAAAAAAAAAcsAAAAAAAAAAALLAAAAAAAAAAADywAAAAAAAAAABMsAAAAAAAAAAAXLAAAAAAAAAAAGywAAAAAAAAAAB8sAAAAAAAAAAAjLAAAAAAAAAAAJywAAAAAAAAAACssAAAAAAAAAAAvLAAAAAAAAAAAMywAAAAAAAAAADcsAAAAAAAAAAA7LAAAAAAAAAAAPywAAAAAAAAAAEMsAAAAAAAAAABHLAAAAAAAAAAASywAAAAAAAAAAE8sAAAAAAAAAABTLAAAAAAAAAAAVywAAAAAAAAAAFssAAAAAAAAAABfLAAAAAAAAAAAYywAAAAAAAAAAEYQAyz/wAAAAAAAAAcs/8AAAAAAAAAIBA94AGQDLAAAAAAAAAAABywAAAAAAAAAAAssAAAAAAAAAAAPLAAAAAAAAAAAEywAAAAAAAAAABcsAAAAAAAAAAAbLAAAAAAAAAAAHywAAAAAAAAAACMsAAAAAAAAAAAnLAAAAAAAAAAAKywAAAAAAAAAAC8sAAAAAAAAAAAzLAAAAAAAAAAANywAAAAAAAAAADssAAAAAAAAAAA/LAAAAAAAAAAAQywAAAAAAAAAAEcsAAAAAAAAAABLLAAAAAAAAAAATywAAAAAAAAAAFMsAAAAAAAAAABXLAAAAAAAAAAAWywAAAAAAAAAAF8sAAAAAAAAAABjLAAAAAAAAAAAShADLAAAAAAAAAAABywAAAAAAAAAAAgADgBOEAMsAAAAAAAAAAAHLAAAAAAAAAAACAAOAFIQAywAAAAAAAAAAAcsAAAAAAAAAAAIAA4AVhADLAAAAAAAAAAABywAAAAAAAAAAAgADgBaEAMsAAAAAAAAAAAHLAAAAAAAAAAACAAOAF4fOAKjqMYMAzgCo6jEBy0BZAAAAAAAAAgDOAKjqM4MAzgCo6jMBy0AIAAAAAAAAAgDOAKjqMoMAzgCo6jIByz/wAAAAAAAAAgDOAKgqyYMAzgCoKskBy0AAAAAAAAAAAgDOAKgqyoMAzgCoKsoBy0AAAAAAAAAAAgDOAKgDuoMAzgCoA7oBy0DcYwAAAAAAAgDOAKgDuYMAzgCoA7kBy0BZAAAAAAAAAgAYgc4BIhHRhADOASIR0QEBAgADARmGAAABAAIAAwAEgAWAGs4NHnncGwEczg0efbod3gAZzgMKWdKFAM4DClnSAQUCAAMABADOAwqA4YUAzgMKgOEBAQIAAwAEAM4DCoDihQDOAwqA4gF8AgADAAQAzgMKgOOFAM4DCoDjAQECAAMABADOAwqA5IUAzgMKgOQBAQIAAwAEAM4DCoDlhQDOAwqA5QEBAgADAAQAzgMKgOaFAM4DCoDmAQECAAMABADOAwqA54UAzgMKgOcBAAIAAwAEAM4DCoDohQDOAwqA6AEAAgADAAQAzgMKgOmFAM4DCoDpAQACAAMABADOAwqA6oUAzgMKgOoBAAIAAwAEAM4DCoDrhQDOAwqA6wEBAgADAAQAzgMKgOyFAM4DCoDsAQACAAMABADOAwqA7YUAzgMKgO0BAQIAAwAEAM4DCoDuhQDOAwqA7gEAAgADAAQAzgMKgO+FAM4DCoDvAQACAAMABADOAwqA8IUAzgMKgPABAAIAAwAEAM4DCoDxhQDOAwqA8QEAAgADAAQAzgMKgPKFAM4DCoDyAQACAAMABADOAwqA84UAzgMKgPMBAAIAAwAEAM4DCoD0hQDOAwqA9AEAAgADAAQAzgMKgQSFAM4DCoEEAQACAAMABADOAwo2r4UAzgMKNq8BAQIAAwAEAM4DCjaqhQDOAwo2qgEFAgADAAQAzgMKNrGFAM4DCjaxAQUCAAMABAAegwAAAQACgc4AqFHngwDOAKhR5wEBAgEfggCAAYAghQCAAYACgAOABIHOAA3isYMAzjY9g2kBAQIAIYAi2SRmYTFiMTVhMC05MzE1LTRlNWMtODIyYy00MjY1NmRjNWI5ZmMjggDLAAAAAAAAAAABgCSEAM8AAAGHOUFmAAHOZCZ6DALOZCZ6WwPOZCU7KSWDAIABhwCBAM8AAAGHMW8bGQGBAM8AAAGHMW8bGQKBAM8AAAGHMW8bGQOBAM8AAAGHMW8bGQSBAM8AAAGHMW8bGQWBAM8AAAGHMW8bGQaBAM8AAAGHMW8bGQLPAAABhzFvGxkmggDOZCbLQAGDzQPpAc0D6gHNA+sBJ4MAAAEAAoAoggCDAAABAAIAAYMBhQABAQECAAMABAAChQACAQECAAMABAADhQADAQECAAMABAAphABlAc8AAAGHNlMAWwIAAwAqggCHAYIAAQECAoIAAgEAA4IAAwEABIIABAEABYIABQEABoIABgEAB4IABwEAAc8AAAGHNkeWYiuDAAIBgmTPAAABhzlBZgBlzwAAAYc5QWYAAoIBhwABAbjliqnmlLvvvIzov5zmlrnnmoTmj7TliqkCzwAAAYc7beLSAwAEgc4AqAO5gwDOAKgDuQHLQI9AAAAAAAACAAUABqZzeW10ZW0ChwACAazlkajmnKvmtLvliqgCzwAAAYdaVArVAwAEgc4AqAO5gwDOAKgDuQHLQKdwAAAAAAACAAUABqZzeW10ZW0shgAAAQACAAMABAAFAC2CAM4AAYafAap7ImZsYWciOjB9LoMAAwGAAs8AAAGHMZu/jw=="
          const data = Base64.toUint8Array(res);
          const decodeData = msgpack.decode(data);
          const NewGamePlayer = new GamePlayer()
          const NewGamePlayers = new GamePlayers()
          NewGamePlayer.MsgReadFromBuffer(decodeData, true);
          NewGamePlayers.MsgReadFromBuffer(decodeData, true);
          // const updata = (NewGamePlayer) => {
          //   for (const k in NewGamePlayer) {
          //     const keys = Object.keys(NewGamePlayer.BagManager.__base_);
          //     const values = Object.values(NewGamePlayer.BagManager.__base_);
          //     keys.forEach((key, index) => {
          //       NewGamePlayer.BagManager[key] = values[index];
          //       // delete NewGamePlayer.BagManager.__base_[key];
          //     });
          //   }
          // }
          // updata(NewGamePlayer)
          const updata = (obj1, obj2) => {
            for (const k in obj1) {
              if (k === 'BagManager') {
                const base = NewGamePlayer[k].__base_;
                for (const prop in base) {
                  NewGamePlayer[k][prop] = base[prop]
                }
              }
            }
            for (const k in obj2) {
              if (k === 'BagManager') {
                const base = NewGamePlayer[k].__base_;
                for (const prop in base) {
                  NewGamePlayers[k][prop] = base[prop];
                }
              }
            }
          }
          updata(NewGamePlayer, NewGamePlayers)
          this.form.jsonData = NewGamePlayer
          this.player = NewGamePlayers
          this.isShowEditor = true
          // 23   32   37  40
          //   }
          // })
        }
      }
    },
    onJsonSave() {
      // function fun(originalObj, updatedObj) {
      //   for (const key in updatedObj) {
      //     if (originalObj.hasOwnProperty(key) && originalObj[key] !== updatedObj[key]) {
      //       Object.setPrototypeOf(originalObj[key], Object.getPrototypeOf(originalObj))
      //       if (originalObj[key] !== updatedObj[key]) {
      //         originalObj[key] = updatedObj[key]
      //         console.log(originalObj[key], 'originalObj[key]');
      //         Object.setPrototypeOf(originalObj[key], Object.getPrototypeOf(originalObj))
      //       }
      //     }
      //   }
      //   return originalObj;
      // }
      // const data = fun(this.player, this.form.jsonData)
      // ----------------------
      // function fun(oldObject, newObject) {
      //   Object.keys(newObject).forEach(function(key) {
      //     if (oldObject.hasOwnProperty(key) && oldObject[key] !== newObject[key]) {
      //       oldObject[key] = newObject[key];
      //       Object.setPrototypeOf(oldObject[key], Object.getPrototypeOf(oldObject))
      //     }
      //   });
      //   return oldObject
      // }
      // Object.setPrototypeOf(this.form.jsonData, Object.getPrototypeOf(Object.getPrototypeOf(this.player)));
      // -------------
      // function updateObject(oldObj, newObj) {
      //   for (const prop in newObj) {
      //     if (newObj.hasOwnProperty(prop)) {
      //       if (typeof newObj[prop] === 'object') {
      //         if (Array.isArray(newObj[prop])) {
      //           if (!Array.isArray(oldObj[prop])) {
      //             oldObj[prop] = [];
      //           }
      //           updateArray(oldObj[prop], newObj[prop]);
      //         } else {
      //           if (!oldObj.hasOwnProperty(prop)) {
      //             oldObj[prop] = {};
      //           }
      //           updateObject(oldObj[prop], newObj[prop]);
      //         }
      //       } else {
      //         if (oldObj[prop] !== newObj[prop]) {
      //           oldObj[prop] = newObj[prop];
      //         }
      //       }
      //     }
      //   }
      //   return oldObj
      // }

      // function updateArray(oldArray, newArray) {
      //   for (let i = 0; i < newArray.length; i++) {
      //     if (typeof newArray[i] === 'object') {
      //       if (Array.isArray(newArray[i])) {
      //         if (!Array.isArray(oldArray[i])) {
      //           oldArray[i] = [];
      //         }
      //         updateArray(oldArray[i], newArray[i]);
      //       } else {
      //         if (!oldArray[i]) {
      //           oldArray[i] = {};
      //         }
      //         updateObject(oldArray[i], newArray[i]);
      //       }
      //     } else {
      //       if (oldArray[i] !== newArray[i]) {
      //         oldArray[i] = newArray[i];
      //       }
      //     }
      //   }
      // }
      // --------------
      // console.log(this.form.jsonData, 'this.form.jsonData');
      // for (const prop in this.form.jsonData.BagManager) {
      //   if (prop !== '__base_' || prop !== '__old_base_' || prop !== '_dirtys' || prop !== '_name' || prop !== '_meta_class') {
      //     console.log(prop);
      //   }
      // }
      function updateObject(oldObj, newObj) {
        for (const prop in newObj) {
          if (newObj.hasOwnProperty(prop) && oldObj.hasOwnProperty(prop)) {
            if (typeof newObj[prop] === 'object' && newObj[prop] !== null) {
              updateObject(oldObj[prop], newObj[prop]);
            } else {
              oldObj[prop] = newObj[prop]
            }
          }
        }
        return oldObj;
      }
      const data = updateObject(this.player, this.form.jsonData)
      console.log(data, 'data=====');
      const objData = Object.create(null);
      data.MsgHandleDirtyMark(objData, true);
      console.log(objData, 'objData');
      const EncodeDirtyValues = msgpack.encode(objData)
      const SendData = Base64.fromUint8Array(EncodeDirtyValues)
      // const params = {
      //   role_id: this.form.role_id,
      //   data: SendData
      // }
      // handleUserInfo(JSON.stringify(params)).then(res => {
      //   console.log(res);
      // })
    },
    onchange(value) {
      console.log(value === this.form.jsonData);
    },
    updateJson(newValue) {
      this.jsonData = JSON.parse(newValue)
    }
  }
};
</script>
