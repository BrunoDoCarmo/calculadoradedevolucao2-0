<template>
  <fieldset :class="{ ativo: !ocultarFielDadosNF }">
    <legend>
      <h3>Dados da Nota Fiscal</h3>
      <hr />
      <span :class="{ ativo: !ocultarFielDadosNF }">
        <a @click="ocultarFielsetDadosNF()">
          <font-awesome-icon :icon="['fas', 'caret-up']" />
        </a>
      </span>
    </legend>
    <div v-if="!ocultarFielDadosNF" class="dados">
      <div class="linha-campo">
        <div class="campo">
          <label for="mod">Modelo</label>
          <input type="text" id="mod" name="mod" :value="dadosNF.mod" disabled />
        </div>
        <div class="campo">
          <label for="serie">Serie</label>
          <input type="text" id="serie" name="serie" :value="dadosNF.serie" disabled />
        </div>
        <div class="campo">
          <label for="nNF">Numero</label>
          <input type="text" id="nNF" name="nNF" :value="dadosNF.nNF" disabled />
        </div>
        <div class="campo">
          <label for="dhEmit">Data de Emissão</label>
          <input type="text" id="dhEmit" name="dhEmit" :value="dadosNF.dhEmi" disabled />
        </div>
      </div>
      <div class="linha-campo">
        <div class="campo">
          <label for="cMunFG">IBGE</label>
          <input type="text" id="cMunFG" name="cMunFG" :value="dadosNF.cMunFG" disabled />
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
      <div class="linha-campo">
        <div class="campo">
          <label for="tpNF">Tipo NF</label>
          <input type="text" id="tpNF" name="tpNF" :value="dadosNF.tpNFTexto" disabled />
        </div>
        <div class="campo">
          <label for="chNFe">Chave NF-e</label>
          <input type="text" id="chNFe" name="chNFe" :value="dadosNF.chNFe" disabled />
        </div>
        <div class="campo">
          <label for="idDest">ID Destino</label>
          <input type="text" id="idDest" name="idDest" :value="dadosNF.idDestTexto" disabled />
        </div>
      </div>
      <div class="linha-campo">
        <div class="campo">
          <label for="tpImp">Tipo Impressão</label>
          <input type="text" id="tpImp" name="tpImp" :value="dadosNF.tpImpTexto" disabled />
        </div>
        <div class="campo">
          <label for="tpEmis">Tipo Emissão</label>
          <input type="text" id="tpEmis" name="tpEmis" :value="dadosNF.tpEmisTexto" disabled />
        </div>
        <div class="campo">
          <label for="tpAmb">Tipo Ambiente</label>
          <input type="text" id="tpAmb" name="tpAmb" :value="dadosNF.tpAmbTexto" disabled />
        </div>
        <div class="campo">
          <label for="indFinal">Finalidade NFe</label>
          <input type="text" id="indFinal" name="indFinal" :value="dadosNF.finNFeTexto" disabled />
        </div>
        <div class="campo">
          <label for="indFinal">Indicador de Operação com Consumidor Final</label>
          <input type="text" id="indFinal" name="indFinal" :value="dadosNF.indFinalTexto" disabled />
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name: "ProductTest",
  props: {
    dadosNF: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ocultarFielDadosNF: false,
      municipio: "",
      uf: "",
    };
  },
  watch: {
    "dadosNF.cMunFG": {
      handler(newVal) {
        if (newVal) {
          this.buscarMunicipio(newVal);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async buscarMunicipio(cMunFG) {
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cMunFG}`
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
    ocultarFielsetDadosNF() {
      this.ocultarFielDadosNF = !this.ocultarFielDadosNF;
    },
  },
};
</script>
<style scoped></style>
