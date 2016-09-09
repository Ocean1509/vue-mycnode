export default (router)=>router.map({
	'/':{
		name:'index',
		component:(resolve)=>{
			require(['./views/index.vue'],resolve)
		}
	},
	'/topic/:id':{
		name:'topic',
		component:(resolve)=>{
			require(['./views/index.vue'],resolve)
		}
	}
})