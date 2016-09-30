
<template>
	<nav :class="{'fixed':fixed}">
		<ul>
			<li v-for='nav in getNavs' v-link="{name:nav.rname}" v-if="nav.logined==getUser.success||nav.common">{{nav.name}}<span class='uread' v-if="nav.rname=='uread'" v-show="getUser.unMes>0">{{getUser.unMes}}</span></li>
		</ul>
	</nav>
</template>
<script>
 import {getUnMeg,getLoginMes} from '../vuex/action';
  export default {
    vuex: {
      getters: {
        getNavs: (state)=>state.navs,
        getUser:({userMes})=>userMes.user,
      },
      actions:{
      	getUnMeg,
      	getLoginMes,
      }
    },
    data(){
    	return {
    		fixed:false,
    		top:'',
    		clientTop:''
    	}
    },
    ready(){
    	this.top=this.$el.offsetTop;
    	this.clientTop=this.$el.offsetHeight;
    	// console.log(document.body.scrollTop)
    	window.addEventListener('scroll',this.scroll);
    	this.getLoginMes();
    	if(this.getUser.success){
    		this.getUnMeg()
    	}
    },
    methods:{
    	scroll(e){
    		
    		// const top=this.$el.offsetTop;
    		// console.log(this.clientTop);
    		// console.log(document.body.scrollTop)
    		// console.log(document.body.scrollTop-this.$el.offsetTop)
    		// console.log(this.$el.offsetHeight)
    		if(document.body.scrollTop>=this.top+this.clientTop){
    			this.fixed=true
    			// console.log(this.fixed)
    		}else{
    			// console.log('-----------')
    			this.fixed=false
    		}
    	},
    	getTop(){
    		return this.$el.offsetTop
    	}
    }
  };
</script>
<style scoped>
	nav{margin: 0 auto;text-align: center;background-color: #444}
	nav ul{overflow: hidden;display: inline-block;padding:0;margin:5px 0;margin-top:0;}
	nav ul li{float:left;list-style:none;color:#ccc;padding:0 10px;font-size:1rem;font-weight: bold;position: relative;line-height: 2em}
	nav ul li .uread{background-color: #80BD01;height: 16px;width: 16px;display: inline-block;text-align: center;border-radius: 8px;color: #FFF;font-size: 8px;line-height: 16px;position: absolute;top:0;left:42px;}
	nav.fixed{position: fixed;top:0;left:0;margin: 0 auto;text-align: center;background-color: #444;width:100%;z-index:999;}
</style>