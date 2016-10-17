<!--下拉框-->
<template>
	<div class="dropdown">
		<span class="dropimg" @click.stop="drop">{{tab}}</span>
		<ul class="chooice" v-show="show">
			<li v-for="sort in sorts" @click="chsorts($index)">{{sort}}</li>
		</ul>	
	</div>
</template>
<script>
	export default{
		props:['sorts',"tab","show"],
		methods:{
			drop(){
				this.show=!this.show
			},
			chsorts(num){
				this.tab=this.sorts[num];
				this.show=false
			}
		}
	}
</script>
<style scoped>
	.dropdown{padding:0 10px;background-color: #fff;position: relative;}
	.dropdown .dropimg{display: inline-block;width: 100%;height: 32px;background: url("../assets/images/down.png")no-repeat right;background-color:#fff;line-height: 32px;}
	.chooice{width:80%;position: absolute;top:0;left:0;margin:0;padding:0;}
	.chooice li{list-style: none;line-height: 24px;height: 24px;background-color: #fff;padding-left:5px;background-color: #eee}
</style>