import WeEditor from '../editor/editor.vue'

export default{
  name:'we-editor-simple',
  props:{
    value:String
  },
  components:{
    WeEditor,
  },
  data: function () {
    return {
      editorUrl: CloudServer + '/editor/reply-editor.html?uploadUrl=' + sessionStorage.uploadPath,
    }
  },
  methods: {
    input(value){
      console.log(`input ${value}`);
    },
  },
  mounted(){
  },
}
