<!--文本编辑-->
<template>
	<div>
		<div class="reply-banner"></div>
		<div class="replys" v-show="replys" transition="enter">
			<div class="reply-tools"><span class="reply-logo-fl" @click="close"><img src="../assets/images/close.png" alt=""></span>添加回复<span class="reply-logo-fr" @click="reply"><img src="../assets/images/release.png" alt=""></span></div>
			<div class="tips" v-if="floors>0">回复: {{floors}}楼</div>
			
			<textarea name="" id="editor" class="reply" placeholder="说点什么吧...">{{content}}</textarea>
		</div>
	</div>
</template>
<script>
	import {newReply} from '../vuex/action'
	export default{
		props:['replys',"floors"],
		vuex:{
			actions:{
				newReply,
			},
			getters:{
				getTopicId:({showTopic})=>showTopic.data.content.id,
				getUser:({userMes})=>userMes.user,
				getComment:({showTopic})=>showTopic.data.comment,
			}
		},
		data(){
			return{
				content:''
			}
		},
		watch:{
			floors:function(){
				this.content=this.floors?'@'+this.getComment[this.floors-1].author.loginname+" ":'';
			},
			// replys:function(){
			// 	if(this.replys){
			// 		document.getElementById('editor').focus();
			// 	}
			// }
		},
		// ready(){
		// 	console.log('-------------')
		// 	document.getElementById('editor').focus();
		// },
		methods:{
			close(){
				this.replys=false
			},
			reply(){
				let val=document.getElementById('editor').value;
				if(val){
					this.newReply(this.getUser.accesstoken,this.getTopicId,val);
					this.close()
				}
			}
		},
	}
</script>
<style scoped>
	.reply-banner{background-color: #000;opacity: 0.5;width:100%;height: 100%;position: fixed;top:0;left:0;z-index:9;}
	.replys{position: fixed;bottom:0;left:0;z-index:10;overflow: hidden;width:100%;height: 400px;background-color: #fff}
	.reply{width:100%;background-color: #eee;resize: none;border:0;outline:none;font-size: 1.4rem;padding:10% 20px;height: 80%}
	.reply-tools{height: 36px;background-color: #e1e1e1;line-height: 36px;color:#333;overflow: hidden;padding:0 10px;text-align: center}
	.reply-logo-fr{float:right;vertical-align: middle;}
	.reply-logo-fl{float:left;vertical-align: middle}
	.enter-transition {transition: all 0.8s ease;overflow: hidden;}
	.enter-enter, .enter-leave{height: 0}
	.replys .tips{background-color: #80bd01;height: 30px;line-height: 30px;color:#fff;padding:0 15px;font-size: 1rem}
</style>