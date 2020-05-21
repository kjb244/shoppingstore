import Vue from 'vue'
import Router from 'vue-router';
import All from './components/all.vue';
import Specials from './components/specials.vue';
import Subs from './components/subs.vue';
import Snacks from './components/snacks.vue';
import Cheeses from './components/cheeses.vue';
import Wine from './components/wine.vue';
import Dessert from './components/dessert.vue';




Vue.use(Router);



export default new Router({
  routes: [

    {
      path: '/all',
      name: 'all',
      component: All
    },
    {
      path: '/specials',
      name: 'specials',
      component: Specials
    },
    {
      path: '/subs',
      name: 'subs',
      component: Subs
    },
    {
      path: '/snacks',
      name: 'snacks',
      component: Snacks
    },
    {
      path: '/cheeses',
      name: 'cheeses',
      component: Cheeses
    },
    {
      path: '/wine',
      name: 'wine',
      component: Wine
    },
    {
      path: '/dessert',
      name: 'dessert',
      component: Dessert
    },
  ]
})
