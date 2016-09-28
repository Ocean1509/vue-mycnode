//自定义过滤器
//将模型中的值转化为视图之前转化它，也可以实现在视图中的值写入模型之前转化。
export const getTab =(tab)=>{
	let str;
	switch (tab) {
		case 'good':
			str='精华';
			break;
		case 'share':
			str='分享';
			break;
		case 'ask':
			str='问答';
			break;
		case 'job':
			str='招聘';
			break;
		default:
	}
	return str
}

//将获取到的内容最后回答时间，转化为距离目前的时间。
//比如1小时前，1分钟前，1小时前，1天前，1个月前，1年前

export const getTime=(val)=>{
	const t=parseFloat((new Date()-new Date(val))/1000);
	let s;
	if(t<60){
		s=parseInt(t)+'秒前'
	}else if(t>=60&&t<60*60){
		s=parseInt(t/60)+'分钟前';
	}else if(t>=60*60&&t<60*60*24){
		s=parseInt(t/60/60)+'小时前';
	}else if(t>60*60*24&&t<60*60*24*30){
		s=parseInt(t/60/60/24)+'天前';
	}else if(t>60*60*24*30&&t<60*60*24*30*12){
		s=parseInt(t/60/60/24/30)+'个月前'
	}else{
		s=parseInt(t/60/60/24/30/12)+'年前'
	}
	return s
}
