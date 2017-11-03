import Vue from 'vue'
import Modal from './modal.vue'

const defaultComponentName = 'we-dialog'

const Plugin = {
  install (Vue, options = {}) {
    /**
     * Makes sure that plugin can be insstalled only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    this.dialogs=new Map();
    //TODO 这个什么时候会刷新呢？ 路由变了就刷新
    this.dialogEventSet=new Set();
    /**
     * Plugin API
     */
    Vue.prototype.$dialog = {
      show (name, params) {
        Plugin.event.$emit(`toggle${name}`, name, true, params)
      },

      hide (name, params={}) {
        params.destory=false;
        Plugin.event.$emit(`toggle${name}`, name, false, params)
      },

      destroy(name, params={}){
        params.destroy=true;
        Plugin.event.$emit(`toggle${name}`, name, false, params)
      },

      toggle (name, params) {
        Plugin.event.$emit(`toggle${name}`, name, undefined, params)
      }
    }
    /**
     * Sets custom component name (if provided)
     */
    const componentName = options.componentName || defaultComponentName
    Vue.component(componentName, Modal)
    /**
     * Registration of <Dialog/> component
     */
  }
}

export default Plugin
