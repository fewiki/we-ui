<template>
  <iframe :src="editorUrl" :id="id" frameborder="0" :width="width" :height="height"
          class="zhlEditor modal-content-right vertical-top create-group-discuss-editor"></iframe>
</template>

<style lang="less">

</style>

<script>
    export {default} from './editor.js'
</script>
