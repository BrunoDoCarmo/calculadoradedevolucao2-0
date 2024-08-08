<template>
  <div class="dados">
    <div class="linha-campo">
      <div class="campo">
        <label for="emitCNPJ">CNPJ</label>
        <input type="text" id="emitCNPJ" name="emitCNPJ" :value="dadosEmitente.CNPJ" disabled />
      </div>
      <div class="campo">
        <label for="emitIE">Inscrição Estadual</label>
        <input type="text" id="emitIE" name="emitIE" :value="dadosEmitente.IE" disabled />
      </div>
      <div class="campo">
        <label for="emitxNome">Nome</label>
        <input type="text" id="emitxNome" name="emitxNome" :value="dadosEmitente.xNome" disabled />
      </div>
      <div class="campo">
        <label for="emitxLgr">Logradouro</label>
        <input type="text" id="emitxLgr" name="emitxLgr" :value="dadosEmitente.xLgr" disabled />
      </div>
      <div class="campo">
        <label for="emitnro">Número</label>
        <input type="text" id="emitnro" name="emitnro" :value="dadosEmitente.nro" disabled />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DadosEmitente",
  props: {
    dadosEmitente: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped></style>


