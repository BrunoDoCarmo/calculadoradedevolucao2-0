<template>
  <div>
    <!-- Componente de importação de XML -->
    <ImportarXML @nota-importada="adicionarNota" />
    <p>Quantidade Nota Fiscal {{ totalNota }}</p>
    <Abas :abas="tabs" v-model:activeTab="activeTab"/>
    <div v-if="activeTab === 1">
      <ProdutosNota :notas="notas"/>
    </div>
  </div>
</template>

<script>
import ImportarXML from './ImportarXML.vue';
import Abas from './Abas.vue';
import ProdutosNota from './ProdutosNota.vue';

export default {
  name: 'NotaFiscalDevolucao',
  components: {
    ImportarXML,
    Abas,
    ProdutosNota,
  },
  data() {
    return {
      activeTab: 0, // Inicia com a primeira aba ativa
      tabs: [
        'Dados Emitente',
        'Produto Nota',
      ],
      notas:[],
      totalNota: 0
    };
  },
  mounted() {
    // Carrega as notas fiscais do localStorage quando o componente é montado
    this.carregarNotasLocalStorage();
    this.recalcularTotalNota();
  },
  methods: {
    adicionarNota(novaNota) {
      this.notas.push(novaNota);
      this.salvarNotasLocalStorage();
      this.recalcularTotalNota();
      // Se não houver aba ativa, ativa a primeira aba (primeira nota)
      if (this.activeTab === null || this.activeTab === undefined) {
        this.activeTab = 0;
      }
    },
    carregarNotasLocalStorage() {
      const notasArmazenadas = JSON.parse(localStorage.getItem("notasFiscais")) || [];
      this.notas = notasArmazenadas;
      if (notasArmazenadas.length) {
        this.activeTab = 0;
      }
    },
    salvarNotasLocalStorage() {
      localStorage.setItem("notasFiscais", JSON.stringify(this.notas));
    },
    recalcularTotalNota() {
      this.totalNota = this.notas.length;
      console.log(this.totalNota)
    },
  },
};
</script>

<style scoped>
</style>
