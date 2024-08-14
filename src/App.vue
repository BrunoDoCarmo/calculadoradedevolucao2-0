<template>
  <Header />
   <div class="router">
     <router-view/>
   </div>
</template>
<script>
import Header from "./components/Header.vue";
import "./assets/css/global.css";
export default {
  name: "App",
  components: {
    Header
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: calc(100% - 5rem);
}
</style>
