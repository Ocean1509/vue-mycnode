<template>
	<div id="app">
		<mheader></mheader>
		<mnav></mnav>
		<router-view></router-view>
	</div>

</template>
<script>
import store from './vuex/store';
import mheader from './components/header';
import mnav from './components/nav';
export default{
  components:{
    mheader,
    mnav,
  },
  store,
};
</script>