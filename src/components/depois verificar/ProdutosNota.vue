<template>
  <div>
    <h2>Produtos</h2>
    <Abas
      :abas="[notasReferenciadas.nNF]"
      v-model:activeTab="activeTab"
      @tab-click="onTabClick"
    />
    <table>
      <thead>
        <tr>
          <th>Ação</th>
          <th>Cod. Prod.</th>
          <th>Nome Produto</th>
          <th>QTD</th>
          <th>VLR Unit.</th>
          <th>VLR Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in produtosNota" :key="index">
          <td><input type="checkbox" /></td>
          <td>{{ product.cProd }}</td>
          <td>{{ product.xProd }}</td>
          <td>{{ product.qCom }}</td>
          <td>{{ product.vUnCom }}</td>
          <td>{{ product.vlrTotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Abas from "./Abas.vue";

export default {
  name: "ProdutosNota",
  components: {
    Abas,
  },
  props: {
    produtosNota: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: this.notasReferenciadas.nNF || 0,
    };
  },
  methods: {
    onTabClick(tabs) {
      this.activeTab = tabs;
    },
  },
};
</script>

<style scoped></style>
