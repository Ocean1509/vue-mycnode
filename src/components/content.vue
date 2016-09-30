<!--主题详细内容-->
<template>
	<section>
		<header>
			<p class="title">{{getDetail.title}}</p>
			<div>
				<img :src="getDetail.author.avatar_url" alt="">
				<div class="intro">
					<div class='tab'>
						<span v-if="getDetail.top" class='key'>置顶</span>
						<span v-else v-if="getDetail.good" class="key">精华</span>
						<span v-if="!getDetail.top&&!getDetail.good">{{getDetail.tab |getTab}}</span>
					</div>
					<span>{{getDetail.author.loginname}}</span>
				</div>
				<div class='intro intro2'>
					<span class='time'>{{getDetail.create_at|getTime}}创建&#183;</span>	
					<span>{{getDetail.visit_count}}次浏览</span>
				</div>
				<i @click='changeCollect'>
					<img src="../assets/images/collect.png" alt="" class="collects" v-if="getDetail.is_collect">
					<img src="../assets/images/n-collect.png" alt="" class="collects" v-if="!getDetail.is_collect">
				</i>
			</div>
		</header>
		<div class="markdown-body">
			{{{getDetail.content}}}
      	</div>
	</section>
</template>
<script>
	import {collect,hasLogin} from '../vuex/action'
	export default{
		 data() {
		      return {
		        nCollect:false
		      };
    	},
		props:['diavis'],
		vuex:{
			getters:{
				getDetail:({showTopic})=>showTopic.data.content,
				getUser:({userMes})=>userMes.user,
			},
			actions:{
				collect,
				hasLogin
			}
		},
		methods:{
			changeCollect(){
				this.hasLogin(this.getUser.success).then(()=>{
					this.collect(this.getUser.accesstoken,this.getDetail.id,this.getDetail.is_collect)
				}).catch((error)=>{
					console.log(error)
					this.diavis=true
				})
				//this.nCollect=!this.nCollect

			}
		},
		// ready(){
		// 	this.getDetail
		// 	console.log(this.getDetail);
		// 	console.log(this.getTopic)
		// 	// this.imgUrl=this.detail.author
		// },
	}
</script>
<style scoped>
 @import '../assets/lib/github-markdown.css';
	section{background-color: #fff;margin:8px 0;padding:0 15px;}
	p{margin:0;}
	section header{overflow: hidden;padding-bottom:10px;}
	section header .title{font-size: 1.4rem;font-weight: bold;margin-top:20px;margin-bottom:12px;}
	section header{position: relative;}
	section header img{width:13%;float:left;margin-right:8px;border-radius:50%;}
	header>div{overflow: hidden;}
	header .tab{float:left;margin-right: 10px}
	header .tab span{background-color: #e5e5e5;color: #999;font-size:12px;padding: 2px 4px;}
	header .tab span.key{background-color: #80bd01;color:#fff;}
	header .intro{float:left;width:70%;color: #838383;font-size: 12px;line-height: 20px}
	header .intro2{line-height: 30px}
	img.collects{width:7%;position: absolute;right: 0;bottom:30px;}
	h1{font-size:30px;}
	.markdown-text p{font-size: 16px;line-height: 1.6;}
</style>