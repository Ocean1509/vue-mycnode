<!--主题评论内容-->
<template>
	<article v-if="getComment.length>0">
		<header>{{getComment.length}}条回复</header>
		<ul>
			<li v-for="comment in getComment">
				<div>
					<img v-lazy="comment.author.avatar_url" alt="" class="photo" v-link="{name:'user',params:{loginname:comment.author.loginname}}">
					<div class="user">
						<p class='name'>{{comment.author.loginname}}</p>
						<p><span class="floor">{{$index+1}}楼</span>&#183;<span>{{comment.create_at|getTime}}</span></p>
					</div>
					<div class="handle">
						<span class="good" @click.prevent.stop="up(comment,$index)" v-if="!getMyUps[$index]"></span>
						<span class="hasgood" @click.prevent.stop="up(comment,$index)" v-if="getMyUps[$index]"></span>
						<span class="ups">{{comment.ups.length}}</span>
						<span class="reply" @click.prevent.stop="reply($index+1)"><img src="../assets/images/reply.png" alt=""></span>
					</div>
				</div>
				<div class="markdown-body">{{{comment.content}}}</div>
			</li>
		</ul>
	</article>
	<div class='non-comment' v-if="getComment.length==0">暂无回复</div>

</template>
<script>
	import {like,hasLogin,changeUps} from '../vuex/action'
	export default{
		props:['diavis','replys','floors'],
		vuex:{
			getters:{
				getComment:({showTopic})=>showTopic.data.comment,
				getUser:({userMes})=>userMes.user,
				getMyUps:({showTopic})=>showTopic.data.myups,
			},
			actions:{
				like,
				hasLogin,
				changeUps
			}
		},
		methods:{
			up(comment,index){
				this.hasLogin(this.getUser.success).then(()=>{
					this.like(comment.id,this.getUser.accesstoken)
				}).then((res)=>{
					this.changeUps(index);
				}).catch(()=>{
					this.diavis=true
				})
			},
			reply(index){
				this.hasLogin(this.getUser.success).then(()=>{
					this.floors=index;
					console.log(this.floors)

					this.replys=true;
				}).catch(()=>{
					this.diavis=true
				})
			}
		},
		
	}
</script>
<style scoped>
 @import '../assets/lib/github-markdown.css';

	li{list-style:none;}
	article header{font-size: .9em;background-color: #f6f6f6;padding: 10px;border-radius: 3px 3px 0 0;}
	article{background-color: #fff;margin:18px 0 10px;}
	article ul{padding:0;margin:0;}
	article ul li{overflow: hidden;padding:10px 10px;border:1px solid #f0f0f0;;}
	article ul li div{overflow: hidden}
	article ul li img.photo{float:left;width:46px;height: 46px;border-radius: 23px;margin-right: 10px}
	article ul li .user{float:left;}
	article ul li .user .name{font-size: 18px}
	article ul li .user p{margin:0;line-height: 24px;font-size: 14px}
	article ul li .user p span{color:#ccc;}
	article ul li .user .floor{color:#80bd01}
	article ul li .handle{float:right;}
	article ul li .handle img{vertical-align: middle}
	article ul li .good{display: inline-block;vertical-align: middle;width:20px;height: 20px;background: url('../assets/images/good.png')}
	article ul li .reply img{width:20px;}
	article ul li .hasgood{display: inline-block;vertical-align: middle;width:20px;height: 20px;background: url('../assets/images/hasgood.png')}
	article ul li .ups{font-size: 1.1rem;display: inline-block;vertical-align: middle;margin-left:-3px;}
	.content{width:100%;}
	.markdown-body{margin-left:58px;margin-top:4px;}
	.non-comment{height: 100px;background-color: #fff;text-align: center;line-height: 100px;font-size: 1.5em;color: #838383;}
</style>