function objserialize(obj) {
  let str = ''
  for (var key in obj) {
    str += key + '=' + obj[key] + '&'
  }
  return str.slice(0, -1)
}
export default objserialize
