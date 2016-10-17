<template>
		<section>
			<nav>
				<ul>
					<li v-for='tab in tabs' :class="tab.currentType==true?'active':''" v-link="{name:'index',query:{type:tab.ename,page:1}}">{{tab.name}}</li>
				</ul>
			</nav>
			<div v-if='!getTopics.failure'>
				<mlist :list='getTopics.all'></mlist>
				<mload :load="getTopics.loading"></mload>
			</div>
			<div v-else class="fail">获取文章失败</div>	
			<div class="publish" v-if="show" transition="enter"><img src="../assets/images/bigpublish.png" alt="" @click="publish"></div>
		</section>
		<mdialog :configs='configs'></mdialog>
</template>
<script>
	import {getTopic,initTopic} from '../vuex/action'
	export default {
		data(){
			return {
				type:'',
				page:'',
				fixed:false,
				show:true,
				configs:{
					visiable:false,
					text:'该操作需要登录账户。是否现在登录？',
					sure:'登录',
					cancel:true,
					callbackCancel:()=>true,
					callback:()=>{
						this.$router.go({name:'login'})
					}
				},
			}
		},
		vuex:{
			actions:{
				getTopic,
				initTopic
			},
			getters:{
				//拿到首页内容数据
				getTopics:({showTopic})=>showTopic.data, 
				//获取首页导航
				tabs:({topicNav})=>topicNav.tabs,
				//获取个人登录信息
				getUser:({userMes})=>userMes.user
			}
		},
		ready(){
			console.log('ready')
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
				window.addEventListener('scroll',this.scroll);
				transition.next()
			},
			deactivate(transition){
				window.removeEventListener('scroll',this.scroll);
				transition.next()
			},
			canReuse:false
		},

		methods:{
			scroll(e){
				//滑动发布图标的变化
				this.otop=this.otop?this.otop:0;
				this.ltop=document.body.scrollTop;				
				if(this.ltop>this.otop){
					this.show=false;
				}else{
					this.show=true
				}
				this.otop=this.ltop;

				//滑动加载
				if(document.body.scrollHeight-document.body.scrollTop-window.screen.height<=0){
					this.page++;
					console.log(this.type)
					this.getTopic(this.type,this.page)
				}
			},
			publish(){
				if(!this.getUser.success){
					this.configs.visiable=true
				}else{
					this.$router.go({name:'issue'})
				}
			}
		},
		components:{
			mlist:require('../components/list.vue'),
			mload:require('../components/loading.vue'),
			mdialog:require('../components/dialog.vue')
		}
	}
</script>
<style scoped>
	section{background-color: #fff;margin:0 3px;}
	section nav{background-color: #f6f6f6;}
	section nav ul{overflow: hidden}
	section nav ul li{list-style:none;float: left;color:#80bd01;padding:5px 6px;margin:6px 2px;}
	section nav ul li.active{background-color: #80bd01;color:#fff;}
	.fail{color: #468847;background-color: #DFF0D8;margin-top:-15px;height: 50px;text-align: center;line-height: 50px;font-size: 16px;}
	.publish{position: fixed;bottom:0;right: 10px;}
	.publish img{width:50px;height: 50px}
	.enter-transition {transition: all 0.6s ease;height: 74px;overflow: hidden;}
	.enter-enter, .enter-leave {height: 0;}
</style>