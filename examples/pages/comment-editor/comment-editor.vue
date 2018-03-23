<template>
  <div>
    <h1>编辑器-新建</h1>
    <we-comment-editor @change="doSomething"></we-comment-editor>
    <div>编辑器绑定值: {{value}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        value: '',
      }
    },
    watch: {

    },
    methods: {
      doSomething(content) {
        this.value = content
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less">

</style>

