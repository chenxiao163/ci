import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
// import router from '@/router'
import { getToken, getName, getGameMark } from "@/utils/auth";
import Cookies from 'js-cookie'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API1, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests≥≥
  timeout: 60000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    switch (config.urlType) {
      case "v1":
        config.url = process.env.VUE_APP_BASE_API2 + config.url;
        break;
      case "v2":
        if (Cookies.get('ServerUrl') === "") {
          config.url = process.env.VUE_APP_BASE_API3 + config.url
        } else {
          const url = Cookies.get('ServerUrl')
          config.url = url + config.url
        }
        break;
      default:
        config.url = process.env.VUE_APP_BASE_API1 + config.url;
    }

    // debugger;
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Methods"] = "*";
    // config.headers["Access-Control-Allow-Headers"] = "*";
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    // config.headers["Access-Control-Allow-Credentials"] = true;
    // config.headers["responseType"] = "blob";
    // do something before request is sent
    if (config.urlType !== "v2" && config.urlType !== "v1") {
      if (getToken() && getGameMark() && getGameMark() !== "null") {
        config.headers["token"] = getToken();
        config.headers["userName"] = getName();
        config.headers["gameMark"] = getGameMark();
        config.headers["Gmhlsg"] = sessionStorage.getItem("gm_hlsg");
      }
    }

    return config;
  },
  error => {
    // do something with request error
    console.log("----------", error);
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // debugger
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res && res.code && res.code !== 1) {
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === -1) {
        // to re-login
        store.dispatch("user/logout").then(() => {
          // router.push(`/login`)
          if (process.env.NODE_ENV === "production") {
            location.href = "https://tmp.tuyoo.com/";
          } else {
            // router.push(`/login`)
          }
        });
      }
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/logout").then(() => {
            location.reload();
          });
        });
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
