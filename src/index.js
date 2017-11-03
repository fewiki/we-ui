import WeEditor from './packages/editor/editor/editor.vue'
// import WeEditorSimple from './packages/editor/simple/simple.vue'
// import WeEditorComment from './packages/editor/comment/comment.vue'
// import WePage from './packages/page/page.vue'


import './directive/directive'

const components = [
  WeEditor,
  // WeEditorSimple,
  // WeEditorComment,
]

const WeUi = {
  install(Vue) {
    components.forEach(component => {
      console.log(component)
      Vue.component(component.name, component);
    })
  }
}

export default WeUi