import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import VueResource from "vue-resource"

/* eslint-disable no-new */

import foods from "./components/foods"
import evaluation from "./components/evaluation"
import merchants from "./components/merchants"
import login from "./components/login"
import sellers from "./components/sellers"
import goods from "./components/goods.vue"
import allShops from  "./components/allShops.vue"

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
	routes:[
    {path:"/l",component: login},
    {path:"/f",component: goods},
   {path:"/a",component: allShops},
		{path:"/b",component: evaluation},
		{path:"/c",component: merchants},
    {path:"/e/:id",component: sellers}
  ]
})

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components:{
  	App
  }
}).$mount("#app");
