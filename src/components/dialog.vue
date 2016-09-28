<!--弹出框-->
<template>
	<div v-if="configs.visiable">
		<div class="dialog-banner"></div>
		<div class="dialog">
			 <p>{{configs.text}}</p>
		<div class="btn">
			
			<a @click="sure">{{configs.sure}}</a>
			<a @click="cancel" v-if="configs.cancel" class="cancel">取消</a>
		</div>
	</div>
</div>

</template>
<script>
	export default {
		props:{
			configs:{
				type:Object,
				default:{
					visiable:false,
					text:'',
					cancel:'',
					sure:'确定',
					callback:null,
					callbackCancel:null,
				},
			}
		},
		methods:{
			cancel(){
				if(this.configs.callbackCancel){
					this.configs.callbackCancel()
				}else{
					window.history.go(-1)
				}
				this.close();
			},
			sure(){
				if(this.configs.callback)this.configs.callback()
				this.close()
			},
			close(){
				this.configs.visiable=false
			}
		}
	}
</script>
<style scoped>
	.dialog-banner{background-color: #000;opacity: 0.5;width:100%;height: 100%;position: fixed;top:0;left:0;z-index:4;}
	.dialog{width:80%;background-color: #fff;z-index:8;position: fixed;top:200px;left:10%;border-radius:5px;}
	.dialog p{margin:15px;line-height: 1.5em;color:#323232;font-size: 0.9rem}
	.dialog .btn{color:#80bd01;font-size: 1rem;margin-right: 20px;margin-bottom:16px;overflow: hidden;}
	.dialog .btn a{float:right;}
	.dialog .btn a.cancel{float:left;margin-left:15px;}
</style>
