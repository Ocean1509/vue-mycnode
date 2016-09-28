<template>
	<mload :load="load" v-if="load"></mload>
	<div v-if="!load">
		<ul class="mes" v-if="getUser.allMes.length>0">
			<div class="markRead">
				<span @click="allRead">标为已读</span>
			</div>
			<li v-for="umeg in getUser.allMes" v-link="{name:'topic',params:{id:umeg.topic.id}}">
				<div class="umeg">
					<img :src="umeg.author.avatar_url" alt="" v-link.prevent.stop="{}">
					<p class="basemes" >
						{{umeg.author.loginname}}
						<span class="time">{{umeg.create_at | getTime}}</span>
					</p>
					<p class="reply">
						<span v-if="umeg.type=='reply'" class="type">回复了您的话题</span>
						<span v-if="umeg.type=='at'" class="type">在回复中@了您</span>
						<span class="sign" v-if="!umeg.has_read"></span>
					</p>
				</div>
				<div class="markdown-body">{{{umeg.reply.content}}}</div>
				<div class="markdown-body topic-title">话题：{{{umeg.topic.title}}}</div>
			</li>
		</ul>
		<div v-if="getUser.allMes.length==0" class="noMes">没有信息</div>
	</div>
</template>
<script>
	import {getAllMeg,setHasRead} from '../vuex/action'
	export default{
		data(){
			return{
				load:true
			}
		},
		vuex:{
			getters:{
				getUser:({userMes})=>userMes.user,
			},
			actions:{
				getAllMeg,
				setHasRead
			}	
		},
		methods:{
			allRead(){
				this.setHasRead(this.getUser.accesstoken).then((data)=>{
					this.getAllMeg(this.getUser.accesstoken)
				})
			}
		},
		route:{
			data(transition){
				this.getAllMeg(this.getUser.accesstoken).then((data)=>{
					this.load=false
				});
			}
		},
		components:{
			mload:require('../components/loading.vue')
		}
	}
</script>
<style>
	@import '../assets/lib/github-markdown.css';
	.markRead{background-color: #f6f6f6;overflow: hidden;padding-right: 25px;height: 30px;}
	.markRead span{float:right;display: inline-block;width:85px;height: 20px;background:url('../assets/images/hasread.png') right no-repeat;vertical-align: middle;margin-top:5px;font-size: 0.8rem;line-height: 20px;color:#80BD01;}
	.mes{background-color: #fff;padding:0;}
	.mes li{list-style:none;overflow: hidden;padding:10px 20px;border-bottom:1px solid #eaeaea;}
	.mes li img{width:15%;border-radius:50%;float:left;margin-right:10px;}
	.mes li .umeg{overflow: hidden;margin-bottom:5px;}
	.mes li .umeg p{float:left;margin:0;width:80%;}
	.mes li .umeg p.basemes{color:#323232;font-size: 1.2rem;line-height: 1.3em}
	.mes li div.topic-title{background-color: #f7f7f7;color:#838383;padding:10px;font-size: 0.9rem;margin-top:8px;margin-bottom:8px;}
	.mes li p.basemes .time{color:#80BD01;float:right;font-size: 0.8rem}
	.mes li .reply .type{color:#767676;line-height: 3em;font-size: 0.8rem}
	.mes li .reply .sign{width:10px;height: 10px;background-color: #fc8025;border-radius: 5px;display: inline-block;float:right;margin-top:10px;}
	.noMes{background-color: #fff;height: 200px;line-height: 200px;text-align: center;color:#999;font-size: 1.5em;margin-top:10px;}
</style>