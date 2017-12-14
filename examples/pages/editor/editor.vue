<template>
	<div>
    <h1>编辑器-新建</h1>
    <we-editor :editorUrl="editorUrl" :uploadPath="uploadPath" @input="contentChange" height="300"></we-editor>
    <div>编辑器绑定值</div>
    <div>{{content}}</div>

    <h1>编辑器-赋值</h1>
    <we-editor :editorUrl="editorUrl" :uploadPath="uploadPath" :value="content" @input="contentChange" height="300"></we-editor>
    <div>编辑器绑定值</div>
    <div>{{content}}</div>
	</div>
</template>
<style lang="less">

</style>
<script>
  	export default {
		components: {
		},
    data(){
        return {
          editorUrl: window.CloudServer + '/editor/editor.html',
          uploadPath: '',
          content: "<div style='color: red'>Hello World!! </>",
        }
    },
		watch: {

		},
		methods: {
      contentChange(content) {
        this.content = content
        setTimeout(() => {
          hljs.initHighlightingOnLoad();
        }, 1000)

      }
		},
		mounted() {

		}
	}
</script>
