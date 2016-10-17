import Vue from 'vue';
import Vuex from 'vuex';

import showTopic from './modules/showTopic'
import topicNav from './modules/topicNav'
import userMes from './modules/userMes'
Vue.use(Vuex);

const state={
	//头部导航数据,common为true表示为普通导航目录，登录与否都存在；
	//logined为true表示登录成功时存在，未登录则不存在，为false时相反。
	navs:[{
		name:'首页',
		rname:'index',
		common:true,	
	},{
		name:'登录',
		rname:'login',
		logined:false,
	},{
		name:'个人',
		rname:'user',
		logined:true,
	},{
		name:'消息',
		rname:'uread',
		logined:true,
	},{
		name:'发布',
		rname:'issue',
		logined:true,
	},{
		name:'退出',
		rname:'exit',
		logined:true,
	},],
	title:'cnode'
};

export default new Vuex.Store({
	modules:{
		showTopic,
		topicNav,
		userMes
	},
	state
});
