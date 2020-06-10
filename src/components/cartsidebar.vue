<template>
    <section>
        <b-sidebar id="sidebar-right" @hidden="hide()" :visible="open" title="Cart" backdrop right shadow>
            <div class="px-3 py-2">
                <div v-bind:key="route" v-for="(data, route) in cartData">
                    <transition-group name="fademe" tag="span">
                        <div v-bind:key="item.heading" v-for="item in data" class="parent-container mb-4 fademe">

                                <b-img key="img" src="https://picsum.photos/100/100/?image=54" fluid thumbnail></b-img>
                                <div key="heading" class="child-container ml-3">
                                    <p class="mb-1">{{item.heading}}</p>
                                    <b-form-select v-model="item.quantity" :options="quantitySelected.options" size="sm" class="mt-1 mb-1"></b-form-select>
                                    <b-link @click="clickDelete(route, item)">Delete</b-link>

                                </div>

                        </div>
                    </transition-group>

                </div>


            </div>
        </b-sidebar>
        <div v-show="showStickyCart()" v-b-toggle.sidebar-right class="sticky-button">
            <b-button variant="success">
                <font-awesome-icon icon="cart-plus" class="mr-1" />
                View Cart
                <b-badge class="ml-1" variant="light">{{cartCount}}</b-badge>
            </b-button>

        </div>
    </section>

</template>

<script>

    import Vue from 'vue';
    import { SidebarPlugin, LinkPlugin } from 'bootstrap-vue';
    import { mapGetters, mapActions } from 'vuex';
    Vue.use(LinkPlugin)
    Vue.use(SidebarPlugin);

    export default {
        name: 'cartsidebar',
        props: ['openProp'],
        data(){
            return{
                open: this.openProp || false,
                quantitySelected:{
                    options:[...Array(11).keys()].slice(1).map((e) =>{
                        return { value: e, text: `Quantity: ${e}`};
                    })
                },
            }
        },
        watch: {
            'openProp': function(newVal){
                this.open = newVal;
            }
        },
        methods: {
            ...mapActions([
                'removeFromCart'
            ]),
            hide: function(){
              this.$emit("cartClosed", false) ;
            },
            clickDelete: function(route, rec){
                this.removeFromCart({route, item: rec});
            },
            showStickyCart: function(){
                return this.cartCount > 0;
            }

        },
        computed: {
            ...mapGetters([
                'cartData', 'cartCount',
            ]),
        },
        created: function(){

        }
    }
</script>

<style scoped>

    .parent-container, .child-container{
        display: flex;
    }

    .child-container{
        flex-direction: column;
    }

    .sticky-button{
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 100;
    }


    .fademe {
        transition: all 0.5s;

    }
    .fademe-enter, .fademe-leave-to
        /* .card-leave-active for <2.1.8 */ {
        opacity: 0;

    }
    .fademe-enter-to {
        opacity: 1;

    }

    .fademe-leave-active {
        position: absolute;
    }

</style>