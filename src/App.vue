<template>
  <div id="app">

    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <navbar></navbar>
    <heading></heading>
    <navitems></navitems>

    <div class="router">

        <router-view/>



    </div>
  </div>
</template>

<script>

import Navbar from "./components/navbar.vue";
import Heading from "./components/heading.vue";
import Navitems from "./components/navitems.vue";

export default {
  name: 'App',
  components: {
      Heading,
      Navbar,
      Navitems,

  }
}
</script>

<style>

  .row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

</style>
