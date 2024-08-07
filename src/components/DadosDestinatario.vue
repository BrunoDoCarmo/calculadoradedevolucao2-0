<template>
  <fieldset :class="{ ativo: !ocultarFielDadosDestinatario }">
    <legend>
      <h3>Dados do Destinatário</h3>
      <hr>
      <span :class="{ ativo: !ocultarFielDadosDestinatario }">
          <a @click="ocultarFielsetDadosDestinatario()">
          <font-awesome-icon :icon="['fas', 'caret-up']"/>
          </a>
      </span>
    </legend>
    <div v-if="!ocultarFielDadosDestinatario" class="dados">
      <div class="linha-campo">
        <div class="campo">
          <label for="destCNPJ">CNPJ</label>
          <input type="text" id="destCNPJ" name="destCNPJ" :value="dadosDestinatario.CNPJ" disabled />
        </div>
        <div class="campo">
          <label for="destIE">Inscrição Estadual</label>
          <input type="text" id="destIE" name="destIE" :value="dadosDestinatario.IE" disabled />
        </div>
        <div class="campo">
          <label for="destxNome">Nome</label>
          <input type="text" id="destxNome" name="destxNome" :value="dadosDestinatario.xNome" disabled />
        </div>
        <div class="campo">
          <label for="destxLgr">Logradouro</label>
          <input type="text" id="destxLgr" name="destxLgr" :value="dadosDestinatario.xLgr" disabled />
        </div>
        <div class="campo">
          <label for="destnro">Número</label>
          <input type="text" id="destnro" name="destnro" :value="dadosDestinatario.nro" disabled />
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name: "DadosDestinatario",
  props: {
    dadosDestinatario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ocultarFielDadosDestinatario: false
    }
  },
  methods: {
    ocultarFielsetDadosDestinatario() {
      this.ocultarFielDadosDestinatario = !this.ocultarFielDadosDestinatario
    }
  }
};
</script>
<style scoped></style>


