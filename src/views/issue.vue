<!--新建主题-->
<template>
	<div class="issue"  transition="enter">
		<div class="sort">
			<div class="title">发布到分类:</div>
			<div class="drop">
				<mdropdown :sorts="sorts" :tab.sync="tab" :show.sync="show"></mdropdown>
			</div>
		</div>
		<div class="title">
			<input type="text" placeholder="标题，字数10字以上" v-model="mtitle">
		</div>
		<textarea name="" id="editor" class="reply" placeholder="说点什么吧..." v-model="content"></textarea>
		<span class="new-topic" id="publish" @click="publish"></span>
	</div>
	<mdialog :configs="configs"></mdialog>
</template>
<script>
	import {newTopic} from '../vuex/action'
	export default {
		data(){
			return{
				sorts:['分享',"问答","招聘"],
				tab:'分享',
				show:false,
				content:'',
				mtitle:'',
				load:false,
				configs:{
					visiable:false,
					text:'',
					sure:'确定',
					cancel:'',
					callbackCancel:()=>true,
					callback:null
				},
			}
		},
		transition:{
			enter:{
				enterClass:'enters',
				leaveClass:'hide'
			}
		},
		vuex:{
			actions:{
				newTopic
			},
			getters:{
				getUser:({userMes})=>userMes.user,
			},
		},
		components:{
			mdropdown:require('../components/dropdown.vue'),
			mdialog:require('../components/dialog.vue')
		},
		route:{
			data(transition){
				window.addEventListener('click',this.click);

				transition.next()
			},
			deactivate(transition){
				window.removeEventListener('click',this.click);
				transition.next()
			},
			canReuse:false
		},
		ready(){
			var editor=document.getElementById('editor')
			var height=window.screen.height-editor.offsetTop;
			editor.style.height=height-60+"px";  //60为textarea的padding-top值
			console.log(editor.offsetTop)
			var publish=document.getElementById('publish');
			publish.style.top=editor.offsetTop+10+"px"
		},
		methods:{
			click(){
				this.show=false;
			},
			publish(){
				this.configs.visiable=true;
				if(this.mtitle.length<10){
					this.configs.text="标题字数必须在10个字以上";
					this.configs.cancel="";
					this.configs.callback=null;
				}else if(!this.content){
					this.configs.text="内容不能为空";
					this.configs.cancel="";
					this.configs.callback=null;
				}else if(this.mtitle.length>=10&&this.content){

					this.configs.text="确定发布话题？";
					this.configs.cancel="取消";
					this.configs.callback=()=>{
						let accesstoken=this.getUser.accesstoken;
						let type=this.filtertabs(this.tab);
						let title=this.mtitle;
						let content=this.content;
						this.newTopic(accesstoken,type,title,content).then(()=>{
							this.configs.visiable=true;
							this.configs.text='发布成功';
							this.configs.cancel=null;
							this.configs.callback=()=>{
								this.$router.go({name:'index'})
							}
						}).catch((error)=>{
							//后台请求错误处理
							this.configs.visiable=true;
							this.configs.text=error.data.error_msg;
							this.configs.cancel=null;
							this.configs.callback=()=>{
								this.$router.go({name:'index'})
							}
						})
					}
				}
			},
			filtertabs(tab){
				let tabs=''
				switch (tab){
					case '分享':
						tabs='share';
						break;
					case '问答':
						tabs='ask';
						break;
					case '招聘':
						tabs='job';
						break;
					default:
				}
				return tabs
			}

		}
	}
</script>
<style scoped>
	.sort{height:36px;background-color: #fff;padding:0 10px 0 30px;border-bottom:1px solid #eaeaea;}
	.sort>div{background-color: #fff;line-height: 36px;height: 36px;float:left;font-size: }
	.sort>div.title{width:40%;color:#80bd01;}
	.sort>div.drop{width:60%;}
	.issue .title input{width:90%;outline:none;border:0;padding:0;vertical-align: top;padding:10px 5%;font-size: 1.3rem;border-bottom:1px solid #eaeaea;}
	.issue .reply{width:90%;border:0;outline:none;resize: none;padding:40px 5% 20px;vertical-align: top;font-size: 1.2rem;background-color:#eee;}
	.issue .new-topic{position: absolute;top:0;right:10px;background:url('../assets/images/newtopic.png');width:32px;height: 32px;}
	.issue{width:100%;}
	.enter-transition{transition:all 0.6s ease;overflow:hidden;margin-left:0;}
	.enter-enter{margin-left: 500px;}
	.enter-leave{transition:all 0s ease; margin-left:500px;}
</style>