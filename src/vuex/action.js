import * as type from './mutation_type'
import Vue from 'vue'

/***get请求***/
/***api请求地址***/
/***https://cnodejs.org/api/v1***/


const _get = ({url,query}) => {
	let _url;
	if (query) {
		_url = `https://cnodejs.org/api/v1${url}?${query}`
	} else {
		_url = `https://cnodejs.org/api/v1${url}`
	}
	return Vue.http.get(_url)
		.then((res) => {
			if (res.status >= 200 && res.status < 300) {
				return res.json();
			}
			return Promise.reject(new Error(res.status));

		})
}

//获取文章列表
export const getTopic = ({dispatch}, tab, page, limit) => {
	// const url=`/topics/${tab}`;
	const url = '/topics';
	// const query = `tab=${tab}&page=${page}`;
	// const query = `tab=${tab}&page=${page}&limit=${limit}`;
	const query=`tab=${tab}&page=1`
	console.log(query)
	_get({url,query}).then((json) => {
		console.log(json)
		if(json.success){
			console.log(json.data)
			dispatch(type.GET_TOP_LIST, json.data);
			dispatch(type.CHANGE_NAV,tab)
		}
	}).catch((error)=>{
		dispatch(type.GET_TOP_LIST_FAILUER,tab)
	})
}


/****初始化首页列表内容*****/
export const initTopic=({dispatch})=>{ dispatch(type.INIT_LIST) }