<template>
  <div class="notafiscal-list">
    <div class="header">
      <button @click="goToNotaFiscal">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <div class="botao">
        <ImportarXML @nota-importada="atualizarEmitente" @limpar-notas="clearData" />
        <a class="btn btn-remove" @click="clearData">Limpar Nota</a>
        <a href="" class="btn">Buscar no banco de dados</a>
      </div>
    </div>
    <p>Quantidade de Notas Fiscais Importadas: {{ totalNotas }}</p>
    <Abas :abas="tabs" v-model:activeTab="activeTab" />
    <div class="container-field">
      <component
        ref="activeComponentRef"
        :is="activeComponent"
        :dadosEmitente="dadosEmitente"
        :dadosDestinatario="dadosDestinatario"
        :notasReferenciadas="notasReferenciadas"
        :produtosNota="produtosNota"
      />
    </div>
  </div>
</template>

<script>
import ImportarXML from "./ImportarXML.vue";
import DadosEmitente from "./DadosEmitente.vue";
// import DadosDestinatario from "./DadosDestinatario.vue";
// import NotasReferenciadas from "./NotasReferenciadas.vue";
import ProdutosNota from "./ProdutosNota.vue";
// import ProdutosSelecionados from "./ProdutosSelecionados.vue";
import Abas from "./Abas.vue";
import Modal from "./Modal.vue";

export default {
  name: "NotaFiscalDevolucao",
  components: {
    ImportarXML,
    DadosEmitente,
    // DadosDestinatario,
    // NotasReferenciadas,
    ProdutosNota,
    // ProdutosSelecionados,
    Abas,
    Modal,
  },
  data() {
    return {
      showModal: false,
      selectedNota: null,
      produtosNota: [],
      dadosEmitente: {},
      dadosDestinatario: {},
      notasReferenciadas: {},
      tabs: [
        "Dados do Emitente",
        "Dados do Destinatário",
        "Notas Referenciadas",
        "Produtos da Nota",
        "Produtos Selecionados",
      ],
      activeTab: 0,
      notas: [],
      totalNotas: 0
    };
  },
  computed: {
    activeComponent() {
      const components = [
        "DadosEmitente",
        "DadosDestinatario",
        "NotasReferenciadas",
        "ProdutosNota",
        "ProdutosSelecionados",
      ];
      return components[this.activeTab];
    },
  },
  mounted() {
    this.carregarNotasLocalStorage();
  },
  methods: {
    atualizarEmitente(notaFiscal) {
      this.dadosEmitente = notaFiscal.emitente;
      this.produtosNota = notaFiscal.produtos; // Atualiza a lista de produtos também
      this.recalcularTotalNotas();
    },
    recalcularTotalNotas() {
      this.totalNotas = this.notas.length;
    },
    goToNotaFiscal() {
      this.$router.push({ name: "NotaFiscal" });
    },
    clearData() {
      this.dadosEmitente = {};
      this.dadosDestinatario = {};
      this.notasReferenciadas = {};
      this.produtosNota = [];
      const activeComponentRef = this.$refs.activeComponentRef;
      if (
        activeComponentRef &&
        typeof activeComponentRef.limparMunicipioUF === "function"
      ) {
        activeComponentRef.limparMunicipioUF();
      }
    },
    carregarNotasLocalStorage() {
      const notasFiscais = JSON.parse(localStorage.getItem("notasFiscais")) || [];
      this.notas = notasFiscais;
      this.recalcularTotalNotas();
      if (notasFiscais.length) {
        this.activeTab = 0;
      }
    },
  },
};
</script>

<style scoped>
.notafiscal-list .header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
}
.notafiscal-list .header {
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
