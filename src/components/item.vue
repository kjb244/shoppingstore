<template>
    <section>
        <div class="mt-5 row">
            <div class="col col-12">
                <div v-show="showSpinner" class="spinner text-center">
                    <b-spinner variant="secondary" label="Loading..."></b-spinner>
                </div>
            </div>
        </div>
        <div v-show="!showSpinner" class="detail-container">
            <div class="row">
                <div class="col col-12">
                    <b-form-input v-model="form.search" placeholder="Search"></b-form-input>

                </div>
            </div>
            <div class="row mt-3">
                <div class="col col-12 col-sm-4">
                    <article>
                        <div v-bind:key="key" v-for="(item, key, index) in filterCriteria" class="mb-3">

                            <b-link @click="item.checkboxGroupVisible = !item.checkboxGroupVisible">
                                {{key.substr(0,1).toUpperCase() + key.substr(1).toLowerCase()}}
                            </b-link>
                            <b-collapse :visible="item.checkboxGroupVisible" :id="index.toString()" class="mt-2">
                            <b-form-checkbox-group
                                    :id="index.toString()"
                                    v-model="item.checkboxModel"
                                    :options="item.checkboxOptions"
                                    stacked>
                            </b-form-checkbox-group>
                            </b-collapse>

                        </div>


                    </article>
                </div>
                <div class="col col-12 col-sm-8">
                    <div class="heading">
                        <p>{{filterCheckboxesAndSearch.length}} results in {{route}}</p>
                        <b-form-select v-model="form.sort.selected" :options="form.sort.options"></b-form-select>
                    </div>
                    <div class="details">
                        <div class="mt-3 d-none d-md-block">
                            <div class="row">
                                <div v-for="(rec, index) in filterCheckboxesAndSearch" :key="rec.heading" class="col col-12 col-sm-12 col-md-6 col-lg-4">
                                    <b-card :title="rec.heading" :img-src=randomPicture(index)
                                            img-alt="Image" img-top tag="article"
                                            style="" class="mb-2" bg-variant="light">
                                        <b-card-text>
                                            <p>{{rec.subHeading}}</p>
                                            <p><b>{{rec.price}}</b></p>
                                        </b-card-text>
                                        <b-button block href="#" variant="primary" v-on:click="addItemClick(rec)">
                                            Add
                                            <b-badge v-if="showCart(rec)" variant="light">
                                                <font-awesome-icon icon="cart-plus" />
                                            </b-badge>
                                        </b-button>

                                    </b-card>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 d-block d-md-none">
                            <div class="row">
                                <b-card v-for="(rec, index) in filterCheckboxesAndSearch" :key="rec.heading" no-body class="overflow-hidden mb-3" style="max-width: 540px;">
                                    <b-row no-gutters>
                                        <b-col cols="6">
                                            <b-card-img :src="randomPicture(index)" alt="Image" class="rounded-0"></b-card-img>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-card-body :title="rec.heading">
                                                <b-card-text>
                                                    <p>{{rec.subHeading}}</p>
                                                    <p><b>{{rec.price}}</b></p>
                                                    <br>
                                                    <b-button block href="#" variant="primary" v-on:click="addItemClick(rec)">
                                                        Add
                                                        <b-badge v-if="showCart(rec)" variant="light">
                                                            <font-awesome-icon icon="cart-plus" class="" />
                                                        </b-badge>
                                                    </b-button>
                                                </b-card-text>
                                            </b-card-body>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <CartModal :route="route" :node="modal"></CartModal>
    </section>



</template>

<script>
    import Vue from 'vue';
    import { mapGetters, mapActions } from 'vuex';
    import { SpinnerPlugin } from 'bootstrap-vue';
    import { CollapsePlugin } from 'bootstrap-vue'
    import { FormInputPlugin } from 'bootstrap-vue'
    import {CardPlugin} from 'bootstrap-vue';
    import CartModal from './cartmodal.vue';

    Vue.use(FormInputPlugin);
    Vue.use(SpinnerPlugin);
    Vue.use(CardPlugin);
    Vue.use(CollapsePlugin);


    export default {
        name: 'item',
        components:{
            CartModal,
        },
        props: [],
        data(){
            return{
                showSpinner: true,
                route: '',
                modal: {
                    item: {},
                    showModal: false,
                },
                form: {
                    search: '',
                    sort:{
                        selected: 'featured',
                        options: [
                            {
                                value: 'featured', text: 'Sort: featured'
                            },
                            {
                                value: 'a-z', text: 'Sort: a-z'
                            },
                            {
                                value: 'z-a', text: 'Sort: z-a'
                            }
                        ]
                    }
                },
                payload: [],
                filterCriteria: {},
            }
        },
        computed:{
            ...mapGetters([
                'jcrData', 'cartData',
            ]),
            filterCheckboxesAndSearch(){

                const fc = this.filterCriteria;
                //get all checkboxModel into one array
                const cbArr = Object.keys(fc).reduce((accum,key) => {
                    const valu = fc[key];
                    accum = [...accum, ...valu.checkboxModel];
                    return accum;
                },[]);
                //filter on checkbox
                const checkboxFilter =  this.payload.filter((e) => {
                    const metaValues = Object.values(e.meta);
                    if(!cbArr.length) return true;
                    return metaValues.find(r => cbArr.includes(r));
                });
                //then filter on search
                const searchFilter = checkboxFilter.filter((e) =>{
                    if(!this.form.search.length) return true;
                    return e.heading.toLowerCase().includes(this.form.search.toLowerCase());
                });

                //finally sort it
                if('a-z' === this.form.sort.selected){
                    searchFilter.sort((a,b) => a.heading.localeCompare(b.heading));
                } else if ('z-a' === this.form.sort.selected){
                    searchFilter.sort((a,b) => -1* a.heading.localeCompare(b.heading));
                }

                return searchFilter;
            }
        },
        methods: {
            ...mapActions([
                'getItemData'
            ]),
            randomPicture: function(index){
                return `https://picsum.photos/400/400/?image=${index+10}`;
            },
            addItemClick: function(item){
                this.modal.item = item;
                this.modal.showModal = true;
            },
            showCart: function(item){
                const cd = this.cartData[this.route];
                if(cd && cd.find(e => e.heading === item.heading)){
                    return true;
                }
                return false;
            }

        },
        watch: {

        },
        created: function(){
            this.getItemData().then((load) => {
                this.showSpinner = false;
                this.payload = load;
                this.route = this.$router.currentRoute.name;
                //hash of array
                const countHash = {};
                this.filterCriteria = this.payload.reduce((accum, item) => {
                    Object.keys(item.meta).map((key) => {
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
                Object.keys(this.filterCriteria).map((key) => {
                    const checkboxOptions = this.filterCriteria[key].checkboxOptions;
                    checkboxOptions.map((e) =>{
                        const count = (countHash[key + "-" + e.text] || []).length ;
                        e.text += " " + count;
                    });
                });

            })
        }
    }
</script>

<style scoped>

    .heading{
        display: flex;
        align-items: center;

    }

    .heading p{
        flex: 0 0 50%;
    }

    .card-text p{
        margin-bottom: 0;
    }

    .detail-container article{
        padding: 15px;
        background-color: #f8f8f8;
    }

    legend{
        font-weight: bold !important;
    }




</style>