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
    <div v-if="!dataLoaded" class="alert alert-red">Nenhuma Nota Fiscal Eletrônica (NF-e) selecionada.</div>
    <div v-else>
      <div class="alert alert-green">Nota Fiscal Eletrônica (NF-e) selecionada com sucesso.</div>
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
          <Produtos :produto="produto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportarXML from './ImportarXML.vue'
import DadosNota from './DadosNota.vue'
import DadosEmitente from './DadosEmitente.vue'
import DadosDestinatario from './DadosDestinatario.vue'
import Produtos from './Produtos.vue'

export default {
  name: 'NotaFiscalDevolucao',
  props: {
    dados: {
      type: Object,
      required: false // Pode ser true se sempre precisar dos dados
    },
  },
  components: {
    ImportarXML,
    DadosNota,
    DadosEmitente,
    DadosDestinatario,
    Produtos
  },
  data() {
    return {
      produto: [],
      dadosNF: {},
      dadosEmitente: {},
      dadosDestinatario: {},
      dataLoaded: false,
      tabs: ['Dados da Nota Fiscal', 'Dados do Emitente', 'Dados do Destinatário', 'Produtos'],
      activeTab: 0,
    };
  },
  methods: {
    handleDataLoaded({ produto, dadosNF, dadosEmitente, dadosDestinatario }) {
      console.log(produto); // Verifique a estrutura aqui
      this.produto = produto;
      this.dadosNF = dadosNF;
      this.dadosEmitente = dadosEmitente;
      this.dadosDestinatario = dadosDestinatario;
      this.dataLoaded = true;
    },
    goToNotaFiscal() {
      this.$router.push({ name: 'NotaFiscal' }); // Redireciona para a rota 'NotaFiscal'
    }
  },
  created() {
    if (this.dados) {
      this.handleDataLoaded(this.dados);
    }
  }
};
</script>

<style scoped>
.notafiscal-list .header {
  display: flex;
  justify-content: space-between;
  padding: .5rem 2rem;
  gap: 3rem;
}

.notafiscal-list .header .botao {
  display: flex;
  gap: 1rem;
}

.notafiscal-list .header button {
  font-size: 3rem;
  cursor: pointer;
}

.notafiscal-list .header .botao .btn {
  border-color: var(--black);
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
}

.notafiscal-list .header .botao .btn:hover {
  background-color: #0056b3;
}

.alert {
  padding: 1.5rem;
  border-radius: .5rem;
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

.tabs {
  display: flex;
  height: 6rem;
  /* padding: 0 1rem; */
}

.tabs button {
  flex: 1;
  padding: 1rem;
  background-color: #d4d4d4;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-size: 2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
  margin: 0 .1rem;
  margin-top: .5rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.tabs button.active {
  box-shadow: 0 .1rem .5rem #000;
  background-color: rgb(255, 241, 241);
  font-weight: bold;
}

.tabs button.active:hover {
  background-color: rgb(255, 241, 241);
}
.tabs button:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .tabs {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .tabs button {
    box-shadow: 0 .1rem .5rem #000;
    margin: .5rem 0;
    border-radius: 1rem;
  }
}
</style>
