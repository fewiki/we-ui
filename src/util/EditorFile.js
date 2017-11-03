/**
 * 保持代码整洁优雅，享受编程
 * @author lgzhang08@gmail.com * 
 * 
 *  编辑器文件处理
 */
if(!sessionStorage.uploadPath) {
	
} else{
	window.FileServerUrl = sessionStorage.uploadPath.split('push.do')[0] + '/nor/';
}


class EditorFile {
	// 构造  
	constructor() {
		/**
		 * 各类文件存取方式
		 * 图片：<img src="41805ff0-96b4-4e52-9ed8-4a43de258549-010.jpg" type="uploadImg" style="max-width: 560px; width: 560px; height: 466px;">
		     ie: <img width="288" height="287" style="width: 421px; height: 269px; max-width: 560px;" src="d6a9271f-34fe-4cff-869f-abeadd119fd7-061.png" type="uploadImg">
		 * 音频：music
		 * 视频：video
		 * 附件：attachment
		 */

		// 正则表达式
		// 上传图片
		this.regImg = /<(img|IMG)(\s|[^>]+)type(\=|\s\=\s)('|")uploadImg('|")([^>]+\>|\>)/gi //匹配 img
		// 表情
		this.regEmoji = /[/emoji[0-9]+]/gi
		
		// 音频
		this.regImgAudio = /<(img|IMG)(\s|[^>]+)type(\=|\s\=\s)('|")music('|")([^>]+\>|\>)/gi //匹配 regImgAudio
		this.regAudioPath = /<(audio|AUDIO)(\s|[^>]+)type(\=|\s\=\s)('|")music('|")([^>]+\>|\>)([^>]+|)<\/(audio|AUDIO)>/gi //regImgAudio
		
		// 视频
		this.regImgVideo = /<(img|IMG)(\s|[^>]+)type(\=|\s\=\s)('|")video('|")([^>]+\>|\>)/gi //regVideo
		this.regVideoPath = /<(video|VIDEO)(\s|[^>]+)type(\=|\s\=\s)('|")video('|")([^>]+\>|\>)([^>]+|)<\/(video|VIDEO)>/gi //regVideo
		// 附件
		this.regImgAttach = /<(img|IMG)(\s|[^>]+)type(\=|\s\=\s)('|")attachment('|")([^>]+\>|\>)/gi //regImgAttach
		this.regAttachPath = /<(a|A)(\s|[^>]+)type(\=|\s\=\s)('|")attachment('|")([^>]+\>|\>)([^>]+|)<\/(a|A)>/gi //regAttachPath
		this.regAttachEdit = /<(a|A)(\s|[^>]+)type(\=|\s\=\s)('|")attachment('|")([^>]+\>|\>)/gi // 编辑
	}

	/**
	 * 提取music、attachment、video,并按指定样式展示,
	 * 去掉 绝对路径
	 * 存入数据库使用
	 */
	replaceContent(content) {
		// 去掉从2.6导入过来的换行显示问题
		content = content.replace(/\r\n/g, '<br>');
		// 去掉 空内容
		content = content.replace("<p><br></p>", '');
		// 去掉粘贴过来的网页里的js
		content = content.replace(/<script[^>]+><\/script>/gim, '');
		// 去掉粘贴过来的网页里的iframe
		content = content.replace(/<iframe[^>]+><\/iframe>/gim, '');
		// 去掉粘贴过来的网页里的iframe
		content = content.replace(/<iframe[^>]+><\/iframe>/gim, '');
		// 匹配从qq等 复制粘贴过来的 本地html, 形如 <img src="file:///C:\Users\Administrator\Documents\Tencent Files\1695791973\Image\C2C\059B449EDD7AF89BB7EB48F0668A1961.jpg"/>
		content = content.replace(/<(img|IMG)(\s|[^>]+)src(\=|\s\=\s)\"file:([^>]+\>|\>)/gim, '')

		//找到所有type="uploadImg"的img标签，对内容进行修改
		content = content.replace(this.regImg, function(str) {
			//根据type类型，判断内容
			var url = "";
			// 提取url
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				str1 = 'src="' + str1.split('"')[1].split('/nor/')[1] + '" ';
				return str1;
			})
			return str;
		});

		//找到所有type="muisc"的img标签，对内容进行修改,暂替换成<audio></audio>
		// 并将真实值从url提取出来，赋值给url
		content = content.replace(this.regImgAudio, function(str) {
			//根据type类型，判断内容
			var url = "";
			//交换 src与url的值， 暂存src的值
			var tmpSrc = '';
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成 src
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				str1 = 'src="' + str1.split('"')[1].split('/nor/')[1] + '" ' + tmpSrc.replace('src=', 'url=');
				return str1;
			})

			// 修改str 变成 <audio></audio>
			str = str.replace('img', 'audio') + '</audio>';
			// 去掉 前自动加上的 /
			str = str.replace('/></audio>', '></audio>')
			return str;

		});

		//找到所有type="video"的img标签，对内容进行修改,暂替换成<audio></audio>
		content = content.replace(this.regImgVideo, function(str) {
			console.log(str)
			//根据type类型，判断内容
			var url = "";
			//交换 src与url的值， 暂存src的值
			var tmpSrc = '';
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成 src
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				str1 = 'src="' + str1.split('"')[1].split('/nor/')[1] + '" ' + tmpSrc.replace('src=', 'url=');
				return str1;
			})

			// 修改str 变成 <audio></audio>
			str = str.replace('img', 'video') + '</video>';
			// 去掉 前自动加上的 /
			str = str.replace('/></video>', '></video>')
			return str;
		});

		//找到所有type="attachment"的img标签，对内容进行修改,暂替换成a
		content = content.replace(this.regImgAttach, function(str) {
			//根据type类型，判断内容
			var url = "";
			//交换 src与url的值， 暂存src的值
			var tmpSrc = '';
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成,href, 并增加'target="_blank"
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				str1 = 'target="_blank" href="' + str1.split('"')[1].split('/nor/')[1] + '" ' + tmpSrc.replace('src=', 'url=');
				return str1;
			})

			// name
			var name = '';
			str.replace(/name\=\"[^"]+\"/im, function(str2) {
				name = str2.split('"')[1];
			})

			// 修改str 变成a,并增加内容
			str = str.replace('img', 'a') + name + '</a>';
			// 去掉 前自动加上的 /
			str = str.replace('/>', '>');
			return str;
		});
		// 返回数据
		return content;
	};

	/*提取music、attachment、video,并按指定样式放入编辑器*/
	setContent(content) {
		content = decodeURIComponent(content)
		// 去掉从2.6导入过来的换行显示问题
		content = content.replace(/\r\n/g, '<br>');
		//找到所有type="uploadImg"的img标签，对内容进行修改
		content = content.replace(this.regImg, function(str) {
			//根据type类型，判断内容
			var url = "";
			var name = "";
			// 提取 src 增加绝对路径
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				// 添加全路径
				str1 = 'src="' + window.FileServerUrl + str1.split('"')[1] + '"';
				return str1;
			})
			return str;
		});

		//找到所有type="muisc"的img标签，对内容进行修改,暂替换成<audio></audio>
		content = content.replace(this.regAudioPath, function(str) {
			//根据type类型，判断内容
			var url = "";

			//交换 src与url的值， 暂存src的值
			var tmpSrc = '';
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成 src
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				// 交换值
				str1 = 'src="' + str1.split('"')[1] + '" ' + 'url="' + window.FileServerUrl + tmpSrc.split('"')[1] + '"';
				return str1;
			})

			// 修改<audio></audio>  变成  img
			str = str.replace('</audio>', '').replace('audio', 'img');
			return str;
		});

		//找到所有type="video"的img标签，对内容进行修改,暂替换成<audio></audio>
		content = content.replace(this.regVideoPath, function(str) {
			var url = "";
			//交换 src与url的值， 暂存src的值
			var tmpSrc = '';
			str = str.replace(/src\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成 src
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				// 交换值
				str1 = 'src="' + str1.split('"')[1] + '" ' + 'url="' + window.FileServerUrl + tmpSrc.split('"')[1] + '"';
				return str1;
			})

			// 修改<audio></audio>  变成  img
			str = str.replace('</video>', '').replace('video', 'img');
			return str;
		});

		//找到所有type="attachment"的img标签，对内容进行修改,暂替换成 img
		content = content.replace(this.regAttachPath, function(str) {
			var url = "";
			//去掉name 及后面的a标签
			str.replace(this.regAttachEdit, function(str3) {
				str = str3
			})
			//交换 href与url的值， 暂存href的值
			var tmpSrc = '';
			str = str.replace(/href\=\"[^"]+\"/gim, function(str1) {
				tmpSrc = str1
				str1 = '';
				return str1;
			})
			// 提取url 改成 src
			str = str.replace(/url\=\"[^"]+\"/gim, function(str1) {
				// 交换值
				str1 = 'src="' + str1.split('"')[1] + '" ' + 'url="' + window.FileServerUrl + tmpSrc.split('"')[1] + '"';
				return str1;
			})

			// 修改<a  变成  img
			str = str.replace('<a', '<img');
			return str;
		});
		// 返回数据
		return content;
	};

	/*提取music、attachment、video,并加入文件服务器全路径*/
	addServerToPath(content) {
//		  console.log(content)
		//找到所有type="uploadImg"的img标签，对内容进行修改
		content = content.replace(this.regImg, function(str) {
			// 提取url
			str = str.replace(/src[=\"\'\s]+([^\"\']+)[\"\']/gim, function(str1) {
				// 添加全路径
				var url = window.FileServerUrl + str1.split('"')[1]
				str1 = 'src="' + url + "?" + window.NormalImgThumb+ '"' + ' onclick="zoomImg(\''+ url +'\')"';
				return str1;
			})
			return str;

		});
		
		//找到所有的表情[/emojix]标签，对内容进行修改
		content = content.replace(this.regEmoji, function(str) {
			// 提取url
			str.replace(/[0-9]+/gim, function(num) {
				// 生成图片路径
				str = '<img type="emoji" src="'+ window.EmotPath + 'emoji'+num +'.png">';
			})
			return str;
		});

		//找到所有type="muisc"的img标签，对内容进行修改
		content = content.replace(this.regAudioPath, function(str) {
			//根据type类型，判断内容
			var url = "";
			var name = "";
			str = str.replace(/src[=\"\'\s]+([^\"\']+)[\"\']/gim, function(str1) {
				// 添加全路径
				str1 = 'src="' + window.FileServerUrl + str1.split('"')[1].split('.')[0] + '.mp3"' + " controls ";
				return str1;
			})
			return str;
		});

		//找到所有type="video"的img标签，对内容进行修改,暂替换成<audio></audio>
		content = content.replace(this.regVideoPath, function(str) {
			//console.log(str)
			//根据type类型，判断内容
			var url = "";
			var name = "";
			// 提取url 更改src
			str = str.replace(/src[=\"\'\s]+([^\"\']+)[\"\']/gim, function(str1) {
				// 添加全路径, 格式都转换成 mp4

				str1 = 'src="' + window.FileServerUrl + str1.split('"')[1].split('.')[0] + '.mp4"'  + " controls preload='meta' ";
				return str1;
			})
			
			// 提取poster 更改
			str = str.replace(/poster\=\"[^"]+\"/gim, function(str1) {
				// 添加全路径, 格式都转换成 mp4

				str1 = 'poster="' + window.FileServerUrl + str1.split('"')[1] + '"';
				return str1;
			})
			return str;
		});

		//找到所有type="attachment"的img标签，对内容进行修改,暂替换成<audio></audio>
		content = content.replace(this.regAttachPath, function(str) {
			var url = "";
			var name = "";
			// 提取url
			str = str.replace(/href\=\"[^"]+\"/gim, function(str1) {
				// 添加全路径
				str1 = 'href="' + window.FileServerUrl + str1.split('"')[1] + '"';
				return str1;
			})
			return str;
		});
		// 返回数据
		return content;
	};
	
	
	/*将文件服务器 返回的图片json 拼接成 字符串*/
	imgJsonToHtml(imgArray) {
		let tpl = ''
		imgArray.forEach((item,i) =>{
			// 文件类型
            var fileType = '.' + item.save_file.split('.')[item.save_file.split('.').length-1]
            
            tpl = tpl + "<img src=\"" + window.FileServerUrl + item.uuid + fileType + "\" type=\"uploadImg\"  path='"+ item.save_path + '" name="' + item.save_file +"'/>"
		})
		
		return tpl
	}
	
	/*
	 * 判断 编辑器内容是否为空
	 * 有文字 图片 音频  视频 附件等的一种 就不是空
	 * */
	isContentEmpty(content) {
		// 图片 音频  视频 附件等
		if(this.regImg.test(content) || this.regAudioPath.test(content) || this.regVideoPath.test(content) || this.regAttachPath.test(content)) {
			return false
		}

		if($("<div>" + content + "</div>").text().length > 0) {
			return false
		}
		
		return true
	}
}

export default new EditorFile()