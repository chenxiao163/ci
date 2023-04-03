import md5 from 'js-md5';
export const organizeCode = (params) => {
  /**
   * 1、没有大写 toLowerCase
   * 2、不超过32位
   */
  const strArr = []
  const keyArr = Object.keys(params)
  const sortArr = keyArr.sort()
  for (let i = 0; i < sortArr.length; i++) {
    // 暂时注释掉最大限制
    // && toString.call(params[sortArr[i]]) !== "[object Number]"
    if (toString.call(params[sortArr[i]]) !== "[object Object]") {
      strArr.push(`${sortArr[i]}` + '=' + `${params[sortArr[i]]}` + '&')
    }
    // else if (toString.call(params[sortArr[i]]) === "[object Number]" && params[sortArr[i]] < 2147483647) {
    //   strArr.push(`${sortArr[i]}` + '=' + `${params[sortArr[i]]}` + '&')
    // }
  }
  const finaStr = "sgGmSign-" + `${strArr.join('').substring(0, strArr.join('').length - 1)}` + "-X93KiNAd"
  const md32 = md5(finaStr)
  return md32
}
