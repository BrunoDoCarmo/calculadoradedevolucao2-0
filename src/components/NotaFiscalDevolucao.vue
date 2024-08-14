<template>
  <div>
    <!-- Componente de importação de XML -->
    <ImportarXML @nota-importada="adicionarNota" />
    <Abas :abas="tabs" v-model:activeTab="activeTab"/>
    <div v-if="activeTab === 1">
      <ProdutosNota :produtos="produtos"/>
    </div>
  </div>
</template>

<script>
import ImportarXML from './ImportarXML.vue';
import Abas from './Abas.vue';
import ProdutosNota from './ProdutosNota.vue';

export default {
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
      ]
    };
  },
};
</script>

<style scoped>
</style>
