import Emot from './Emot.js' // 表情数据
import AppraiseEditor from '../editor/appraise-editor/appraise-editor.vue'
export default {
	props: {
    value:'',
  },
	data() {
		return {
			uploadImgCtrl: false,
			recordCtrl: false,
			wordCount: 0,
			commentCount:0,
      editor:'',
      content:'',
			comment:'',
      emotList: Emot.emotList, // 表情数组,
		}
  },
	components:{
		// UploadImgModal,
		// RecordModal
    // CommentTip
    AppraiseEditor
	},
	watch: {

	},
  computed: {
    inputLength: function () {
	    return 200 - this.wordCount
    },
  },
	methods: {
		closeModal: function(tpl){
			this.uploadImgCtrl = false
			this.recordCtrl = false
		},

		// 字数变化
		changeText: function(){
      let content = $(".editor-content").html()
      this.$emit('change',content)
    },

		// 添加 评论
		addComment: function() {
      this.changeText()
			if(!this.value.content) {
				this.$notify(util.notifyMessage('warning', '内容不能为空!'))
				return false
			}
      this.wordCount = util.wordCount(this.value.content)
			if(this.wordCount > 200) {
				this.$notify(util.notifyMessage('warning', '超字数啦'))
				return false
			}
			this.publishComment()
		},
		// 发表评论
		publishComment: async function() {
      console.log('插入每条评论数据',this.value)
      this.wordCount = 0
      this.reply.isShowCommentEditor = false
      topic.transComment(JSON.stringify(this.value));
    },
    showCommentEditor:function(){
		  //TODO 是否需要一直显示评论编辑器？
      this.reply.isShowCommentEditor = true
      setTimeout(() => {
        $('#comment-editor-'+this.reply.id).focus()
      }, 200)
		},
		// 表情选择
		emotSelect: function(item) {
			$('.editor-content').focus()
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
	},
	mounted(){

  },
  created() {

  },

}

