export default (router) =>router.map({
	'/': {
		name: 'index',
		component: (resolve) => {
			require(['./views/index.vue'], resolve)
		},
	},
	//个人
	'/user/:loginname':{
		name:'user',
		component:(resolve)=>{
			require(['./views/user.vue'],resolve)
		}
	},
	//话题
	'/topic/:id': {
		name: 'topic',
		component: (resolve) => {
			require(['./views/topic.vue'], resolve)
		}
	},
	//登录
	"/login": {
		name: 'login',
		component: (resolve) => {
			require(['./views/login.vue'], resolve)
		}
	},
	//发布
	'issue':{
		name:'issue',
		component:(resolve)=>{
			require(['./views/issue.vue'],resolve)
		}
	},
	//消息
	"/uread": {
		name: 'uread',
		component: (resolve) => {
			require(['./views/message.vue'], resolve)
		}
	},
	//注销
	"/exit": {
		name: 'exit',
		component: (resolve) => {
			require(['./views/exit.vue'], resolve)
		},
		auth: true
	}
});