import {GET_TOP_LIST,INIT_LIST} from "../mutation_type"

const state={
	all:[]
}
const mutations={
	[GET_TOP_LIST](state,data){
		state.all=state.all.concat(data)
	},
	[INIT_LIST](state){
		state.all=[]
	}
}
export default {
	state,mutations
}
