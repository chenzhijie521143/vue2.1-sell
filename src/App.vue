<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class='tab border-b-1px'>
      <div class='item-tab'>
      	<router-link to="/goods">商品</router-link>
      </div>
      <div class='item-tab'>
      	<router-link to="/ratings">评论</router-link>
      </div>
      <div class='item-tab'>
         <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    	<router-view v-bind:seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue';
import {urlParse} from './common/js/util.js';
// import data from './common/json/data.json';
const ERR_OK=0;
export default {
  name:'App',
  data () {
  	return {
  		seller:{
  			id: (() => {
  				let queryParam=urlParse();
  				return queryParam.id;
  			})()
  		}
  	};
  },
  created (){
		this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
			if(response.data.errno===ERR_OK){
				// 用于对象的合并 , Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。
				this.seller=Object.assign({},this.seller,response.data.data);
			}else{
				console.log('no data');
			}
		});
    // this.seller=Object.assign({},this.seller,data.seller);
  },
  components:{
    'v-header':header
  }
};
</script>

<style lang="scss" scoped>
  @import "./common/styles/mixin.scss";
  #app{
  	 .tab{
  		display:flex;
  		width:100%;
  		height:40px;
  		line-height:40px;
  		font-size:14px;
  		color:rgb(240,20,20);
  		@include border-b-1px(rgba(7,17,27,0.1));
  		.item-tab{
  			flex:1;
  			text-align:center;
  			.active{
  				color:rgb(240,20,20);
  			}
  		}
  	}
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
