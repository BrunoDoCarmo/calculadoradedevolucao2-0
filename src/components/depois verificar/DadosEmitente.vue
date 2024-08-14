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
    <div class="linha-campo">
      <div class="campo">
        <label for="cMun">IBGE</label>
        <input type="text" id="cMun" name="cMun" :value="dadosEmitente.cMun" disabled />
      </div>
      <div class="campo">
        <label for="municipio">Município</label>
        <input type="text" id="municipio" name="municipio" :value="municipio" disabled />
      </div>
      <div class="campo">
        <label for="uf">UF</label>
        <input type="text" id="uf" name="uf" :value="uf" disabled />
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
  data() {
    return {
      municipio: "",
      uf: "",
    };
  },
  watch: {
    "dadosEmitente.cMun": {
      handler(newVal) {
        if (newVal) {
          this.buscarMunicipio(newVal);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async buscarMunicipio(cMun) {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cMun}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar município");
        }
        const data = await response.json();
        this.municipio = data.nome;
        this.uf = data.microrregiao.mesorregiao.UF.sigla;
      } catch (error) {
        console.error("Erro ao buscar dados do município:", error);
      }
    },
    limparMunicipioUF() {
      this.municipio = "";
      this.uf = "";
    },
  },
};
</script>
<style scoped></style>


