<template>
	<el-dialog v-model="openModel" :close-on-click-modal='false' :show-close='false' :lock-scroll='false' class="upload-img-modal">
		<!--弹出框顶部-->
		<div class="modalHeader">
			<div class="modalClose" @click = "closeModal()"><i class="el-icon-close"></i></div>
			<div class="modal-title">
				<span class="tips-seperate"></span><span class="tips-text">插入图片</span>
			</div>
		</div>

		<!--弹出框body-->
		<div class="modal-body">
			<div class="img-upload-limt">支持图片： jpg、gif、jpeg、png、bmp，限制5M</div>
			<el-upload
			  ref="uploadCommentImg"
			  :action="uploadUrl"
			  list-type="picture-card"
			  :on-preview="handlePictureCardPreview"
			  :on-remove="handleRemove"
			  :on-success="handleSuccess"
			  accept="image/png,image/gif,image/jpg,image/jpeg,image/bmp">
			  <!--multiple-->
			  <i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog v-model="dialogVisible" size="tiny">
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</div>

		<!--弹出框底部-->
		<div class="modal-footer">
			<div class = "coms-btn coms-btn-blue" @click = "publish()">发表</div>
			<div class = "coms-btn coms-btn-white" @click = "closeModal()">取消</div>
		</div>
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
	import EditorFile from '../../../../util/EditorFile'
	export default {
		props: ['modalCtrl', 'sourceId'],
		data() {
			return {
				openModel:this.modalCtrl,			//弹出框的显示控制
				dialogImageUrl: '',
        		dialogVisible: false,
        		uploadUrl: sessionStorage.uploadPath,
        		imgArray: '', // 图片数组
			}
		},
		watch: {

	    	modalCtrl:function(data){
	    		this.openModel = data
	    	},
	    },
	   	methods: {
	   		//关闭、取消弹出框
			closeModal:function(){
				this.openModel = false
				this.$parent.closeModal()
				// 清空数据
				this.imgArray = []
	  			this.$refs.uploadCommentImg.clearFiles()
			},
			handleRemove(file, fileList) {
		        this.imgArray = fileList
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    handleSuccess(res, file, fileList) {
		    	this.imgArray = fileList
		    },

		    // 处理 图片数组
		    doImgData: function() {
		    	let imgArray = []
		    	this.imgArray.forEach((item,i) => {
		    		imgArray = imgArray.concat(item.response)
		    	})
		    	return imgArray
		    },

		    // 发表
		    publish: async function() {
		    	// 处理图片
          if (Array.isArray(this.imgArray) && this.imgArray.length > 0) {
            this.imgArray = this.doImgData()
            // 将图片数组转成 html
            let imgHtml = EditorFile.imgJsonToHtml(this.imgArray)
            imgHtml = EditorFile.replaceContent(imgHtml)

            // 小组讨论的sourceType为7，不能统一成 从url type获取...
            let sourceType = this.$route.query.type
            if (/groupdiscuss/.test(this.$route.path)) sourceType = 7

            //TODO 庄君祥：处理请求
            this.$emit('input',$editor.html());
            this.closeModal()
          }else {
            this.$notify(notifyMessage('warning', '请选择图片！'))
            return false
          }
		    }
		},
		created() {
		}
	}
</script>
