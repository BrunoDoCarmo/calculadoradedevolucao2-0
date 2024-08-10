<template>
  <div class="notafiscal-list">
    <div class="header">
      <button @click="goToNotaFiscal">
        <font-awesome-icon class="icon" :icon="['fas', 'chevron-left']" />
      </button>
      <div class="botao">
        <ImportarXML @data-loaded="handleDataLoaded" />
        <a class="btn btn-remove" @click="openModal">Limpar Nota</a>
        <a href="" class="btn">Buscar no banco de dados</a>
      </div>
    </div>
    <Abas :abas="tabs" v-model:activeTab="activeTab" />
    <div class="container-field">
      <component
        ref="activeComponentRef"
        :is="activeComponent"
        :dadosNF="dadosNF"
        :dadosEmitente="dadosEmitente"
        :dadosDestinatario="dadosDestinatario"
        :produto="produto"
      />
    </div>
  </div>
  <Modal
    v-if="showModal"
    :visible="showModal"
    title="Selecione a Nota Fiscal para deletar"
    @close="closeModal"
  >
    <table>
      <thead>
        <tr>
          <th>Ação</th>
          <th>Número N.F.</th>
          <th>Chave de Acesso</th>
          <th>Data Emissão</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nota, index) in notasFiscais" :key="index">
          <td>
            <button @click="confirmDelete(nota.id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
          <td>{{ nota.numero }}</td>
          <td>{{ nota.chaveAcesso }}</td>
          <td>{{ nota.data }}</td>
        </tr>
      </tbody>
    </table>
    <div class="modal-actions">
      <button @click="closeModal">Cancelar</button>
    </div>
  </Modal>
</template>

<script>
import ImportarXML from "./ImportarXML.vue";
import DadosNota from "./DadosNota.vue";
import DadosEmitente from "./DadosEmitente.vue";
import DadosDestinatario from "./DadosDestinatario.vue";
import Abas from "./Abas.vue";
import ProdutosNota from "./ProdutosNota.vue";
import ProdutosSelecionados from "./ProdutosSelecionados.vue";
import Modal from "./Modal.vue";

export default {
  name: "NotaFiscalDevolucao",
  props: {
    notas: Array,
    dados: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ImportarXML,
    DadosNota,
    DadosEmitente,
    DadosDestinatario,
    Abas,
    ProdutosNota,
    ProdutosSelecionados,
    Modal,
  },
  data() {
    return {
      showModal: false, // Controla a exibição do modal
      selectedNota: null,
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
      notasFiscais: [],
    };
  },
  computed: {
    activeComponent() {
      const components = [
        "DadosNota",
        "DadosEmitente",
        "DadosDestinatario",
        "ProdutosNota",
        "ProdutosSelecionados",
      ];
      return components[this.activeTab];
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    confirmDelete(notaId) {
      // Remove the selected nota from the list
      this.notasFiscais = this.notasFiscais.filter(nota => nota.id !== notaId);
      // Clear data after deletion
      this.clearData();
      this.closeModal();
    },
    handleDataLoaded(data) {
      this.produto = data.produto;
      this.dadosNF = data.dadosNF;
      this.dadosEmitente = data.dadosEmitente;
      this.dadosDestinatario = data.dadosDestinatario;

      this.notasFiscais.push ({
        id: this.notasFiscais.length + 1,
        numero: data.dadosNF.nNF,
        chaveAcesso: data.dadosNF.chNFe,
        data: data.dadosNF.dhEmit
      })
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
