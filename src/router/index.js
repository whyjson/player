import Vue from 'vue'
import Router from 'vue-router'
import My from '@/components/My/My.vue'
import Playing from '@/components/Playing/Playing.vue'
import Find from '@/components/Find/Find.vue'
Vue.use(Router)
import store from '../store.js'
import "../assets/jquery-1.8.3.min.js"
export default new Router({
	linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: My,
      beforeEnter: (to, from, next) => {
        store.commit("changeBottom","movies");
        next();
      }
    },
    {
      path: '/playing',
      component: Playing,
      beforeEnter: (to, from, next) => {
		$("body").css({
			"height":"100%"
		})
        next();
      }
    },
    {
      path: '/find',
      component: Find,
      beforeEnter: (to, from, next) => {
		$("body").css({
			"height":"auto"
		})
        next();
      }
    }
  ]
})
