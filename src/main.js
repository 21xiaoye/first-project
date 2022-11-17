import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import store from './store'
import PopUps from './components/popUp.vue'
import commodity from './components/commodity.vue'
Vue.component('popup', PopUps)
Vue.component('commodity', commodity)
import commodityDetails from './components/commodityDetails.vue'
Vue.component('commodityDetails',commodityDetails)
import Carousel from './components/Carousel.vue'
Vue.component('carousel',Carousel)
new Vue({
  router,
  store,
  beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	},
  render: h => h(App),
}).$mount('#app')
