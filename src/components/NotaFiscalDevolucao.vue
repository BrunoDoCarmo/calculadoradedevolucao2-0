<template>
  <div>
    <!-- Componente de importação de XML -->
    <ImportarXML @nota-importada="adicionarNota" />
    <p>Quantidade Nota Fiscal {{ totalNota }}</p>
    <Abas :abas="tabs" v-model:activeTab="activeTab" />
    <div v-if="activeTab === 1">
      <ProdutosNota :notas="notas" @update:selectedProducts="handleSelectedProducts" />
    </div>
    <div v-if="activeTab === 2">
      <ProdutosSelecionados :produtos="produtosSelecionados" />
    </div>
  </div>
</template>
<script>
import ImportarXML from './ImportarXML.vue';
import Abas from './Abas.vue';
import ProdutosNota from './ProdutosNota.vue';
import ProdutosSelecionados from './ProdutosSelecionados.vue';
export default {
  name: 'NotaFiscalDevolucao',
  components: {
    ImportarXML,
    Abas,
    ProdutosNota,
    ProdutosSelecionados,
  },
  data() {
    return {
      activeTab: 0, // Inicia com a primeira aba ativa
      tabs: [
        'Dados Emitente',
        'Produtos Nota',
        'Produtos Selecionados',
      ],
      notas: [],
      produtosSelecionados: [],
      totalNota: 0,
    };
  },
  mounted() {
    // Carrega as notas fiscais do localStorage quando o componente é montado
    this.carregarNotasLocalStorage();
    this.produtosSelecionados = this.getProdutosSelecionados();
    this.recalcularTotalNota();
  },
  methods: {
    handleSelectedProducts(selectedProducts) {
      this.produtosSelecionados = selectedProducts;
      this.salvarProdutosSelecionados(selectedProducts);
    },
    adicionarNota(novaNota) {
      this.notas.push(novaNota);
      this.salvarNotasLocalStorage();
      this.recalcularTotalNota();
    },
    carregarNotasLocalStorage() {
      const notasArmazenadas = JSON.parse(localStorage.getItem('notasFiscais')) || [];
      this.notas = notasArmazenadas;
    },
    salvarNotasLocalStorage() {
      localStorage.setItem('notasFiscais', JSON.stringify(this.notas));
    },
    getProdutosSelecionados() {
      const produtosNoStorage = localStorage.getItem('produtosSelecionados');
      if (produtosNoStorage) {
        try {
          return JSON.parse(produtosNoStorage);
        } catch (e) {
          console.error('Erro ao analisar JSON do localStorage:', e);
          return []; // Retorna um array vazio se houver um erro
        }
      } else {
        return []; // Retorna um array vazio se não houver dados
      }
    },
    salvarProdutosSelecionados(produtos) {
      localStorage.setItem('produtosSelecionados', JSON.stringify(produtos));
    },
    recalcularTotalNota() {
      this.totalNota = this.notas.length;
    },
  },
};
</script>
<style scoped>
</style>
