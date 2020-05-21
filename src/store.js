import Vue from 'vue';
import Vuex from 'vuex';
//import axios from 'axios';
import router from './router.js';
import jcr from './jcr/copy.json';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
      routeData: {
          routes:  Object.keys(jcr.routes),
          jcrData: jcr,
          visitedRoutes: []
      },
      cartData:{
      }
  },
  getters: {
    jcrData: (state) => {
        return state.routeData.jcrData
    },
  },
  mutations: {
    CLICK_ITEM: function(state,item){
        if(state.routeData.routes.includes(item)){
            router.push(item);
        }

    },
    ADD_TO_CART: function(state, data){
        const {route, item} = data;
        const hashArr = [...state.cartData[route] || [],...[item]];
        state.cartData = {
            ...state.cartData,
            [route]: hashArr
        };
    },
    NEXT_ROUTE: function(state, route){
        const visitedRoutes = state.routeData.visitedRoutes;
        if(!visitedRoutes.length){
            visitedRoutes.push('init');
        }
        visitedRoutes.push(route);
        router.push(route);
    },
    SUBMIT_CLICK: function(state, data){
        const {currRoute, nextRoute, form}  = data;
        state.routeData.forwardBack = 'forward';
        state.routeData.formData[currRoute] = form;
        const visitedRoutes = state.routeData.visitedRoutes;
        if(!visitedRoutes.length){
            visitedRoutes.push(currRoute);
        }
        visitedRoutes.push(nextRoute);
        //since adding the forward/backward class takes a little time, pause for a bit
        setTimeout(()=> {
            router.push(nextRoute);
        },100);


    },
    SUBMIT_BACK: function(state, data){
      const {currRoute, nextRoute, form}  = data;
      state.routeData.forwardBack = 'back';
      state.routeData.formData[currRoute] = form;
      const visitedRoutes = state.routeData.visitedRoutes;
      if(!visitedRoutes.length){
        visitedRoutes.push(currRoute);
      }
      visitedRoutes.push(nextRoute);
      //since adding the forward/backward class takes a little time, pause for a bit
      setTimeout(()=> {
          router.push(nextRoute);
      },100);



    },

    ADD_ROUTE_DATA: function(state, data){
        console.log('adding route data mutation');
        state.routeData = data;
    },
    SET_TEMPLATE: function(state, template){
        state.template = template;
    },
  },
  actions: {
    clickItem: function(context, item){
        context.commit('CLICK_ITEM',item);
    },
    addToCart: function(context, data){
        context.commit('ADD_TO_CART', data);
    },
    getItemData: (state) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let currRoute = router.currentRoute.name;
                currRoute = currRoute.substr(0,1).toUpperCase() + currRoute.substr(1).toLowerCase();
                resolve(state.state.routeData.jcrData.routes[currRoute]);
            },2000);
        });
    },
    addRouteData (context){
        setTimeout(() => {
            console.log('add route data action');
            context.commit('ADD_ROUTE_DATA', [1,2,3]);
        },500);

    }
  }

})
