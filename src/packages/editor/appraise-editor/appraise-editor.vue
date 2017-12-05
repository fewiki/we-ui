<template>
	<el-dialog :visible="showCtrl" :close-on-click-modal='false' :show-close='false' :lock-scroll='false' class="appraise-modal">
		<!--弹出框顶部-->
		<div class="modalHeader">
			<div class="modalClose" @click="closeModal()"><i class="el-icon-close"></i></div>
			<div class="modal-title modal-title-center">
				<span class="tips-text">教师点评</span>
			</div>
		</div>
		<!--弹出框body-->
		<div class="modal-body">
			<div class="stamp font-content">
				<span>选印章</span>
				<div class="stamp-wrapper">
					<span v-for="(item,index) in seallist" class="stamp-item" @click="sealChoose(item, index)" :class="{'activeBgColor': item.selected}">
						<span class="stamp-name">{{item.name}}</span>
						<!--<i class="el-icon-circle-close" v-if="!item.initial" @click.stop="deleteStamp(item)"></i>-->
					</span>
					<!--<span class="addstamp-box">-->
						<!--<span class="addstamp"><img src="static/img/topic/addstamp.png" />自定义印章</span>-->
					<!--</span>-->
				</div>
				<!--<div class="stamp-shows" v-show="addStampCtrl">-->
					<!--<el-input class="addsInpnt" v-model="addStampMsg" placeholder="印章名称最多只能输入8个汉字~"></el-input>-->
					<!--<el-button class="btn btnOk">添加</el-button>-->
					<!--<el-button class="btn">取消</el-button>-->
				<!--</div>-->
			</div>

			<textarea v-model="content"></textarea>

			<div class="editor-footer">
				<!--<div class="coms-btn coms-btn-blue">发表</div>-->
				<div class="coms-btn coms-btn-blue" @click="submit">保存</div>
			</div>
		</div>
	</el-dialog>
</template>

<style lang="less">
	@import "appraise-editor.less";
</style>

<script>
	import AppraiseEditor from './appraise-editor.js' // 主js
	export default AppraiseEditor
</script>
