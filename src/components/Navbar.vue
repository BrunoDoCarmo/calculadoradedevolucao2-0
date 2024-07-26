<template>
  <div>
    <nav class="navbar">
      <font-awesome-icon class="icon" :icon="['fas', 'xmark']" id="nav-close"/>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <div class="icons">
      <font-awesome-icon class="icon" :icon="['fas', 'bars']" id="menu-btn"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>
.navbar a {
  margin-left: 2rem;
  font-size: 1.7rem;
  color: #10221b;
}

.navbar a:hover {
  color: #219150;
}
.navbar #nav-close {
  font-size: 5rem;
  cursor: pointer;
  color: #10221b;
  display: none;
}

.icons a,
.icons div {
  font-size: 2.5rem;
  margin-left: 2rem;
  cursor: pointer;
  color: #10221b;
}

.icons a:hover,
.icons div:hover {
  color: #219150;
}

#menu-btn {
  cursor: pointer;
  display: none;
}

.navbar a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 768px) {
  #menu-btn {
    display: inline-block;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: -110%;
    background: #fff;
    z-index: 10000;
    width: 35rem;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .navbar.active {
    left: 0;
    -webkit-box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.8);
  }

  .navbar a {
    margin: 1rem 0;
    font-size: 3rem;
  }

  .navbar #nav-close {
    display: block;
    position: absolute;
    top: 1rem;
    right: 2rem;
  }
}
</style>
