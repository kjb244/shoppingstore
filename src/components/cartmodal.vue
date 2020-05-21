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
                            <b-form-select v-model="quantitySelected.selected" :options="quantitySelected.options" size="sm" class="mt-1"></b-form-select>

                        </b-card-text>
                    </b-card-body>
                </b-col>
            </b-row>
            <template v-slot:modal-footer>
                <div class="w-100">
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
    import { mapActions } from 'vuex';

    import {CardPlugin} from 'bootstrap-vue';

    Vue.use(CardPlugin);


    export default {
        name: 'cartmodal',
        components:{
        },
        props: ['node', 'route'],
        data(){
            return{
                showModal: this.node.showModal,
                item: this.node.item,
                quantitySelected:{
                    selected: 1,
                    options:[...Array(11).keys()].slice(1)
                }
            }
        },
        computed:{

        },
        methods: {
            ...mapActions([
                'addToCart'
            ]),
            hide: function(){
                this.node.showModal = false;
                this.quantitySelected.selected = 1;
            },
            addToCartClick: function(){
                const data = {
                    item: this.item,
                    quantity: this.quantity,
                    route: this.route
                };
                this.addToCart(data);
            }
        },
        watch:{
            'node.showModal': function(newVal){
                this.showModal = newVal;
            },
            'node.item': function(newVal){
                this.item = newVal;
            }

        },
        created: function(){


        }
    }
</script>

<style scoped>





</style>