import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods.vue';
import ratings from '@/components/ratings/ratings.vue';
import seller from '@/components/seller/seller.vue';

Vue.use(Router);

const routes=[
	{
	  path: '/',
	  redirect: 'goods', // 重定向
	},
	{
	  path: '/goods',
	  component: goods
	},
	{
	  path: '/ratings',
	  component: ratings
	},
	{
	  path: '/seller',
	  component: seller
	}
];
export default new Router({
   linkActiveClass:'active',
   routes
});
