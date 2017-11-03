<template>
  <div
    v-if="visible"
  >
    <slot v-if="visible"/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Vuex from 'vuex'
  import Modal from './index'
  import Dialog from './dialog.vue'

  export default {
    props: {
      name: {
        required: true,
        type: String
      },
      title: {
        type: String
      },
      params:{
        type:Object
      },
    },
    data() {
      return {
        visible: false,
        id:UUID.gen(),
      }
    },
    /**
     * Sets global listeners
     */
    beforeMount() {
      //每一次嵌套的时候，都会进来。那就对map再取一次，如果name一样，就注册。
      Modal.event.$off(`toggle${this.name}`);

      Modal.event.$on(`toggle${this.name}`, (name, state, params) => {
        if (name != this.name) {
          return;
        }
        this.toggle(state, params)
      });

    },
    methods: {
      newDialog() {
        let dialog = new Vue({
          render: h => h(Dialog, {
            props: {
              visible: true,
              name: this.name,
              title: this.title,
              params:this.params,
              parent:this,
            },
          }, [
            this.$slots.default,
            this.$slots.footer,
            this.$slots.title,
          ]),
        });
        dialog.$store=window.$store;
        return dialog;
      },
      show() {
        let dialog;
        if (!Modal.dialogs.has(this.name)) {
          dialog = this.newDialog()
          Modal.dialogs.set(this.name, dialog);
        } else {
          dialog = Modal.dialogs.get(this.name);
        }

        dialog.$mount();
        document.body.appendChild(dialog.$el);
        this.$emit('open');
//        console.log(`modal:${this.name}:${this.id} show`);
      }
      ,
      hide() {
        this.remove();
      }
      ,
      remove: function () {
        if(!Modal.dialogs.has(this.name)){
          return ;
        }
        let dialog = Modal.dialogs.get(this.name);
        dialog.$nextTick(e=>{
          Modal.dialogs.delete(this.name);

          document.body.removeChild(dialog.$el);
          dialog.$destroy();
          this.$destroy();
          this.$emit('close');
          //移除事件
//          console.log(`modal:${this.name}:${this.id} remove`);
        });
      },
      destroy: function () {
        this.remove();
      },

      /**
       * Event handler which is triggered on $modal.show and $modal.hight
       */
      toggle(state, params) {
        if (state) {
          this.show();
        } else {
          if (params.destroy) {
            this.destroy();
          } else {
            this.hide();
          }
        }
      },
    },
    created(){
//      console.log(`modal:${this.name}:${this.id} created`);
    }
  }
</script>
<style>
</style>
