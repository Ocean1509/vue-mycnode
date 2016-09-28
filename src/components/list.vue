<template>
	<div class="main">
		<ul>
			<li v-for="item in list" v-link="{name:'topic',params:{id:item.id}}" >
					<img :src="item.author.avatar_url" alt="avator">
					<div class='tab'>
						<span v-if="item.top" class='key'>置顶</span>
						<span v-else v-if="item.good" class="key">精华</span>
						<span v-if="!item.top&&!item.good">{{item.tab |getTab}}</span>
					</div>
					<span class="count">{{item.reply_count}}/{{item.visit_count}}</span>
					<p>{{item.title}}</p>
					<p class='time'>{{item.last_reply_at|getTime}}</p>
			</li>
		</ul>
	</div>

</template>
<script>
	export default {
		props:['list'],
	}
</script>
<style scoped>
.main ul {margin:0;padding:0;margin-top:-16px;}
.main ul li{list-style:none;overflow: hidden;padding:8px 10px;position: relative;border-bottom:1px solid #f0f0f0;}
.main ul li:active{background-color: #e1e1e1}
.main ul li img{width:30px;height: 30px;float:left;margin-right: 5px}

.main ul li p{float:left;margin:0;max-width:60%;text-overflow:ellipsis;white-space: nowrap;overflow: hidden;font-size: 14px;color:#333;line-height: 30px;margin-left:5px;}
.main ul li p.time{margin:0;float:right;color: #778087;font-size: 12px;max-width: 15%;text-align: right}
.main .tab{float:left;}
.main .tab span{background-color: #e5e5e5;color: #999;font-size:12px;padding: 2px 4px;}
.main .tab span.key{background-color: #80bd01;color:#fff;}
.main .count{font-size: 12px;color:#b4b4b4;position: absolute;top:30px;left:46px;}
</style>