<template>
    <div class="notafiscal-list">
      <ImportarXML class="teste" @data-loaded="handleDataLoaded" />
      <div v-if="!dataLoaded" class="alert alert-red">Nenhuma Nota Fiscal Eletrónica (NF-e) importada.</div>
      <div v-else>
      <div class="alert alert-green">Nota Fiscal Eletrónica (NF-e) importada com sucesso.</div>
      <!-- Abas -->
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>
      <div class="container-field">
        <!-- Conteúdo das Abas -->
        <div v-if="activeTab === 0">
          <DadosNota
            :chNFe="chNFe"
            :nNF="nNF"
            :dhEmi="dhEmi"
          />
        </div>
        <div v-if="activeTab === 1">
          <DadosEmitente
            :xNomeEmit="xNomeEmit"
            :xFantEmit="xFantEmit"
            :CNPJEmit="CNPJEmit"
            :ieEmit="ieEmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ImportarXML from './ImportarXML.vue'
import DadosNota from './DadosNota.vue'
import DadosEmitente from './DadosEmitente.vue'
export default {
    name: 'NotaFiscalDevolucao',
    components: {
        ImportarXML,
        DadosNota,
        DadosEmitente
    },
    data() {
        return {
        products: [],
        chNFe: '',
        nNF: '',
        dhEmi: '',
        xNomeEmit: '',
        CNPJEmit: '',
        xNomeDest: '',
        CNPJDest: '',
        dataLoaded: false,
        tabs: ['Dados da Nota Fiscal', 'Dados do Emitente'],
        activeTab: 0,
        };
    },
    methods: {
        handleDataLoaded({ products, chNFe, nNF, dhEmi, 
        xNomeEmit, xFantEmit, CNPJEmit, ieEmit,
        xNomeDest, CNPJDest }) {
        this.products = products;
        this.nNF = nNF;
        this.chNFe = chNFe;
        this.dhEmi = dhEmi;
        // DADOS DO EMITENTE
        this.xNomeEmit = xNomeEmit;
        this.xFantEmit = xFantEmit;
        this.CNPJEmit = CNPJEmit;
        this.ieEmit = ieEmit;
        // DADOS DO DESTINATARIO
        this.xNomeDest = xNomeDest;
        this.CNPJDest = CNPJDest;
        this.dataLoaded = true;
        },
    }
};
</script>
<style scoped>
.teste {
  padding: 1rem 0;
}

.alert {
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
}

.alert-red {
    background-color: #f8d7da;
    color: #721c24;
}

.alert-green {
    background-color: #d4edda;
    color: #155724;
}

/* Estilo das Abas */
.tabs {
  display: flex;
  height: 6rem;
  margin-top: 1rem;
}

.tabs button {
  flex: 1;
  padding: 1rem;
  background-color: #ccc;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
  margin: 0 .25rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.tabs button.active:hover {
  background-color: rgb(255, 241, 241);
}

.tabs button.active {
  box-shadow: 0 -0.5px 5px #000;
  background-color: rgb(255, 241, 241);
  font-weight: bold;
}

.tabs button:hover {
  background-color: #d4d4d4;
}
</style>
