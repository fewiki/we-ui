class AccessControl {
	//老师权限控制
	teacherAccessControl(id){
		let sessionUserId = sessionStorage.getItem('userId')
		if(id!== +sessionUserId){
			return false
		}else{
			return true 
		}
	}
}
export default new AccessControl()