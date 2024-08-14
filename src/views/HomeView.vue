<template>
  <div class="home">
    <div class="welcome">
      <h3>Bem-vindo <br/> <span>Sistema EmitPro</span></h3>
      <p class="saldacao">
        Aumente a precisão e eficiência das suas operações com nossa ferramenta avançada de gestão de Notas Fiscais Eletrônica.
      </p>
    </div>
    <router-link to="/notafiscal" class="btn">Emitir Nota fiscal</router-link>
  </div>
</template>
<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 1rem;
  background-image: url(../assets/image/bg-home.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem;
}
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.6);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
}
.welcome h3 {
  font-size: 3rem;
  text-transform: uppercase;
}
.welcome h3 span {
  color: #219150;
}
.welcome .saldacao {
  text-align: center;
  font-size: 1.5rem;
  padding-top: 0;
  text-transform: uppercase;
  color: #2d2c2c;
}
</style>
