<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

</style>
<script>
  import Menu from "./views/Menu_library";
  export default {
    components: {Menu}
  }
</script>

<style>
    ::-webkit-scrollbar {
        width: 3.5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #007bfe;
    }
    @font-face {
        font-family: "vazirLight";
        src: local("vazirLight"),
        url("assets/FontsFree-Net-Vazir-Light.ttf") format("truetype");
    }
    #app{
        overflow: scroll;
        font-family: vazirLight;

    }

</style>