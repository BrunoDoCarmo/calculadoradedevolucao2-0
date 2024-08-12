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
import DadosDestinatario from "./DadosDestinatario.vue";
import NotasReferenciadas from "./NotasReferenciadas.vue";
import ProdutosNota from "./ProdutosNota.vue";
import ProdutosSelecionados from "./ProdutosSelecionados.vue";
import Abas from "./Abas.vue";
import Modal from "./Modal.vue";

export default {
  name: "NotaFiscalDevolucao",
  props: {
    dados: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ImportarXML,
    DadosEmitente,
    DadosDestinatario,
    NotasReferenciadas,
    ProdutosNota,
    ProdutosSelecionados,
    Abas,
    Modal,
  },
  data() {
    return {
      showModal: false, // Controla a exibição do modal
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
      notasFiscais: []
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
  methods: {
    handleDataLoaded(data) {
      this.produtosNota = [...this.produtosNota, ...data.produtosNota];
      this.dadosEmitente = data.dadosEmitente;
      this.dadosDestinatario = data.dadosDestinatario;

      // Garantir que notasReferenciadas é um array
      this.notasReferenciadas = Array.isArray(data.notasReferenciadas)
        ? data.notasReferenciadas
        : [data.notasReferenciadas];

      this.notasFiscais = this.notasReferenciadas.map(nota => ({
        id: this.notasFiscais.length + 1,
        numero: nota.nNF,
        chaveAcesso: nota.chNFe,
        data: nota.dhEmi,
      }));
    },
    goToNotaFiscal() {
      this.$router.push({ name: "NotaFiscal" });
    },
    clearData() {
      // Limpa todos os dados da nota fiscal
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
