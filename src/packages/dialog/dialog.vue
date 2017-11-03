<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    v-bind="params"
    :title="finalTitle"
  >
    <slot/>
  </el-dialog>
</template>
<script>
  import Vue from 'vue'
  import Modal from './index'

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
      parent:{
        type:Object
      }
    },
    watch: {
      'visible'(value) {
        if (!this.visible) {
          this.remove();
        }
      }
    },
    data() {
      return {
        visible: true,
        id:UUID.gen(),
      }
    },
    computed:{
      finalTitle(){
        if(this.title !==undefined){
          return this.title;
        }
        return this.params.title;
      }
    },
    methods: {
      hide() {
        this.remove();
      },
      remove: function () {
        this.parent.remove();
      },
    },
  }
</script>
<style>
</style>
