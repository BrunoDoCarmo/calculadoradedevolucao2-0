<template>
  <div>
    <header class="header">
      <router-link to="./">
        <font-awesome-icon class="icon" :icon="['fas', 'calculator']" />
        Calculador Devolução
      </router-link>
      <Navbar />
      <span>Versão: 2.0.0</span>
    </header>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
export default {
  name: "HeaDer",
  components: {
    Navbar,
  },
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 5rem;
  padding: 2rem 5%;
  z-index: 1000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
.header a {
  font-family: var(--font-1);
  font-size: 1.8rem;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header a .icon {
    font-size: 3rem;
    margin-right: .5rem;
}

.header span {
    text-transform: uppercase;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    right: 1rem;
    font-size: .8rem;
    font-family: var(--font-3);
}
</style>
