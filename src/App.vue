<template>
  <div id="app">
    <v-header></v-header>
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
    <transition name="fade">
    	<router-view></router-view>
    </transition>
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default {
  name:'App',
  components:{
    'v-header':header
  }
};
</script>

<style lang="scss" scoped>
  @import "./common/style/mixin.scss";
  #app{
  	& .tab{
  		display:flex;
  		width:100%;
  		height:40px;
  		line-height:40px;
  		@include border-t-1px(rgba(7,17,27,0.1));
  		& .item-tab{
  			flex:1;
  			text-align:center;
  			& .active{
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
