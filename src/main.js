import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerMap from './router';
import {getTab,getTime} from './filter';

// import store from './vuex/store';
Vue.use(VueRouter)
Vue.use(VueResource)

//注册过滤器
Vue.filter('getTab',getTab);
Vue.filter('getTime',getTime);
const router=new VueRouter()

routerMap(router)
/* eslint-disable no-new */

router.start(App,'app')