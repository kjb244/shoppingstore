<template>
    <section>
        <b-modal v-model="showModal" @hide="hide()" title="Add to Your Cart">

            <b-row no-gutters>
                <b-col cols="6">
                    <b-card-img src="https://picsum.photos/400/400/?image=10" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col cols="6">
                    <b-card-body :title="item.heading">
                        <b-card-text>
                            <p>{{item.subHeading}}</p>
                            <p><b>{{item.price}}</b></p>
                            <br>
                            <span>Select Quantity</span>
                            <b-form-select v-model="quantitySelected.quantity" :options="quantitySelected.options" size="sm" class="mt-1"></b-form-select>

                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
            <template v-slot:modal-footer>
                <div class="w-100">
                    <p v-if="alreadyInCart()" class="red-me">It appears this item is already in your cart. Adding it again will remove the item and replace it.</p>
                    <b-button variant="primary" size="md" class="float-right" v-on:click="addToCartClick();showModal=false">
                        Add
                    </b-button>

                </div>
            </template>
        </b-modal>

    </section>



</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';

    import {CardPlugin} from 'bootstrap-vue';

    Vue.use(CardPlugin);


    export default {
        name: 'cartmodal',
        components:{
        },
        props: ['node', 'route'],
        data(){
            return{
                showModal: true,
                item: this.node.item,
                quantitySelected:{
                    quantity: this.node.item.quantity || 1,
                    options:[...Array(11).keys()].slice(1)
                },
            }
        },
        computed:{
            ...mapGetters([
                'cartData',
            ]),

        },
        methods: {
            ...mapActions([
                'addToCart'
            ]),
            alreadyInCart(){
                const node = this.cartData[this.route];
                if (node){
                    const here = node.find(e => e.heading === this.item.heading);
                    if(here) return true;
                }
                return false;
            },
            hide: function(){
                this.$emit("modal-closed") ;
            },
            addToCartClick: function(){
                const data = {
                    item: this.item,
                    quantity: this.quantitySelected.quantity,
                    route: this.route
                };
                //first let the modal close then add it; already in cart method was firing immediately on state change
                // and showing stuff on change
                setTimeout(() => {
                    this.addToCart(data);
                },200);
            }
        },
        watch:{



        },
        created: function(){


        }
    }
</script>

<style scoped>

    .red-me{
        color: #ec4242;
    }





</style>