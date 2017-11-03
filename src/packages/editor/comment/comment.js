import Emot from './util/Emot.js' // 表情数据
import UploadImgModal from './modal/upload-img-modal.vue' // 上传图片
import RecordModal from './modal/record-modal.vue' // 录音弹出框
import EditorFile from '../../util/EditorFile'


import { mapGetters, mapActions,mapState } from 'vuex'
let commentEditor = {
  name:'we-editor-comment',
	props: {
    value:{
      type:String,
    },
    sourceId:{
      type:[Number,String],
    }
  },
	data() {
		return {
			emotList: Emot.emotList, // 表情数组,
			uploadImgCtrl: false,
			recordCtrl: false,
			wordCount: 0,
			commentCount:0,
      isIe: false,         //IE 兼容处理,
      staticPath:window.EmotPath,
		}
	},
	components:{
		UploadImgModal,
		RecordModal
	},
	watch: {
	},
  computed: {
    inputLength: function () {
	    return 200 - this.wordCount
    }
  },
	methods: {
    empty(){
      this.getEditor().html('');
    },
		/**
		 * 工具栏 选择
		 * @param index, 0是文字，1是图片，2是录音
		 */
		barSelect: function(index){
			if(index == 1){
				this.uploadImgCtrl = true
			}else{
				this.recordCtrl = true
			}
		},
		closeModal: function(tpl){
			this.uploadImgCtrl = false
			this.recordCtrl = false

			// 发表录音
			if(tpl) {
				tpl = EditorFile.replaceContent(tpl)
				this.publishComment(tpl, true)
			}
		},
		// 表情选择
		emotSelect: function(item) {
			$('#comment-editor-' + this.sourceId).focus()
			Emot.insertEmot(item.path)
		},
		// 表情数据处理, 添加type='emoji' 属性
		doEmotHtml: function(content){
			// 匹配img表情
			var regImg = /<img[^>]+>/gi //匹配 img <img src="/static/emoji/emoji2.png">
			var regEmoji = /emoji[0-9]+/gi //匹配  [/emojix]
			content = content.replace(regImg, function(str) {

				str.replace(regEmoji, function(strEmoji) {
					str =  '[/' + strEmoji +']'
				})
				return str
			})
			return content
		},
    getEditor: function () {
      return $('#comment-editor-' + this.sourceId);
    },

    // 字数变化
		changeText: function(content){
			let $editor = this.getEditor()

			this.wordCount = window.wordCount($editor.html());
			this.$emit('input',$editor.html());
    },
	},
	mounted() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.isIe = true
    }
  }
}

export {
	commentEditor
}
