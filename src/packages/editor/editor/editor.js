export default{
  name:'we-editor',
  props:{
    value:String,
    editorUrl:{
      type:String,
      default: CloudServer + '/editor/editor.html?uploadUrl=' + sessionStorage.uploadPath,
    }
  },
  data: function () {
    return {
      id:UUID.gen(),
      //TODO 这个得想办法解决啊？
    }
  },
  methods: {},
  mounted(){
    let $this = this;
    setTimeout(e=>{
      //TODO 这个需要处理sleep
      let $editor = $('#'+this.id)[0].contentWindow.$('#zhlEditor')[0];
      $editor.addEventListener("input", function(){
        $this.$emit('input',$editor.innerHTML);
      });
      $editor.addEventListener('DOMNodeInserted', function() {
        $this.$emit('input',$editor.innerHTML);
      });
    },1000)
  },
}
