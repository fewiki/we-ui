import * as Coms from './module'

import './directive/directive'
import './filter/filter'

import './directive/file-html'
const WeUi = {
  install(Vue) {
    for (let key in Coms) {
      Vue.component(key, Coms[key]);
    }
  }
}

export default WeUi
