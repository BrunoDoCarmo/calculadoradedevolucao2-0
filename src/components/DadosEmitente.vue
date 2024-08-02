<template>
    <fieldset :class="{ ativo: !ocultarFielDadosEmitente }">
        <legend @click="ocultarFielsetDadosEmitente()">
        <h3>Dados do Emitente</h3>
        <hr>
        <span :class="{ ativo: !ocultarFielDadosEmitente }">
            <a>
            <font-awesome-icon :icon="['fas', 'caret-up']"/>
            </a>
        </span>
        </legend>
        <div v-if="!ocultarFielDadosEmitente">
        <div class="dados">
            <div class="campo">
            <label for="xFantEmit">Razão Social</label>
            <input type="text" name="xFantEmit" :value="xNomeEmit" disabled>
            </div>
            <div class="campo">
            <label for="xFantEmit">Fantasia</label>
            <input type="text" name="xFantEmit" :value="xFantEmit" disabled>
            </div>
        </div>
        <div class="dados">
            <div class="campo">
            <label for="cnpjemit">CNPJ</label>
            <input type="text" name="cnpjemit" :value="CNPJEmit" disabled>
            </div>
            <div class="campo">
            <label for="cnpjemit">I.E.</label>
            <input type="text" name="cnpjemit" :value="ieEmit" disabled>
            </div>
        </div>
        </div>
    </fieldset>
  </template>
  
  <script>
  export default {
    name: "DadosEmitente",
    props: {
      xNomeEmit: String,
      xFantEmit: String,
      CNPJEmit: String,
      ieEmit: String,
    },
    data() {
      return {
        ocultarFielDadosEmitente: false
      }
    },
    methods: {
      ocultarFielsetDadosEmitente() {
        this.ocultarFielDadosEmitente = !this.ocultarFielDadosEmitente
      }
    }
  };
  </script>
  <style scoped>
  </style>