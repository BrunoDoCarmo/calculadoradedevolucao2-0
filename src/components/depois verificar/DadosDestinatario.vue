<template>
  <div class="dados">
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
    <div class="linha-campo">
      <div class="campo">
        <label for="cMun">IBGE</label>
        <input type="text" id="cMun" name="cMun" :value="dadosDestinatario.cMun" disabled />
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
  name: "DadosDestinatario",
  props: {
    dadosDestinatario: {
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


