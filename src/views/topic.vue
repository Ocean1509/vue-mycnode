<template>
	<mload :load="load" v-if="load"></mload>
	<div v-if="!load">
		<!-- <div v-if="!getDetail.loading"> -->
			<mcontent :diavis.sync="diavis"></mcontent>
			<mcomment :diavis.sync="diavis"></mcomment>
		<!-- </div> -->
	</div>

	<mdialog :configs="configs"></mdialog>
</template>
<script>
import {getDetailTopic,initTopic} from '../vuex/action'
	export default {
		data(){
			return{
				author:'',
				diavis:false,
				configs:{
					visiable:false,
					text:'该操作需要登录账户。是否现在登录？',
					sure:'登录',
					cancel:true,
					callbackCancel:()=>{
						this.diavis=false;
					},
					callback:()=>{
						this.$router.go({name:'login'})
					}
				},
				// collection:false,
				load:true
			}
		},
		watch:{
			// getUserLogin:"changeVisiable",
			diavis:function(){
				this.configs.visiable=this.diavis
			},

		},
		methods:{
			// changeVisiable(){
				// this.configs.visiable=this.getUser
			// }
		},
		vuex:{
			actions:{
				getDetailTopic,
			},
			getters:{
				getDetail:({showTopic})=>showTopic.data,
				// getUserLogin:({userMes})=>userMes.hasNoLogin,
				getUser:({userMes})=>userMes.user,
			}
		},
		route:{
			data(transition){
				// console.log(transition.to.path)
				this.getDetailTopic(transition.to.path,this.getUser.accesstoken)
				.then(()=>{
					this.load=false
				});
				transition.next()
			},
		},
		components:{
			mcontent:require('../components/content.vue'),
			mcomment:require('../components/comment.vue'),
			mdialog:require('../components/dialog.vue'),
			mload:require('../components/loading.vue')


		}
		// ready(){
		// 	this.author=this.getDetail.author;
		// }
	}
</script>
<style scoped></style>