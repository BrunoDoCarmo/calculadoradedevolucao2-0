<template>
  <div class="notafiscal-list">
    <div class="header">
      <button @click="goToNotaFiscal">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <div class="botao">
        <ImportarXML @data-loaded="handleDataLoaded" />
        <a class="btn btn-remove" @click="clearData">Limpar Nota</a>
        <a href="" class="btn">Buscar no banco de dados</a>
      </div>
    </div>
    <Abas :abas="tabs" v-model:activeTab="activeTab" />
    <div class="container-field">
      <DadosNota v-if="activeTab === 0" :dadosNF="dadosNF" />
      <DadosEmitente v-if="activeTab === 1" :dadosEmitente="dadosEmitente" />
      <DadosDestinatario v-if="activeTab === 2" :dadosDestinatario="dadosDestinatario" />
      <ProdutosNota v-if="activeTab === 3" :produto="produto" />
      <ProdutosSelecionados v-if="activeTab === 4" :produto="produto" />
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
    handleDataLoaded(data) {
      this.produto = data.produto;
      this.dadosNF = data.dadosNF;
      this.dadosEmitente = data.dadosEmitente;
      this.dadosDestinatario = data.dadosDestinatario;
    },
    goToNotaFiscal() {
      this.$router.push({ name: "NotaFiscal" });
    },
    clearData() {
      // Limpa todos os dados da nota fiscal
      this.dadosNF = {};  
      this.dadosEmitente = {};
      this.dadosDestinatario = {};
      this.produto = [];
      
      // Limpa os campos de município e UF dentro do componente DadosNota
      if (this.$refs.dadosNota) {
        this.$refs.dadosNota.limparMunicipioUF();
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para a NotaFiscalDevolucao.vue */
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

.notafiscal-list .header .botao .btn-remove {
  background-color: #dc3545;
}

.notafiscal-list .header .botao .btn-remove:hover {
  background-color: #c82333;
}
</style>
