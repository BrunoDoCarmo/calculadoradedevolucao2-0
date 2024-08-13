<template>
  <div>
    <!-- Componente de importação de XML -->
    <ImportarXML @nota-importada="adicionarNota" />

    <!-- Componente de abas que mostra as notas -->
    <Abas
      :abas="tabs"
      v-model:activeTab="activeTab"
    />

    <div class="teste">
      <!-- Mostra os produtos da nota fiscal ativa -->
      <div v-if="notas.length">
        <div v-for="(nota, index) in notas" :key="index" v-show="activeTab === index">
          <table>
            <thead>
              <tr>
                <th>Cod. Prod.</th>
                <th>Nome Produto</th>
                <th>QTD</th>
                <th>VLR Unit.</th>
                <th>VLR Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(produto, prodIndex) in nota.produtos" :key="prodIndex">
                <td>{{ produto.cProd }}</td>
                <td>{{ produto.xProd }}</td>
                <td>{{ produto.qCom }}</td>
                <td>{{ produto.vUnCom }}</td>
                <td>{{ produto.vlrTotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportarXML from './ImportarXML.vue';
import Abas from './Abas.vue';

export default {
  components: {
    ImportarXML,
    Abas,
  },
  data() {
    return {
      notas: [],
      activeTab: 0, // Inicia com a primeira aba ativa
    };
  },
  computed: {
    tabs() {
      return this.notas.map(nota => nota.nNF);
    }
  },
  mounted() {
    // Carrega as notas fiscais do localStorage quando o componente é montado
    this.carregarNotasLocalStorage();
  },
  methods: {
    adicionarNota(novaNota) {
      this.notas.push(novaNota);
      this.salvarNotasLocalStorage();
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
  },
};
</script>

<style scoped>
.teste {
  width: 100%;
  overflow-y: scroll;
  height: calc(100vh - 13rem);
}
</style>
