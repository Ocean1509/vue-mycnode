export default (router)=>{
	router.map({
		'/':{
			name:'index',
			component:(resolve)=>{
				require(['./views/index.vue'],resolve)
			},
		},
		'/topic/:id': {
				name: 'topic',
				component: (resolve) => {
					require(['./views/topic.vue'], resolve)
				}
		},
		"/login":{
			name:'login',
			component:(resolve)=>{
				require(['./views/login.vue'],resolve)
			}
		},
		"/uread":{
			name:'uread',
			component: (resolve) => {
					require(['./views/message.vue'], resolve)
				}
		},
		"/exit":{
			name:'exit',
			component:(resolve)=>{
				require(['./views/exit.vue'],resolve)
			},
			auth:true
		}
	});
}
