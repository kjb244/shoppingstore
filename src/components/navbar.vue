<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Shopping App</b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item href="#" v-on:click="clickCart()">
                    <font-awesome-icon icon="shopping-cart" class="mr-1 fa-2x white" />
                    <b-badge variant="light">{{cart.count}}</b-badge>

                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>




                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">


                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>


                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <cart-side-bar @cartClosed="onCartClosed" :openProp="cart.open"></cart-side-bar>

    </div>

</template>

<script>
    import CartSideBar from './cartsidebar.vue';
    import { mapGetters } from 'vuex';

    export default {
        name: 'navbar',
        components:{
            CartSideBar

        },
        data(){
            return{
                cart: {
                    open: false,
                    count: 0,
                },
                search: '',

            }
        },
        methods: {
          clickCart: function(){
              this.cart.open = !this.cart.open;
          },
          onCartClosed: function(val){
              this.cart.open = val;
          }
        },
        watch:{
            'cartData': function(newVal){
                this.cart.count = (Object.keys(newVal) || []).map((e) =>{
                    return newVal[e].length
                }).reduce((accum, e) => {
                   accum += e;
                   return accum;
                },0);
            }
        },
        computed:{
            ...mapGetters([
                'cartData',
            ]),
        },
        created: function(){
        }
    }
</script>

<style scoped>
    .white{
        color:white;
    }
</style>