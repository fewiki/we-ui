export default{
  name:'we-editor',
  props:{
    width:{
      type:String,
      default: '100%',
    },
    height:{
      type:String,
      default: '300',
    },
    value:String,
    editorUrl:{
      type:String,
      default: '/editor.html',
    },
    uploadPath:{
      type:String,
      default: '',
    }
  },
  data: function () {
    return {
      id: 'editor-' + parseInt(Math.random()*10000), //随机4位id
    }
  },
  methods: {},
  mounted(){
    let $this = this;
    setTimeout(e=>{
      
      let $editor = $('#'+this.id)[0].contentWindow.$('#zhlEditor')[0];
  
      if(this.value!=undefined){
        $editor.innerHTML=EditorFile.setContent(this.value);
      }
      
      $editor.addEventListener("input", function(){
        setTimeout(e=>{
          $this.$emit('input',EditorFile.replaceContent($editor.innerHTML));
        },100)
      });
      $editor.addEventListener('DOMNodeInserted', function() {
        $this.$emit('input',$editor.innerHTML);
      });
    },1000)
  },
}
