<template>
	<mload :load="load" v-if="load"></mload>
	<div v-if="!load">
		<!-- <div v-if="!getDetail.loading"> -->
			<mcontent :diavis.sync="diavis"></mcontent>
			<mcomment :diavis.sync="diavis" :replys.sync="replys" :floors.sync="floors"></mcomment>
		<!-- </div> -->
			<div class="reply" v-if="show" transition="enter"><img src="../assets/images/bigreply.png" alt="" @click="reply"></div>
			<mreply :replys.sync="replys" v-show="replys" :floors.sync="floors"></mreply>
	</div>

	<mdialog :configs="configs"></mdialog>
</template>
<script>
import {getDetailTopic,initTopic,hasLogin} from '../vuex/action'
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
				load:true,
				_otop:'',    //原始滚动条高度
				_ltop:'',    //滚动条滚动高度
				show:true,
				replys:false,
				floors:''
			}
		},
		vuex:{
			actions:{
				getDetailTopic,
				hasLogin
			},
			getters:{
				getDetail:({showTopic})=>showTopic.data,
				// getUserLogin:({userMes})=>userMes.hasNoLogin,
				getUser:({userMes})=>userMes.user,
			}
		},
		watch:{
			diavis(){
				this.configs.visiable=this.diavis
			},
		},
		methods:{
			scroll(){
				this.otop=this.otop?this.otop:0;
				this.ltop=document.body.scrollTop;				
				if(this.ltop>this.otop){
					this.show=false;
				}else{
					this.show=true
				}
				this.otop=this.ltop;
			},
			reply(){
				this.hasLogin(this.getUser.accesstoken).then(()=>{
					this.floors='';
					this.replys=true
				}).catch(()=>{
					this.diavis=true;
				})
			}

		},
		route:{
			data(transition){
				this.getDetailTopic(transition.to.path,this.getUser.accesstoken)
				.then(()=>{
					this.load=false
				});
				window.addEventListener('scroll',this.scroll);
				transition.next()
			},
		},
		components:{
			mcontent:require('../components/content.vue'),
			mcomment:require('../components/comment.vue'),
			mdialog:require('../components/dialog.vue'),
			mload:require('../components/loading.vue'),
			mreply:require('../components/reply.vue'),
		}
	}
</script>
<style scoped>
	.reply{position: fixed;bottom:0;right: 10px;}
	.reply img{width:50px;height: 50px}
	.enter-transition {transition: all 0.6s ease;height: 74px;overflow: hidden;}
	.enter-enter, .enter-leave {height: 0;}
</style>