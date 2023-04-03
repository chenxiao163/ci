import request from "@/utils/request";

// export function getUserInfo(UrlKey, GamePlayerID) {
//   const UrkKey = UrlKey
//   return request({
//     url: `/v1/getUserInfo/gm?${UrkKey}=${GamePlayerID}`,
//     method: "get",
//     urlType: "v2"
//   });
// }

export function getUserInfo(UrlKey, GamePlayerID) {
  const UrkKey = UrlKey
  return request({
    url: `/v1/getUserInfo/gm?${UrkKey}=${GamePlayerID}`,
    method: "get",
    urlType: "v2"
  });
}

export function handleUserInfo(params) {
  return request({
    url: "/v1/handleUserInfo/gm",
    method: "post",
    urlType: 'v2',
    data: params
  })
}

export function sendItems(params) {
  return request({
    url: "/v1/sendItems/gm",
    method: "post",
    urlType: 'v2',
    data: params
  })
}
