/**
 *
 */
export default {
  name: 'we-page',
  props: {
    params: {
      page: {
        type: Object,
        default: {}
      },
      loadData: {
        type: Function,
        default: function () {
          console.log('没有加载数据的接口');
        }
      },
      data: {
        type: Object,
        default: {}
      }
    },
    loadNow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      result: {}
    }
  },
  watch: {
    'loadNow'() {
      if (this.loadNow) {
        this.initData();
      }
    },
    'page.currentPage'() {
      this.refresh()
    },
    'page.pageSize'() {
      this.refresh()
    },
  },
  computed: {
    list() {
      return this.result.list || [];
    },
    page() {
      return this.params.page || {};
    },
    data() {
      return this.params.data;
    },
    httpData() {
      return Object.assign(this.page, this.data);
    },
    loadData() {
      return this.params.loadData;
    },
  },
  methods: {
    refresh() {
      this.$emit('refresh');
      this.initData();
    },
    changePageNum(value) {
      this.page.currentPage = value;
      this.refresh();
    },
    changePageSize(value) {
      this.page.pageSize = value;
      this.refresh();
    },
    async initData() {
      //TODO 庄君祥： 这块发请求需要进一步封装
      this.result = await  this.loadData(this.httpData);
      //TODO 庄君祥：这里逻辑怪怪的
      this.page.totalCount = this.result.page.totalCount;
      this.page.pageSize = this.result.page.pageSize;
    }
  },
  created() {
    if (this.loadNow) {
      this.initData();
    }
  }
}
