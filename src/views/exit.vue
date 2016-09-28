<!--注销登录-->
<template>
	<mdialog :configs="configs">ddd</mdialog>
</template>
<script>
import {logout} from "../vuex/action"
	export default{
		vuex:{
			actions:{
				logout
			}
		},
		data(){
			return{
				configs:{
					visiable:true,
					text:'确定要注销吗？',
					cancel:'true',
					sure:'确定',
					callback:this.userlogout,
				}
			} 
		},
		methods:{
			userlogout(){
				localStorage.removeItem('user');
				this.logout()
				window.history.go(-1)
			}
		},
		components:{
			mdialog:require('../components/dialog.vue')
		}
	}
</script>


