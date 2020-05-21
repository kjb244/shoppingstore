<template>
    <div class="mt-5 row">
        <div class="col-sm-12">
            <div class="parent-container">
                <i class="far fa-envelope"></i>

                <div class="item" v-for="rec in items" v-bind:key="rec" :class="{active: activeItem.toLowerCase() === rec.toLowerCase()}"
                     v-on:click="activateItem(rec);clickItem(rec)">
                    <font-awesome-icon :icon="iconMapping[rec.toLowerCase()]" class="fa-2x" />
                    <div class="mt-2">{{rec}}</div>

                </div>
            </div>
        </div>
    </div>



</template>

<script>

    import { mapActions } from 'vuex';

    export default {
        name: 'navitems',
        props: [],
        data(){
            return{
                items: [
                    'All',
                    'Specials',
                    'Subs',
                    'Snacks',
                    'Cheeses',
                    'Wine',
                    'Dessert',
                ],
                iconMapping:{
                    all: 'border-all',
                    cheeses: 'cheese',
                    specials: 'search-dollar',
                    subs: 'bread-slice',
                    snacks: 'cookie-bite',
                    wine: 'wine-bottle',
                    dessert: 'birthday-cake',
                },
                activeItem: ''
            }
        },
        watch: {

        },
        created: function(){
            this.activeItem = this.$router.currentRoute.name;
        },
        methods: {
            ...mapActions([
                'clickItem'
            ]),

            activateItem: function(item){
                this.activeItem = item;
            }
        }
    }
</script>

<style scoped>
    .parent-container{
        display: flex;
        justify-content: space-between;
        background-color: #dcddea;
    }

    .item{
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: linear .3s all;
        cursor: pointer;
    }

    .item:hover, .item.active{
        background-color: white;
    }



    

</style>