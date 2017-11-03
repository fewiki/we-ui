<template>
  <div class="page">
    <template v-if="list.length > 0">
      <slot name="item"
            v-for="(entity,index) in list"
            :entity="entity"
            :list="list"
      >
      </slot>
    </template>
    <div v-else>
      <slot name="empty"><div class="no-data">哎呀!没有数据啦,请稍后再试</div></slot>
    </div>

    <div class="pagination-box" v-show="page.totalCount > 1">
      <!-- 分页组件 -->
      <el-pagination
        :total="page.totalCount"
        :pageSize="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePageNum"
        @size-change="changePageSize">
      </el-pagination>
    </div>
  </div>

</template>

<style lang="less">
</style>

<script>
  export {default} from './page.js'
</script>
