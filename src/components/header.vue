<template>
	<header>
		<img src="../assets/css/cnodejs_light.svg" alt="">
		<input type="text">
	</header>
</template>
<style scoped>
	header{
		background-color:#444;
		overflow: hidden;
		padding:30px 20px;
	}
	img{width:40%;float:left;}
	input{width:40%;float: right;outline:none;}
	input:focus{background-color: #fff}
	input{
		-webkit-box-shadow: none;
  		-moz-box-shadow: none;
  		background: url(../assets/images/search.png) 4px 4px no-repeat #888;
  		padding: 6px 5px 3px 22px;
  		color: #666;
  		border: 0;
  		transition: all .5s;
  		margin-bottom: 0;
  		font-size: 13px;
  		font-weight: 400;
  		line-height: 1;
  		-webkit-border-radius: 15px;
  		-moz-border-radius: 15px;
  		border-radius: 15px;
  		margin-top:10px;
	}
</style>