<template>
  <fieldset :class="{ ativo: !ocultarFielDadosNF }">
    <legend @click="ocultarFielsetDadosNF()">
      <h3>Dados da Nota Fiscal</h3>
      <hr>
      <span :class="{ ativo: !ocultarFielDadosNF }">
        <a>
          <font-awesome-icon :icon="['fas', 'caret-up']"/>
        </a>
      </span>
    </legend>
    <div v-if="!ocultarFielDadosNF">
      <div class="dados">
        <div class="campo">
          <label for="xFantEmit">Nº Nota Fiscal</label>
          <input type="text" name="xFantEmit" :value="nNF" disabled>
        </div>
        <div class="campo">
          <label for="xFantEmit">Data de Emissão</label>
          <input type="text" name="xFantEmit" :value="dhEmi" disabled>
        </div>
        <div class="campo">
          <label for="xFantEmit">Chave NF-e</label>
          <input type="text" name="xFantEmit" :value="chNFe" disabled>
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name: "ProductTest",
  props: {
    chNFe: String,
    nNF: String,
    dhEmi: String
  },
  data() {
    return {
      ocultarFielDadosNF: false,
    }
  },
  methods: {
    ocultarFielsetDadosNF() {
      this.ocultarFielDadosNF = !this.ocultarFielDadosNF
    },
  }
};
</script>
<style scoped>
</style>