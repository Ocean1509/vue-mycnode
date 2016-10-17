<!--个人信息-->
<template>
	<!-- <div class="user">
	-->
	<div transition="enter" class="user">
		<span class="back" @click="goback">
			<img src="../assets/images/back.png" alt=""></span>
		<div class="favicon">
			<div class="avatar">
				<img v-lazy="getUserDetails.avatar_url">
				<div class="loader" v-if="load"></div>
			</div>
			<p class="loginname">{{getUserDetails.loginname}}</p>
			<p class="githubUsername">
				{{getUserDetails.githubUsername}}
				<span v-show="getUserDetails.githubUsername">@github.com</span>
			</p>
			<p class="addmes">
				<span class="regtime">注册时间: {{getUserDetails.create_at}}</span>
				<span class="score">积分:{{getUserDetails.score}}</span>
			</p>
		</div>
		<ul class="nav">
			<li v-for="nav in navs" @click="changePage($index+1)" :class="!$refs.swiper?'':$refs.swiper.currentPage==($index+1)?'choice':''">{{nav}}</li>
		</ul>
		<swiper class="page" v-ref:swiper
    		direction="horizontal" :performance-mode="false">
			<div v-for="navDetail in navsDetails">
				<ul>
					<li v-for="reply in navDetail">
						<img v-lazy="reply.author.avatar_url" alt="" v-link="{name:'user',params:{loginname:reply.author.loginname}}">
						<div>
							<p class="title">{{reply.title}}</p>
							<p class="name"><span>{{reply.author.loginname}}</span><span class="time">{{reply.last_reply_at|getTime}}</span></p>
						</div>
					</li>
				</ul>
			</div>
		</swiper>
	<mdialog :configs="configs"></mdialog>
		
	</div>

</template>
<script>
	import {getUserDetail} from '../vuex/action'
	//移动端触屏滑动
	import Swiper from 'vue-swiper'
	export default {
		data(){
			return{
				load:true,
				navs:['最近回复','最近发布','话题收藏'],
				navsDetails:[],
				configs:{
					visiable:false,
					text:'获取个人信息失败',
					sure:'确定',
					callback:()=>{
						window.history.go(-1)
					}
				},
			}
		},
		components:{
			Swiper,
			mdialog:require('../components/dialog.vue')
		},
		vuex:{
			getters:{
				getUserDetails:({userMes})=>userMes.userDetails,
				// getSrc:({userMes})=>userMes.userDetails.avatar_url
			},
			actions:{
				getUserDetail,
			}
		},
		methods:{
			goback(){
				window.history.go(-1)
			},
			changePage(index){
				this.$refs.swiper.setPage(index);
				
			},
   //      	onSlideChangeEnd (currentPage) {
   //          	console.log('onSlideChangeEnd', currentPage);
   //      	}
		},
		route:{
			data(transition){
				this.load=true;
				this.getUserDetail(transition.to.params.loginname).then((json)=>{
					this.load=false;
					this.navsDetails=[this.getUserDetails.recent_replies,this.getUserDetails.recent_topics,this.getUserDetails.collected]
				}).catch(()=>{
					this.configs.visiable=true
				});
				// this.getUserCollect(transition.to.params.loginname).then((json)=>{
				// 	// this.load=false;
				// 	console.log(json)
				// })
			}
		}
	}
</script>
<style scoped>
	ul{margin:0;padding:0;}
	li{list-style: none}
	.user{background-color: #fff;width:100%;}
	.enter-transition {transition: all 0.6s ease;position:absolute;overflow: hidden;top:0px;z-index:999;}
	.enter-enter{top:140px;}
	.enter-leave{transition:all 0s ease}
	.back img{width:16px;height: 16px;}
	.user .favicon{background-color: #5e5b56;text-align: center;height: 250px;}
	.user .favicon .avatar{width:120px;margin:0 auto;position:relative;}
	.user .favicon img{width:100px;height: 100px;border-radius:50px;margin-top:40px;}
	.user .back img{width:26px;height: auto;position: absolute;top:10px;left:10px;}
	.user .favicon p{margin:10px 0;font-weight: bold;}
	.user .favicon p.loginname{color:#fff;font-size: 1.1rem;}
	.user .favicon p.githubUsername{color:#d1cdca;text-decoration: underline;height: 18px}
	.user p.addmes{overflow: hidden;margin-top:15px;}
	.user p span.regtime{float:left;color:#fff;font-size: 0.9rem;font-weight: bold;margin-left:20px;}
	.user p span.score{float:right;color:#92b746;margin-right:20px;font-weight: bold;font-size: 0.9rem;}
	
	.loader {width:100px;height:100px;display:inline-block;padding:0px;border-radius:100%;border:3px solid;border-top-color:#41c500;border-bottom-color:rgba(0,0,0, 0.1);border-left-color:#41c500;border-right-color:rgba(0,0,0, 0.1);-webkit-animation: loader 1s ease-in-out infinite;animation: loader 1s ease-in-out infinite;position: absolute;top:37px;left:7px;}
	@keyframes loader {from {transform: rotate(0deg);}to {transform: rotate(360deg);}}
	@-webkit-keyframes loader {from {-webkit-transform: rotate(0deg);}to {-webkit-transform: rotate(360deg);}}
	.nav{margin:0;padding:0;overflow: hidden;background-color: #343434}
	.nav li{width:33.33%;float:left;text-align: center;color:#ebebeb;height: 36px;line-height: 36px;border-bottom:4px solid #343434;}
	.nav li.choice{color:#fff;border-bottom:4px solid #81bc00;}
	.page li{overflow: hidden;padding:10px 20px;border-bottom:2px solid #e3e3e3;}
	.page li img{width:15%;border-radius:50%;float:left;}
	.page li div{float:left;margin:0;width:80%;float:right;}
	.page li p.title{font-size: 1.2rem;margin:4px 0;text-overflow: ellipsis;white-space: nowrap;overflow:hidden;}
	.page li p.name{color:#6c6c6c;font-size: 1.1rem;margin:0;}
	.page li .time{float:right;font-size: 1.1rem}
</style>