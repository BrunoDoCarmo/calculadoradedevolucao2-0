<template>
  <div class="home">
    <div class="welcome">
      <h3>Bem-vindo <br/> <span>Sistema Calculador de Devolução</span></h3>
      <p class="saldacao">
        Simplifique e otimize suas devoluções com nossa ferramenta avançada, aumentando a precisão e eficiência de suas operações.
      </p>
    </div>
    <div class="botao">
      <button class="btn">Importar XML</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
<style>
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
}
.welcome {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.welcome h3 {
  font-size: 3rem;
  text-transform: uppercase;
}
.welcome .saldacao {
  text-align: justify;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #2d2c2c;
}
.botao {
  width: 100%;
}
</style>
