import * as type from './mutation_type'
import Vue from 'vue'
import {setErrorMeg} from '../error-handing'
/**
 * get请求
 * api请求地址
 * https://cnodejs.org/api/v1
 */
const _get = (url,query) => {
	let _url;
	if (query) {
		_url = `https://cnodejs.org/api/v1${url}?${query}`
	} else {
		_url = `https://cnodejs.org/api/v1${url}`
	}
	console.log('-------------')
	console.log(_url)
	return Vue.http.get(_url)
		.then((res) => {
			if (res.status >= 200 && res.status < 300) {
				return res.json();
			}
			return Promise.reject(new Error(res.status));

		})
}

/**
 * post请求
 * api请求地址
 * https://cnodejs.org/api/v1
 */
const _post=(url,data)=>{
	let _url=`https://cnodejs.org/api/v1${url}`;
	return Vue.http.post(_url,data)
		.then((res)=>{
			if(res.status>=200&&res.status<300){
				return res.json()
			}

			return Promise.reject(new Error(res.status))
		})
	}


//获取文章列表
export const getTopic = ({dispatch}, tab, page) => {
	// const url=`/topics/${tab}`;
	const url = '/topics';
	// const query = `tab=${tab}&page=${page}`;
	const query = `tab=${tab}&page=${page}`;
	// const query=`tab=${tab}&page=14`
	_get(url,query).then((json) => {
		if(json.success){
			dispatch(type.GET_TOP_LIST, json.data);
			dispatch(type.CHANGE_NAV,tab)
		}
	}).catch((error)=>{
		dispatch(type.GET_TOP_LIST_FAILUER,tab)
	})
}

//获取详细话题信息
export const getDetailTopic = ({dispatch},path,token) => {
	// const url=`/topics/${tab}`;
	const url = path;
	const query=`accesstoken=${token}`
	return _get(url,query).then((json) => {
		if(json.success){
			dispatch(type.GET_DETAIL_TOPICS, json.data);
		}
	}).catch((error)=>{
		dispatch(type.GET_TOP_LIST_FAILUER)
	})
}

/****初始化首页列表内容*****/
export const initTopic=({dispatch})=>{ 
	dispatch(type.INIT_LIST) 
}

/***验证登录信息***/
export const validateLogin=({dispatch},token)=>{
	let url='/accesstoken';
		return _post(url,token).then((json) => {
			/***登录成功保存user数据到localStorage，改变state用户信息状态***/
			Object.assign(json,token);
			localStorage.setItem('user',JSON.stringify(json))
			dispatch(type.LOGIN_SUCCESS,json);
			return json
	}).catch((error)=>{
		dispatch(type.LOGIN_FAILURE,error.data);
		return Promise.reject(error);
	})
}


/***注销用户信息***/
export const logout=({dispatch})=>{
	dispatch(type.LOGOUT_SUCCESS)
}


/***刷新页面时获取重置登录信息***/
export const getLoginMes=({dispatch})=>{
	let user=localStorage.user!=null?JSON.parse(localStorage.user):'';
	if(user&&user.success){
		dispatch(type.LOGIN_SUCCESS,user)
	}else{
		dispatch(type.LOGOUT_SUCCESS);
	}
}


/***获取未读消息个数***/
export const getUnMeg=({dispatch})=>{
	let token=JSON.parse(localStorage.getItem('user')).accesstoken;
	let url='/message/count';
	let query=`accesstoken=${token}`;
	return _get(url,query).then((json)=>{
		dispatch(type.GET_MEGNUM,json)
	}).catch((error)=>{
		console.log(setErrorMeg(error))
	})
}

/***获取所有未读已读消息***/
export const getAllMeg=({dispatch},data)=>{
	let url='/messages';
	let query=`accesstoken=${data}`;
	return _get(url,query).then((json)=>{
		if(json.success){
			dispatch(type.GET_ALLMEG,json.data)
		}
	}).catch((error)=>{
		console.log(setErrorMeg(error))
	})
}


/***将所有未读消息标记为已读***/
export const setHasRead=({dispatch},token)=>{
	let url='/message/mark_all';
	let data={
		accesstoken:token
	}
	return _post(url,data).then((json)=>{
		dispatch(type.GET_MEGNUM,{data:0})
	}).catch((error)=>{
		console.log(setErrorMeg(error))
	})
}

/***为评论点赞***/
export const like=({dispatch},reply_id,token)=>{
	let url=`/reply/${reply_id}/ups`;
	let data={
		accesstoken:token
	}
	return _post(url,data)

}
/***点赞评论,收藏话题等操作需判断登录状态***/
export const hasLogin=({dispatch},data)=>{
	if(data){
		return Promise.resolve()
	}else{
		return Promise.reject('hasNotLogin')
	}
}
/***改变点赞图形状态***/
export const changeUps=({dispatch},index)=>{
	dispatch(type.GET_MY_UPS,index)
}

/***添加或取消收藏***/
export const collect=({dispatch},token,topicId,collected)=>{
	let url=`/topic_collect/${collected?'de_collect':'collect'}`;
	let data={
		accesstoken:token,
		topic_id:topicId
	}
	return _post(url,data).then((json)=>{
		if(json.success){
			dispatch(type.CHANGE_COLLECT);
			return
		}
		return Promise.reject("操作失败")
	}).catch((error)=>{
		console.log(error)
	})
}

/***新建评论***/
export const newReply=({dispatch},token,topicId,content)=>{
	let url=`/topic/${topicId}/replies`;
	let data={
		accesstoken:token,
		content:content
	}
	return _post(url,data).then((json)=>{
		console.log(json)
	})
}

/***发布新话题***/
export const newTopic=({dispatch},token,type,title,content)=>{
	let url=`/topics`;
	let data={
		accesstoken:token,
		title:title,
		tab:type,
		content:content
	}
	return _post(url,data).then((json)=>{
		console.log(json)
	})

}

/***获取个人信息详情，包括个人收藏主题***/
export const getUserDetail=({dispatch},loginname)=>{
	let urld=`/user/${loginname}`;
	let urlc=`/topic_collect/${loginname}`;
	let data={};
	//获取个人信息详情
	let getDetail=_get(urld).then((json)=>{
			data.detail=json.data;
		})
	//获取用户收藏主题
	let getCollect=_get(urlc).then((json)=>{
			data.collect=json.data;
		})
	return Promise.all([getDetail,getCollect]).then(()=>{
		dispatch(type.GET_DETAILMES,data)
	})
		// return _get({url}).then((json)=>{
		// 	console.log(json)
		// 	dispatch(type.GET_DETAILMES,json.data)
		// })
}
