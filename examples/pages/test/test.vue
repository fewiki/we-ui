<template>
	<div>
		测试
		

		<div v-file-html="testHtml">111</div>
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
        	testHtml: '<div style="color: red">afafafd</div>'
        }
    },
		watch: {

			
		},
		methods: {
			
		},
		mounted() {
			
		}
	}
</script>
