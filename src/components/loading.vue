<!--加载中组件-->
<template>
	<div class="loading">
		<div class="loadEffect">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</template>
<style scoped>
	.loading{
		background-color: #e1e1e1
	}
	.loadEffect{
            width: 50px;
            height: 50px;
            position: relative;
            margin: 0 auto;
            background-color: #e1e1e1
        }
        .loadEffect span{
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background:#80bd01;
            position: absolute;
            -webkit-animation: load 1.04s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0.2;
            }
        }
        .loadEffect span:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-8px;
            -webkit-animation-delay:0.13s;
        }
        .loadEffect span:nth-child(2){
            left: 6px;
            top: 6px;
            -webkit-animation-delay:0.26s;
        }
        .loadEffect span:nth-child(3){
            left: 50%;
            top: 0;
            margin-left: -8px;
            -webkit-animation-delay:0.39s;
        }
        .loadEffect span:nth-child(4){
            top: 6px;
            right:6px;
            -webkit-animation-delay:0.52s;
        }
        .loadEffect span:nth-child(5){
            right: 0;
            top: 50%;
            margin-top:-8px;
            -webkit-animation-delay:0.65s;
        }
        .loadEffect span:nth-child(6){
            right: 6px;
            bottom:6px;
            -webkit-animation-delay:0.78s;
        }
        .loadEffect span:nth-child(7){
            bottom: 0;
            left: 50%;
            margin-left: -8px;
            -webkit-animation-delay:0.91s;
        }
        .loadEffect span:nth-child(8){
            bottom: 8px;
            left: 3px;
            -webkit-animation-delay:1.04s;
        }
</style>