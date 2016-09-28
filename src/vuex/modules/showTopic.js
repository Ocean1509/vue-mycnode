import {GET_TOP_LIST,INIT_LIST,GET_TOP_LIST_FAILUER,GET_DETAIL_TOPICS,GET_MY_UPS,CHANGE_COLLECT} from "../mutation_type"

const state={
	data:{
		failure:false,
		all:[],
		loading:true,
		content:'',
		comment:'', //评论
		myups:[],
	},
	
	
}
const mutations={
	[GET_TOP_LIST](state,data){
		//获取不到文章数据时，隐藏加载组件
		if(data.length<=0){
			state.data.loading=false;
		}else{
			state.data.loading=true;
			state.data.failure=false;
			state.data.all=state.data.all.concat(data)
		}
		
	},
	//重用组件时，初始化参数。
	[INIT_LIST](state){
		state.data.loading=true;
		state.data.failure=false;
		state.data.all=[];
	},
	//后台原因获取文章失败时。
	[GET_TOP_LIST_FAILUER](state){
		state.data.failure=true;
	},
	//获取详细文章信息
	[GET_DETAIL_TOPICS](state,data){
		state.data.comment=data.replies;
		const userId=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).id:"";
		state.data.myups=[];
		//通过判断是否有用户点赞的id，为每一个comment对象增加myups的属性,方便页面渲染显示点赞状态。
			for(let [key,value] of state.data.comment.entries()){
				state.data.myups.push(false)
				for(let el of value.ups){
					if(el==userId){
						state.data.myups.splice(key,1,true)
						break;
					}
				}
			}
		state.data.content=data;
		state.data.loading=false;
	},
	//改变点赞状态
	[GET_MY_UPS](state,index){
		state.data.myups.splice(index,1,!state.data.myups[index]);
		const userId=JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')).id:"";
		let arry=state.data.comment[index].ups;
		let flag=-1;
		for(let [key,val] of arry.entries()){
			if(val==userId){
				flag=key;
				break
			}
		}
		if(flag>-1){
			arry.splice(flag,1);
		}else{
			arry.push(userId);
		}
	},
	//改变收藏状态
	[CHANGE_COLLECT](state){
		state.data.content.is_collect=!state.data.content.is_collect;
		console.log(state.data.content.is_collect)
	}
}
export default {
	state,mutations
}
