/**
 * 保持代码整洁优雅，享受编程
 * @author lgzhang08@gmail.com * 
 * 
 *  表情 相关
 */
class Emot {
	 // 构造  
    constructor() {
//  	this.emotText = ['微笑','龇牙','疑问','恐惧','崇拜','调皮','顶','晕','送礼','送花','研究','做作业','害羞','憨笑','加油','谢谢','牛','胜利','OK','鲜花','鄙视','得意','汗','囧','哭','困','呵呵','惊讶','乖','恶魔','臭','鬼脸','哼','酷','流汗','马上哭','美丽','怒','潜水','色','傻眼','生气','输了','睡觉','衰','可爱','呜呜','委屈','吐血','抓狂']
		this.emotList = []
		this.testPath = './img/smile.png'
    	for(let i=1; i<100; i++) {
    		var id = 'emoji'+i
    		this.emotList.push({
    			id: id,
//  			name: item,
    			path:'./static/img/emot/'+ id + '.png'
    		})
    	}
    }  
	/**
	 * 正则匹配表情
	 * 将其转成 img src的值
	 */
    macthReplaceEmot(content) {
		let reg=/\[.+?\]/g
		content = content.replace(reg, function(str){
			let imgId = str.substr(4,2)
			str = window.emotPath + imgId + ".gif"
			str = `<img src="${str}">`
			return str
		})
		content = content.replace(/\n/g, function(str){
			return '<br>'
		})
		return content;
	}
    
    /**
     *  在div 里插入文字
	 */
    insertText(text) {
		var sel, range, html;
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            range = sel.getRangeAt(0);
	            range.deleteContents();
	            range.insertNode( document.createTextNode(text) );
	        }
	    } else if (document.selection && document.selection.createRange) {
	        document.selection.createRange().text = text;
	    }
	}
    
     /**
     *  在div 里插入表情图片
	 */
    insertEmot(imgUrl) {
		var sel = document.selection;
	    if (sel) {
	        var textRange = sel.createRange();
	        document.execCommand('insertImage', false, imgUrl);
	        textRange.collapse(false);
	        textRange.select();
	    } else {
	        document.execCommand('insertImage', false, imgUrl);
	    }
	}
	
	
}
  
// 单例模式
export default new Emot()
