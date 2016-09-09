<template>
	<section>
		<nav>
			<ul>
				<li v-for='tab in tabs' :class="tab.currentType==true?'active':''" v-link="{name:'index',query:{type:tab.ename,page:1}}">{{tab.name}}</li>
			</ul>
		</nav>
		<mlist :list='getTopics'></mlist>
	</section>
	<mload></mload>
</template>
<script>
	import {getTopic,initTopic} from '../vuex/action'
	export default {
		data(){
			return {
				type:'',
				page:''
			}
		},
		vuex:{
			actions:{
				getTopic,
				initTopic
			},
			getters:{
				//拿到首页内容数据
				getTopics:({showTopic})=>showTopic.all, 
				//获取首页导航
				tabs:({topicNav})=>topicNav.tabs,
			}
		},
		route:{
			data(transition){
				if(transition.to.path=='/'){
					this.type='all';
					this.page=1;					
				}else{
					this.type=transition.to.query.type;
					this.page=transition.to.query.page
				};
				this.initTopic();
				this.getTopic(this.type,this.page);
				window.addEventListener('scroll',this.scroll)
				transition.next()
			},
			deactivate(transition){
				window.removeEventListener('scroll',this.scroll)
			}	
		},
		methods:{
			scroll(e){
				if(document.body.scrollHeight-document.body.scrollTop-window.screen.height<=0){
					this.page++;
					console.log(this.type)
					this.getTopic(this.type,this.page)
				}
			}
		},
		components:{
			mlist:require('../components/list.vue'),
			mload:require('../components/loading.vue')
		}
	}
</script>
<style scoped>
	section{background-color: #fff;margin:0 3px;}
	section nav{background-color: #f6f6f6;}
	section nav ul{overflow: hidden}
	section nav ul li{list-style:none;float: left;color:#80bd01;padding:5px 6px;margin:6px 2px;}
	section nav ul li.active{background-color: #80bd01;color:#fff;}
</style>