<template>
	<nav>
		<ul>
			<li v-for='nav in navs'>{{nav.name}}</li>
		</ul>
	</nav>
</template>
<script>
 import { getNav} from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        navs: getNav,
      },
    },
  };
</script>
<style scoped>
	nav{margin: 0 auto;text-align: center;background-color: #444}
	nav ul{overflow: hidden;display: inline-block;padding:0;margin:5px 0;margin-top:0;}
	nav ul li{float:left;list-style:none;color:#ccc;padding:0 10px;font-size:14px;font-weight: bold}
</style>