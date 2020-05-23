<template>
    <section>
        <b-sidebar id="sidebar-right" @hidden="hide()" :visible="open" title="Cart" right shadow>
            <div class="px-3 py-2">
                <div v-bind:key="route" v-for="(data, route) in cartData">
                    <div v-bind:key="item.heading" v-for="item in data" class="parent-container mb-2">
                        <b-img src="https://picsum.photos/100/100/?image=54" fluid thumbnail></b-img>

                        <p class="mb-0">{{item.heading}}</p>
                        <span>Select Quantity</span>
                        <b-form-select v-model="item.quantity" :options="quantitySelected.options" size="sm" class="mt-1"></b-form-select>
                    </div>

                </div>


            </div>
        </b-sidebar>
    </section>

</template>

<script>

    import Vue from 'vue';
    import { SidebarPlugin } from 'bootstrap-vue';
    import { mapGetters } from 'vuex';


    Vue.use(SidebarPlugin);

    export default {
        name: 'cartsidebar',
        props: ['openProp'],
        data(){
            return{
                open: this.openProp || false,
                quantitySelected:{
                    options:[...Array(11).keys()].slice(1)
                },
            }
        },
        watch: {
            'openProp': function(newVal){
                this.open = newVal;
            }
        },
        methods: {
          hide: function(){
              this.$emit("cartClosed", false) ;
          },

        },
        computed: {
            ...mapGetters([
                'cartData',
            ]),
        },
        created: function(){

        }
    }
</script>

<style scoped>

    .parent-container{
        display: flex;
    }

</style>