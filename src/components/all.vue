<template>
    <section>
        <Item type="all"></Item>
    </section>



</template>

<script>
    import Item from './item.vue';



    export default {
        name: 'all',
        props: [],
        components:{
            Item,
        },
        data(){
            return{

            }
        },
        watch: {

        },
        created: function(){
        }
    }
</script>

<style scoped>




</style>