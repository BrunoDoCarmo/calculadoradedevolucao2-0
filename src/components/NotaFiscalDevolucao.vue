<template>
  <div class="notafiscal-list">
    <div class="header">
      <button @click="goToNotaFiscal">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <div class="botao">
        <ImportarXML @data-loaded="handleDataLoaded" />
        <a href="" class="btn">Buscar no banco de dados</a>
      </div>
    </div>
    <div v-if="!dataLoaded" class="alert alert-red">
      Nenhuma Nota Fiscal Eletrônica (NF-e) selecionada.
    </div>
    <div v-else>
      <div class="alert alert-green">
        Nota Fiscal Eletrônica (NF-e) selecionada com sucesso.
      </div>
      <Abas :abas="tabs" v-model:activeTab="activeTab" />
      <div class="container-field">
        <div v-if="activeTab === 0">
          <DadosNota :dadosNF="dadosNF" />
        </div>
        <div v-if="activeTab === 1">
          <DadosEmitente :dadosEmitente="dadosEmitente" />
        </div>
        <div v-if="activeTab === 2">
          <DadosDestinatario :dadosDestinatario="dadosDestinatario" />
        </div>
        <div v-if="activeTab === 3">
          <ProdutosNota :produto="produto" />
        </div>
        <div v-if="activeTab === 4">
          <ProdutosSelecionados :produto="produto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportarXML from "./ImportarXML.vue";
import DadosNota from "./DadosNota.vue";
import DadosEmitente from "./DadosEmitente.vue";
import DadosDestinatario from "./DadosDestinatario.vue";
import Abas from "./Abas.vue";
import ProdutosNota from "./ProdutosNota.vue";
import ProdutosSelecionados from "./ProdutosSelecionados.vue";

export default {
  name: "NotaFiscalDevolucao",
  components: {
    ImportarXML,
    DadosNota,
    DadosEmitente,
    DadosDestinatario,
    Abas,
    ProdutosNota,
    ProdutosSelecionados,
  },
  data() {
    return {
      produto: [],
      dadosNF: {},
      dadosEmitente: {},
      dadosDestinatario: {},
      dataLoaded: false,
      tabs: [
        "Dados da Nota Fiscal",
        "Dados do Emitente",
        "Dados do Destinatário",
        "Produtos da Nota",
        "Produtos Selecionados",
      ],
      activeTab: 0,
    };
  },
  methods: {
    handleDataLoaded({ produto, dadosNF, dadosEmitente, dadosDestinatario }) {
      this.produto = produto;
      this.dadosNF = dadosNF;
      this.dadosEmitente = dadosEmitente;
      this.dadosDestinatario = dadosDestinatario;
      this.dataLoaded = true;
    },
    goToNotaFiscal() {
      this.$router.push({ name: "NotaFiscal" }); // Redireciona para a rota 'NotaFiscal'
    },
  },
  created() {
    if (this.dados) {
      this.handleDataLoaded(this.dados);
    }
  },
};
</script>

<style scoped>
.notafiscal-list .header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}

.notafiscal-list .header  {
  display: flex;
  gap: 1rem;
}

.notafiscal-list .header button {
  font-size: 3rem;
  cursor: pointer;
}

.notafiscal-list .header .botao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.notafiscal-list .header .botao .btn {
  border-color: var(--black);
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem 0.5rem;
}

.notafiscal-list .header .botao .btn:hover {
  background-color: #0056b3;
}

.alert {
  padding: 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
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
</style>
