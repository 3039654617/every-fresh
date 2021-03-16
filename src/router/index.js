import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Classify from '@/views/Classify'
import Shopping from '../views/Shopping.vue';
import First from '../views/First.vue';
import My from '../views/My.vue';
import Start from '../views/Start.vue';
import Search from '../views/search.vue';
import VueRouter from 'vue-router';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/classify',
          name: 'classify',
          component: Classify,
        },
        {
          path: '/home/shopping',
          component: Shopping,
        },
        {
          path: '/home/first',
          component: First,
        },
        {
          path: '/home/my',
          component: My,
        }
      ],
    },
    {
      path: '/',
      component: Start,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    }
  ]
})
