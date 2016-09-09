import Vue from 'vue';
import Vuex from 'vuex';

import showTopic from './modules/showTopic'
import topicNav from './modules/topicNav'
Vue.use(Vuex);

const state={
	//头部导航数据
	navs:[{
		name:'首页',
		rname:'index'
	},{
		name:'登录',
		rname:'login'
	}],
};

export default new Vuex.Store({
	modules:{
		showTopic,
		topicNav
	},
	state
});
