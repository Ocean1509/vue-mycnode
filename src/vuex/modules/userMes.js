//个人用户信息

import {LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT_SUCCESS,GET_MEGNUM,GET_ALLMEG} from "../mutation_type"

const state={
	user:{
		success:false,
		errormsg:'',
		loginname:'',
		id:'',
		avatar_url:'',
		accesstoken:'',
		unMes:0,
		allMes:{}
	},
}
const mutations={
	//登录失败
	[LOGIN_FAILURE](state,data){
		state.user.errormsg=data.error_msg;
		state.user.success=data.success;
		console.log(state)
	},
	//登录成功
	[LOGIN_SUCCESS](state,data){
		state.user.success=data.success;
		state.user.loginname=data.loginname;
		state.user.id=data.id;
		state.user.avatar_url=data.avatar_url;
		state.user.accesstoken=data.accesstoken
	},
	//注销成功,删除个人数据
	[LOGOUT_SUCCESS](state,data){
		state.user={
			success:false,
			errormsg:'',
			loginname:'',
			id:'',
			avatar_url:'',
			accesstoken:'',
			unMes:0,
			allMes:{}
		}
	},
	//获取未读消息条数
	[GET_MEGNUM](state,data){
		state.user.unMes=data.data
	},
	//获取所有未读已读消息
	[GET_ALLMEG](state,data){
		state.user.allMes=Object.assign(data.has_read_messages,data.hasnot_read_messages);
	},
}

export default{
	state,mutations
}