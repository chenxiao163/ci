import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN"; // lang i18n

import "@/styles/index.scss"; // global css

import axios from 'axios'
import App from "./App";
import store from "./store";
import router from "./router";
import moment from "moment";
import "@/icons"; // icon
import "@/permission"; // permission control
import Editor from 'vue2-ace-editor'
import qs from 'qs'
Vue.component('editor', Editor)
import { setIP } from "./utils/setIP";
// import Vconsole from 'vconsole'
// new Vconsole()
import { eventBusPlugin } from "./utils/event";
Vue.use(eventBusPlugin);
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs
Vue.config.productionTip = false;
setIP();
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
