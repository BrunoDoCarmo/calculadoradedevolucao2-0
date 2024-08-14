<template>
    <div class="container">
      <h3>Nota Fiscal Eletrônica (NF-e)</h3>
      <div class="modolos">
        <a @click="$router.replace('/notafiscal/venda')">
          <font-awesome-icon class="icon" :icon="['fas', 'dollar-sign']" />
          <span>Venda</span>
        </a>
        <a @click="$router.replace('/devolucao')">
          <font-awesome-icon class="icon" :icon="['fas', 'hands-holding-child']" />
          <span>Devolução</span>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TipoNotaFiscal",
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 5rem);
    background: #f5f5f5;
  }
  
  h3 {
    text-transform: uppercase;
    font-size: 3rem;
    color: #333;
  }
  
  .modolos {
    display: flex;
    width: 100%;
    gap: 2rem;
    padding: 0 2rem;
  }
  
  .modolos a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 30vh;
    background: #007bff;
    color: white;
    border-radius: 1.5rem;
    text-decoration: none;
    transition: background 0.3s ease;
  }
  
  .modolos a:hover {
    background: #0056b3;
  }
  
  .icon {
    font-size: 7rem;
  }
  
  span {
    font-size: 3rem;
    font-weight: bold;
  }
  </style>
  