import Vue from 'vue'
// id to name
Vue.filter('sealIdToName', function(id) {
  let item = getNameByid(id, store.get('topicData').seallist)[0]
  return item.name
})

Vue.filter('userIdToName', function(id) {
  let item = getNameByid(id, store.get('topicData').discussList[0].releaseList[0].studentList, 'StudentId')[0]
  // 英文取4个，中文取后三个
  let name = item.StudentTrueName
  if(/[\u4e00-\u9fa5]/.test(name)) {
    name = name.substr(-3, 3)
  } else{
    name = name.substr(-4, 4)
  }
  return name
})


function getNameByid(id, data, type='id') {
  return data.filter((item)=>{
    if(item[type] == id)
      return item
  })
}
