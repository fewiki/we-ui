<template>
	<div class="comment-editor-container">
    <!--<div class="comment-tip" v-if="true">-->
      <!--<span class="comment-btn" @click="showCommentEditor">我也评一句</span>-->
    <!--</div>-->
    <div class="comment-editor" v-if="true">
      <div class="editor-input">
        <div class="editor-content" contenteditable @input="changeText" id="comment-editor" placeholder="请输入评论内容..."></div>
        <div class="number-statistic text-num">{{wordCount}}/200</div>
        <!--<div class="publish-comment" @click="addComment">发表</div>-->
      </div>
    </div>
	</div>
</template>

<style lang="less">
  .comment-editor-container{
    .comment-editor {
      /*padding-left:100px;*/
      margin-top: 15px;
      /*width: 600px;*/
      box-sizing:border-box;
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
      .text-num {

      }
      .publish-comment {
        position: absolute;
        bottom: -46px;
        right: 20px;
        background: #009fe7;
        color: #fff;
        padding: 5px 15px;
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
    .comment-tip {
      margin-top: 15px;
      height: 38px;
      line-height: 38px;
      position: relative;
      background: #fff;
      border: 1px solid #e6e6e6;
      width:100%;
      box-sizing:border-box;
      padding-left: 15px;
      .comment-btn {
        cursor: pointer;
        font-size: 1.4rem;
        color: #989898;
        display: block;
      }
    }
  }

</style>

<script>
	import commentEditor  from './comment-editor.js'
	export default commentEditor
</script>
