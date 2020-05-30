<template>
    <section>
        <Item type="single"></Item>
    </section>



</template>

<script>
    import Item from './item.vue';

    export default {
        name: 'subs',
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