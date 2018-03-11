// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'; // index.js会自动寻找到，也可以写全（import router from './router/index.js'）
import VueResource from 'vue-resource';
import './common/styles/index.scss';
/* 设置为 false 以阻止 vue 在启动时生成生产提示 */
Vue.config.productionTip = false;

Vue.use(VueResource); // 全局注册

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
