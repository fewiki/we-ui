<template>
	<div id="theme-discuss" class="topic-container">
		<div class="main container">
			<div class="coms-module main-content left-panel">
				<div class="theme-title ">

					<detail-header-title :title="title"></detail-header-title>

					<div class="context font-content size-font-content" v-file-html="details.content"></div>

					<div class="publish-info font-date ctt-font-date">
						<span>{{details.userName}}</span>
						<span>{{details.releaseTime | showDate}}</span>
						<img src="static/img/people1.png" />
						<span>{{details.className}}</span>

						<div class="divide-line"></div>

						<div class="topic-reply-btn">
							<div class="coms-btn coms-btn-blue" @click="showReplyEditor(false)">回复主题</div>
						</div>
					</div>
				</div>
				<!-- 回复内容统一处理-->
				<reply-list :allowDelete="allowDelete" :userId="userId"></reply-list>
			</div>


      <div class="right-panel font-content comment">
				<!-- 倒计时 -->
				<clock :endTime="details.endTime" :releaseTime="details.releaseTime" :close="details.close" :appoint="details.appoint"></clock>

        <reply-stats></reply-stats>
				<!--投票-->
				<vote-modal></vote-modal>
				<!--人气排名-->
				<rank-modal></rank-modal>
				<!--活跃排名-->
				<active-rank></active-rank >
			</div>

		</div>

    <Bar></Bar>
		<!--学生参与情况弹出框-->
		<join-status :modalCtrl="statusModalCtrl" :isFinish="isFinish"></join-status>
	</div>
</template>

<script>

	import common from './common.js'

	export default common
</script>

<style lang="less">
	@import '../../../../less/skin.less';
	@import '../../../../less/common.less';
	@import 'less/common.less';
</style>
