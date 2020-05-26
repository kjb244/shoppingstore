<template>
    <div class="mt-5 row">
        <div class="col-sm-12">
            <div class="parent-container">

                <div class="item" v-for="rec in items" v-bind:key="rec" :class="{active: activeItem.toLowerCase() === rec.toLowerCase()}"
                     v-on:click="activateItem(rec);clickItem(rec)">
                    <font-awesome-icon :icon="iconMapping[rec.toLowerCase()]" class="" />
                    <div class="mt-2">{{rec}}</div>
                    <div class="triangle"></div>

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
        border-bottom: 3px solid #dcddea
    }

    .item{
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: background-color .3s linear;
        cursor: pointer;
        position:relative;
    }

    .item:hover .triangle, .item.active .triangle{
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #dcddea;
        position: absolute;
        bottom: 0;
    }

    .item:hover .triangle::after, .item.active .triangle::after {
        content: '';
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid white;
        position: absolute;
        bottom: -13px;
        left: -8.5px;
    }

    .item:hover, .item.active{
        background-color: white;
    }

    .item svg{
        font-size: 2rem;
    }

    @media only screen and (max-width: 575px) {
        .parent-container {
            flex-wrap: wrap;
        }

        .item{
            width: 33.33%;
        }

        .item svg{
            font-size: 1rem;
        }
    }



    

</style>