<template>
	<el-dialog v-model="openModel" :close-on-click-modal='false' :show-close='false' :lock-scroll='false' class="upload-img-modal">
		<!--弹出框顶部-->
		<div class="modalHeader">
			<div class="modalClose" @click = "closeModal()"><i class="el-icon-close"></i></div>
			<div class="modal-title">
				<span class="tips-seperate"></span><span class="tips-text">录音</span>
			</div>
		</div>

		<!--弹出框body-->
		<div class="modal-body">
			<iframe src='/static/editor/dialogs/record/record/index.html' style="border:0" width='100%' height='350px'></iframe>
		</div>

		<!--弹出框底部-->
		<!--<div class="modal-footer">
			<div class = "coms-btn coms-btn-blue" @click = "closeModal()">发表</div>
			<div class = "coms-btn coms-btn-white" @click = "closeModal()">取消</div>
		</div>-->
	</el-dialog>
</template>

<style lang="less">
	.upload-img-modal{
		.modal-body{
			padding: 5px;
			text-align: center;
			min-height: 200px;
		}
		.img-upload-limt{
			padding-left: 15px;
			padding-bottom: 20px;
			text-align: left;
			font-size: 14px;
			color:#666 ;
		}
	}
</style>

<script>
	export default {
		props: ['modalCtrl'],
		data() {
			return {
				openModel:this.modalCtrl,			//弹出框的显示控制
				dialogImageUrl: '',
        		dialogVisible: false,
        		uploadUrl: ''
			}
		},
		watch: {

	    	modalCtrl:function(data){
	    		this.openModel = data
	    	},


	    },
	   	methods: {
	   		//关闭、取消弹出框
			closeModal:function(tpl){
				this.openModel = false
				this.$parent.closeModal(tpl)
			},
		},
		created() {
			// 接收html
			let self = this
			window.uploadServerUrl = sessionStorage.uploadPath
			window.insertHtml = function(tpl) {
//				debugger
				self.closeModal(tpl)
        //TODO 庄君祥： 数据绑定
        this.$emit('input',tpl);
			}
		}
	}
</script>
