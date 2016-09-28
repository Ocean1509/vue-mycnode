<template>
	<div class="login">
		<header>登录</header>
		<div class="loginMsg">
			<input type="text" placeholder="Access Token:" v-model="uuid" @keyup="changekey">
			<p class="error" v-show="errortips">{{errortips}}</p>		
			<a @click="login" class="loginbtn">登录</a>
			<div class="tip">
       			 <a @click="dialog">如何获取Access_Token?</a>
      		</div>
		</div>
	</div>
	<mdialog :configs="configs"></mdialog>
</template>
<script>
import {validateLogin,getUnMeg} from '../vuex/action'
export default{
	data(){
		return{
			configs:{
				visiable:false,
				text:'在 Cnode社区网站端登陆你的账户，然后在右上角找到【设置】按钮，点击进入后将页面滑动到最底部来查看你的Access Token。',
				sure:'确定',
			},
			errortips:'',
			uuid:'',
			// loginMsg:loginfailure
		} 
	},
	vuex:{
		actions:{
			validateLogin,
			getUnMeg,

		},
		getters:{
			loginfailure:({userMes})=>userMes.user
		}
	},
	methods:{
		//弹出提示框
		dialog(){
			this.configs.visiable=true
		},
		//登录
		login(){
			let reg=/^[0-9a-z]{8}(-([0-9a-z]){4}){3}-([0-9a-z]){12}$/g;
			let that=this;
			if(reg.test(this.uuid)){
				this.validateLogin({accesstoken:this.uuid})
					.then((data)=>{
						window.history.go(-1);
					}).then(()=>{
						this.getUnMeg()
					}).catch((error)=>{
						this.errortips=this.loginfailure.errormsg;
					})			
			}else{
				this.errortips="AccessToken格式错误，应为UUID";
			}
		},
		changekey(val){
			if(val){
				this.errortips=''
			}
		}
	},
	components:{
		mdialog:require('../components/dialog.vue')
	}
}
</script>
<style>
	.login{margin:20px;background-color: #fff;overflow: hidden;}
	.login header{background-color: #f6f6f6;color:#999;line-height: 2em;padding-left:20px;font-size: 1.2rem}
	.loginMsg{padding:20px 20px;}
	.login input{width:100%;font-size: 0.9rem;padding: 0.133333333333333rem 0;border: none;outline: none;border-bottom: 2px solid #80bd01;}
	.login a.loginbtn{display: inline-block;text-align: center;font-size: 1em;color: #fff;background-color: #80bd01;padding:0 20px;line-height: 30px;box-shadow: 1px 1px 10px #b2b2b2;text-decoration: none;border-radius:0.2em;margin-top:20px;}
	.login .tip{margin-top:26px;text-align: center;}
	.login .tip a{text-decoration: underline;color:#80bd01;font-size: 0.8rem}
	.login .error{margin:0;color:red;font-size: 0.8rem;margin-top:3px;}
</style>