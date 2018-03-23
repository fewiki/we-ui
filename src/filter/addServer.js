import Vue from 'vue'
import EditorFile from "../util/EditorFile";

Vue.filter('addServer',function(str){
  if(!str)return ''
  return EditorFile.addServerToPath(str)
})
