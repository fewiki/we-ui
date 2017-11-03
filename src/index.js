//TODO 这块后面通过loader解决吧
import WeDialog from './dialog/index'
import WeEditor from './editor/editor/editor.vue'
import WeEditorSimple from './editor/simple/simple.vue'
import WeEditorComment from './editor/comment/comment.vue'

import WePage from './page/page.vue'
import './directive/directive'

const components = [
  WePage,
  WeEditor,
  WeEditorSimple,
  WeEditorComment,
]

const WeUi = {
  install(Vue) {
    Vue.use(WeDialog);
    components.forEach(component => {
      Vue.component(component.name, component);
    })
  }
}

export default WeUi
