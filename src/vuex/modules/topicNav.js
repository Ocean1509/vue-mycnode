//首页导航状态管理
import {CHANGE_NAV} from '../mutation_type' 
const state = {
	tabs: [{
		name: '全部',
		ename: 'all',
		currentType: false
	}, {
		name: '精华',
		ename: 'good',
		currentType: false
	}, {
		name: '分享',
		ename: 'share',
		currentType: false
	}, {
		name: '问答',
		ename: 'ask',
		currentType: false
	}, {
		name: '招聘',
		ename: 'job',
		currentType: false
	}]
}

const mutations={
	[CHANGE_NAV](state,type){
		for(let tab of state.tabs){
			if(tab.ename==type){
				tab.currentType=true
			}else{
				tab.currentType=false;
			}
		}
	}
}
export default {
	state,mutations
}