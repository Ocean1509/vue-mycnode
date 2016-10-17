import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './router';
import {getTab,getTime,filterNav} from './filter';
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueRouter)
Vue.use(VueResource)

//图片懒加载
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  	error: 'static/images/default.png',
	loading: 'static/images/default.png',
});
//注册过滤器
Vue.filter('getTab',getTab);
Vue.filter('getTime',getTime);
Vue.filter('filterNav',filterNav)
const router=new VueRouter()

routerMap(router)
/* eslint-disable no-new */

router.start(App,'app')