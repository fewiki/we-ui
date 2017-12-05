export default {
	props: ['seallist'],
	components: {

	},
	data() {
		return {
			showCtrl: true,
			editorUrl: '',
			addStampCtrl: false,
			addStampMsg: '',
			currentSeals: [], // 当前选择印章，后面需要改为数组
      content: '',
		}
	},
	watch: {

	},
	methods: {
    closeModal() {
      this.$emit('close', 'close')
    },

    submit() {
      if(this.content.trim() === '' && this.currentSeals.length<=0){
        this.$notify(util.notifyMessage('warning','请选择印章或输入点评内容'))
        return false
      }
  
      if(this.currentSeals.length>5){
        this.$notify(util.notifyMessage('warning','最多选5个印章'))
        return false
      }
      
    	this.$emit('close', 'close')
      this.$emit('submit', {
        sealIds: this.currentSeals.map((item)=>{return item.id}),
        content: this.content
      })

    },

    sealChoose(item) {
      let index = this.currentSeals.findIndex((seal, index)=>{
        return seal.id == item.id
      })
      item.selected = !item.selected
      if(index == -1) {
        this.currentSeals.push(item)
      } else {
        this.currentSeals.splice(index, 1)
      }
    },
    initData() {
      this.seallist.forEach((item, i) => {
        item.selected = false
      })
    }

	},
	created() {
	  this.initData()
	},
	mounted() {

	}
}
