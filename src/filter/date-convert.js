// 转换
import Vue from 'vue'

// 时间转换
Vue.filter('showDate', function(value) {
	//时间格式化显示
	var formatTime = function(time, format) {
		//	console.log(time)
		let datetime = new Date(time);
		//	console.log(datetime+"aa")
		let year = datetime.getFullYear();
		let month = datetime.getMonth();
		let date = datetime.getDate();
		let hour = datetime.getHours();
		let minute = datetime.getMinutes();

		if(/yyyy/.test(format)) {
			format = format.replace(/yyyy/, year);
		}
		if(/MM/.test(format)) {
			if((month + 1) < 10) {
				format = format.replace(/MM/, '0' + (month + 1));
			} else {
				format = format.replace(/MM/, (month + 1));
			}
		}
		if(/dd/.test(format)) {
			if(date < 10) {
				format = format.replace(/dd/, '0' + date);
			} else {
				format = format.replace(/dd/, date);
			}
		}
		if(/HH/.test(format)) {
			if(hour < 10) {
				format = format.replace(/HH/, '0' + hour);
			} else {
				format = format.replace(/HH/, hour);
			}
		}
		if(/mm/.test(format)) {
			if(minute < 10) {
				format = format.replace(/mm/, '0' + minute);
			} else {
				format = format.replace(/mm/, minute);
			}
		}
		return format;
	}

	// 值更新时的工作
	// 也会以初始值为参数调用一次
	// 判断获取到的新值与原来的值是否一致，避免冗余加载
	if(!value) return
	//		console.log(value)
	let createDate = new Date(value)
	if(createDate == 'Invalid Date') return
	let currentDate = new Date()
	let createDateTimestamp = createDate.getTime()

	var nextDayDate = new Date(value); //更新时间第二天的日期
	nextDayDate.setDate(nextDayDate.getDate() + 1);
	var difftime1 = parseInt((new Date(Date.parse(formatTime(nextDayDate, "yyyy-MM-dd 00:00:00"))) - createDate) / 1000); //更新时间跟第二天零点的时间差，单位：秒
	var difftime2 = parseInt((currentDate.getTime() - createDateTimestamp) / 1000); //获得两个时间的时间差（秒），当前时间-最新更新时间
	if(difftime2 < difftime1) {
		createDate = "今天 " + formatTime(value, "HH:mm");
	} else if(difftime2 < (difftime1 + 3600 * 24)) {
		createDate = "昨天 " + formatTime(value, "HH:mm");
	} else if(difftime2 < (difftime1 + 3600 * 24 * 2)) {
		createDate = "前天" + formatTime(value, "HH:mm");
	} else if(createDate.getFullYear() == currentDate.getFullYear()) {
		createDate = formatTime(value, "MM月dd日 HH:mm");
	} else {
		createDate = formatTime(value, "yyyy年MM月dd日 HH:mm");
	}
	return createDate
})
