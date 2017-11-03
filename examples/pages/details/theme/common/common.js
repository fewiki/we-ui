import ReplyList from '@/components/reply/reply-list/reply-list.vue'
import ReplyStats from '@/components/stats/reply-stats/reply-stats.vue'

import Clock from '@/components/bar/clock/clock.vue'
// import TeacherComment from '../coms/teacher-comment/teacher-comment.vue' // 教师点评 显示
// import JoinStatus from "../coms/join-status/join-status.vue"   //学生参与情况弹出框
import RankModal from "@/components/bar/rank/poprank.vue"             //人气排行榜
import ActiveRank from "@/components/bar/rank/activerank.vue"         //活跃排行榜
import Bar from '@/components/bar/teacher-tools/bar.vue'
// import VoteModal from "../coms/vote/vote.vue"             //投票列表

import { mapGetters, mapActions, mapState } from 'vuex'
export default {
	components:{
		ReplyList,
    ReplyStats,
    Clock,
    Bar,
		// TeacherComment,
		// JoinStatus,
		RankModal,
    ActiveRank,
		// VoteModal,
		// DetailHeaderTitle
	},
	data() {
		return {
			details:[],
			currentUser: store.get('currentUser'),
			isFinish: '',
			statusModalCtrl: false,
			releaseTime:'',//开始时间
			endTime:'',//结束时间
			close:'',//是否关闭
			appoint:'',
			attentionId: '',
			type: '',
			title: '',
			allowDelete:'',
			userId:'',
			fromCommunity: this.$route.query.from=='community'			//判断是否来自学生社区，修改模块样式
		}
	},
	watch:{
		addReplyCtrl: function(data) {
			this.getDetailInfo()
		},
		'$route' (to, from) {
            // route变化
            this.getDetailInfo(),
            this.fromCommunity = this.$route.query.from=='community'
        }
	},
	computed: {
		...mapState({
			addReplyCtrl: state => state.topicDetails.addReplyCtrl
		}),
	},
	methods: {
		// 返回
		goBack() {
			this.$router.go(-1)
		},
		//获取详情信息
		async getDetailInfo(){
			let json = {
				releaseId:this.$route.params.releaseId,
				type: this.$route.query.type
			}
			let request = await Detail.getThemeDetail(json)
			let requestJson = await request.json()

			if(requestJson.code==200){
				this.details = requestJson.data
				this.allowDelete = requestJson.data.allowDelete
				this.userId = requestJson.data.userId
				// 缓存内容，用户 分享页 iframe获取
				store.set('currentDetails', this.details)

			}
		},
		// 显示回复编辑器
		showReplyEditor: function(isReplyEdit, item) {
		  if(window.isAndroid){           //调用pad编辑器
        window.discuss.createThemeDiscussReply(String(this.$route.params.releaseId));
        return false
      }
			this.$parent.showReplyEditor(isReplyEdit, item)
		},
		stuPartStatus: function(type) { //学生参与情况的显示与隐藏
			this.isFinish = type
			this.statusModalCtrl = true;
		},
		async isFocus() {		//是否关注
			let param = {
				beFollowerId: this.$route.params.releaseId
			}
			let result = await Detail.isFocus(param)
			let resultJson = await result.json()
			if (resultJson.code == 200) {
				this.follow  = resultJson.data
			}
		},
		// 获取标题
		async getDetailTitle(){
			let param = {
				releaseId: this.$route.params.releaseId,
			}
			let result = await Detail.getDetailTitle(param)
			let resultJson = await result.json()
			if(!!resultJson && resultJson.code == 200){
				this.releaseTime = resultJson.data.releaseTime
				this.endTime = resultJson.data.endTime
				this.close = resultJson.data.close
				this.appoint = resultJson.data.appoint
				this.title = resultJson.data.title
			}
		}
	},
	created(){

	}
}
