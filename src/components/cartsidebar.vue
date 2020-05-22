<template>
    <section>
        <b-sidebar id="sidebar-right" @hidden="hide()" :visible="open" title="Sidebar" right shadow>
            <div class="px-3 py-2">
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </p>
                <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
            </div>
        </b-sidebar>
    </section>

</template>

<script>

    import Vue from 'vue';
    import { SidebarPlugin } from 'bootstrap-vue';

    Vue.use(SidebarPlugin);

    export default {
        name: 'cartsidebar',
        props: ['props'],
        data(){
            return{
                open: this.props.open || false,

            }
        },
        watch: {
            'props.open': function(newVal){
                this.open = newVal;
            }
        },
        methods: {
          hide: function(){
              this.props.open = false;
          }
        },
        created: function(){
            console.log(this.props)
        }
    }
</script>

<style scoped>

</style>