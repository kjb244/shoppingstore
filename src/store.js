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
    cartData: (state) => {
        return state.cartData;
    },
    cartCount: (state) =>{
        const cd = state.cartData;
        const rtnInteger = Object.keys(cd || {}).reduce((accum, e) =>{
           const valu = (cd[e] || []).length;
           accum += valu;
           return accum;
        },0);
        return rtnInteger;
    }
  },
  mutations: {
    CLICK_ITEM: function(state,item){
        if(state.routeData.routes.includes(item)){
            router.push(item);
        }

    },
    REMOVE_FROM_CART: function(state, data){
      const {route, item } = data;
      const hashArr = (state.cartData[route] || []).filter(e => e.heading !== item.heading);
      state.cartData = {
          ...state.cartData,
          [route]: hashArr
      };
      console.log('current cart after remove', state.cartData);
    },
    ADD_TO_CART: function(state, data){
        const {route, item, quantity} = data;
        const hashArr = (state.cartData[route] || []).filter(e => e.heading !== item.heading);
        hashArr.push({...item, quantity});
        state.cartData = {
            ...state.cartData,
            [route]: hashArr
        };
        console.log('current cart after add', state.cartData);
    }
  },
  actions: {
    clickItem: function(context, item){
        context.commit('CLICK_ITEM',item);
    },
    addToCart: function(context, data){
        context.commit('ADD_TO_CART', data);
    },
    removeFromCart: function(context, data){
      context.commit('REMOVE_FROM_CART', data);
    },
    getAllItemData: (state) => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const routes = state.state.routeData.jcrData.routes;
              const payload = Object.keys(routes).reduce((accum,key) =>{
                  const valu = routes[key];
                  accum = [...accum, ...valu];
                  return accum;
              },[]);

              const filterCriteria = getFilterCriteria(payload);

              resolve({filterCriteria, payload});
          },800);
      });
    },

    getSingleItemData: (state) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let currRoute = router.currentRoute.name;
            currRoute = currRoute.substr(0,1).toUpperCase() + currRoute.substr(1).toLowerCase();
            const payload = state.state.routeData.jcrData.routes[currRoute];
            const filterCriteria = getFilterCriteria(payload);
            resolve({filterCriteria, payload});
        },800);
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

function getFilterCriteria(payload){

    const countHash = {};
    const filterCriteria = payload.reduce((accum, item) => {
        Object.keys(item.meta || []).map((key) => {
            const valu = item.meta[key];
            const arr = countHash[key + "-" + valu] || [];
            countHash[key + "-" + valu] = [...arr, valu];
            if(!accum[key]){
                accum[key] = {
                    checkboxModel: [],
                    checkboxOptions: [{text: valu, value: valu}],
                    checkboxGroupVisible: true,
                };
            } else if (!accum[key].checkboxOptions.find(e => e.value === valu)){
                accum[key].checkboxOptions.push({text: valu, value: valu});
            }
        });
        return accum;
    },{});
    Object.keys(filterCriteria).map((key) => {
        const checkboxOptions = filterCriteria[key].checkboxOptions;
        checkboxOptions.map((e) =>{
            const count = (countHash[key + "-" + e.text] || []).length ;
            e.text += " " + count;
        });
    });
    return filterCriteria;
}
