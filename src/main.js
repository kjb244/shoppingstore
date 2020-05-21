import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheese, faBreadSlice, faWineBottle, faBorderAll, faCookieBite, faSearchDollar, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue);


library.add(faCheese);
library.add(faBreadSlice);
library.add(faWineBottle);
library.add(faBorderAll);
library.add(faCookieBite);
library.add(faSearchDollar);
library.add(faBirthdayCake);


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
