import Vue from 'vue'
// id to name
/**
 * 根据ID返回印章名称
 * @param id 印章id
 * @param data 被搜索的印章列表
 */
Vue.filter('sealIdToName', function(id,data) {
  let item = getNameByid(id,data)[0]
  return item.name
})
/**
 * 根据学生id获取真实姓名
 * @param id 用户Id
 * @param data 用户列表
 */
Vue.filter('userIdToName', function(id,data) {
  return userIdToName(id,data)
})
/**
 * 根据用户id获取用户真实姓名
 * @param id 用户ID
 * @param data 用户列表
 */
window.userIdToName = function(id,data) {
  let item = getNameByid(id, data, 'StudentId')[0]
  if(!item){
    item = {StudentTrueName: store.get('userInfo').trueName}
  }
  // 英文取4个，中文取后三个
  let name = item.StudentTrueName
  if(/[\u4e00-\u9fa5]/.test(name)) {
    name = name.substr(-2, 2)
  } else{
    name = name.substr(-4, 4)
  }
  return name
}

Vue.filter('userIdToAllName', function(id,data) {
  return userIdToAllName(id,data)
})
window.userIdToAllName = function(id,data) {
  let item = getNameByid(id, data, 'StudentId')[0]
  if(!item){
    item = {StudentTrueName: store.get('userInfo').trueName}
  }
  // 英文取4个，中文取后三个
  let name = item.StudentTrueName
  // if(/[\u4e00-\u9fa5]/.test(name)) {
  //   name = name.substr(-2, 2)
  // } else{
  //   name = name.substr(-4, 4)
  // }
  return name
}

/**
 * @param id 要搜索的字段
 * @param 被搜索的列表
 * @param 被搜索列表的字段
 * @returns 过滤后的搜索列表
 */
function getNameByid(id, data, type='id') {
  return data.filter((item)=>{
    if(item[type] == id)
      return item
  })
}
