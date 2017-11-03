<template>
	<div class="commentEditor">
		<div class="editor-input">
			<div class="editor-content" contenteditable :id="'comment-editor-' + sourceId" @input="changeText" placeholder="请输入评论内容..."></div>
      <div class="number-statistic text-num" v-if="!isIe">{{wordCount}}/200</div>
			<div class="number-statistic" v-else>最多输入<span class="number-tip">200</span></div>
		</div>

		<div class="editor-bar">
			<div class="emot-ctrl">
				<img :src="staticPath+'/img//smile.png'" />
				<div class="emot-list">
					<img :src="emotItem.path" v-for="(emotItem, index) in emotList" @click="emotSelect(emotItem)">
				</div>
			</div>
			<!--<span class="bar-icon icon-seperate" @click="barSelect(0)"><img src="static/img/topic/text.png" /></span>-->
			<span class="bar-icon icon-seperate" @click="barSelect(1)"><img :src="staticPath+'/img/photo.png'" /></span>
			<span class="bar-icon" @click="barSelect(2)"><img :src="staticPath+'/img//voice.png'" /></span>
		</div>



		<!--上传图片-->
		<upload-img-modal :modalCtrl="uploadImgCtrl" :sourceId='sourceId' ></upload-img-modal>
		<!--录音-->
		<record-modal :modalCtrl="recordCtrl" v-if="recordCtrl"></record-modal>
	</div>
</template>

<style lang="less">
	.commentEditor {
		.editor-bar {
			margin-top: 6px;
		}
		.bar-icon {
			padding: 0 12px;
			height: 12px;
			cursor: pointer;
		}
		.icon-seperate {
			border-right: 1px solid #eee;
		}
		.editor-input {
			position: relative;
			border: 1px solid #ddd;
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			-moz-box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			margin-top: 10px;
			min-height: 60px;
			background: #fff;
		}
		.editor-input:after,
		.editor-input:before {
			border: solid transparent;
			content: ' ';
			height: 0;
			top: -30%;
			position: absolute;
			width: 0;
			transform: rotate(270deg);
			-ms-transform:rotate(270deg);
			-moz-transform:rotate(270deg);
			-webkit-transform:rotate(270deg);
            -o-transform:rotate(270deg);

		}
		.editor-input:after {
			border-width: 10px;
			border-left-color: #fff;
			top: -19px;
			left: 20px;
		}
		.editor-input:before {
			border-width: 10px;
			border-left-color: rgba(0,0,0,0.1);
			top: -21px;
			left: 20px
		}
		.editor-arrow {
			display: none !important;
			position: absolute;
			font-size: 0;
			line-height: 0;
			top: -9px;
			left: 10px;
			display: inline-block;
			border: 10px dashed #fff;
			border-top-width: 0;
			border-bottom-style: solid;
			border-left-color: transparent;
			border-right-color: transparent;
		}
		.editor-content {
			min-height: 60px;
			max-height: 100px;
			overflow-y: auto;
			padding: 6px 10px;
			color: #555;
			&:empty:before {
				content: attr(placeholder);
				font-size: 16px;
				color: #999;
			}
			&:focus:before {
				content: none;
			}
			img {
				max-width: 22px;
			}
		}
		.number-statistic {
			position: absolute;
			bottom: 3px;
			right: 20px;
			color: #888;
			font-size: 12px;
			.number-tip {
				color: red;
			}
		}
		.publish-comment {
			position: absolute;
			bottom: -46px;
			right: 20px;
			background: #009fe7;
			color: #fff;
			padding: 2px 10px;
			cursor: pointer;
			border-radius: 6px;
		}
		.publish-comment:hover {
			background: #0088cc;
		}
		//表情
		.emot-ctrl {
			cursor: pointer;
			padding: 0 10px;
			margin-top: 10px;
			display: inline-block;
		}
		.emot-list {
			position: absolute;
			z-index: 9999;
			width: 360px;
			height: 150px;
			overflow-y: auto;
			display: none;
			background: #fff;
			padding: 15px;
			-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			-moz-box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			box-shadow: 0 0 5px rgba(0, 0, 0, .2);
			>img {
				margin: 6px;
				cursor: pointer;
				width: 22px;
			}
			>img:hover {
				background: #eee;
				border-radius: 6px;
			}
		}
		.emot-ctrl:hover .emot-list {
			display: block;
		}
	}
</style>

<script>
	import { commentEditor } from './comment.js'
	export default commentEditor
</script>
