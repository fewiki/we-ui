<template>
	<div id="comment-editor-container">
    <div class="comment-tip" v-if="true">
      <span class="comment-btn" @click="showCommentEditor">我也评一句</span>
    </div>
    <div class="comment-editor">
      <div class="editor-input">
        <div class="editor-content" contenteditable @input="changeText" placeholder="请输入评论内容..."></div>
        <div class="number-statistic text-num">{{wordCount}}/200</div>
        <div class="publish-comment" @click="addComment">发表</div>
      </div>
      <div class="editor-bar">
        <div class="emot-ctrl">
          <img src="./img/smile.png" />
          <div class="emot-list">
            <img :src="emotItem.path" :key="emotItem.id" v-for="emotItem in emotList"  @click="emotSelect(emotItem)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import url('./comment-editor.less');
</style>

<script>
import commentEditor from "./comment-editor.js";
export default commentEditor;
</script>
