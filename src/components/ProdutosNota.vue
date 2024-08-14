<template>
  <div>
    <!-- Componente de abas que mostra as notas -->
    <Abas
      :abas="tabs"
      v-model:activeTab="activeTab"
    />

    <!-- Mostra os produtos da nota fiscal ativa -->
    <div v-if="notas.length">
      <div v-for="(nota, index) in notas" :key="index" v-show="activeTab === index">
        <div class="table-container">
          <table class="produtos-tabela">
            <thead>
              <tr>
                <th>Cod. Prod.</th>
                <th>Nome Produto</th>
                <th>QTD</th>
                <th>VLR Unit.</th>
                <th>VLR Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(produto, prodIndex) in nota.produtos" 
                :key="prodIndex" 
                :class="{ 'linha-marcada': produto.selecionado }"
              >
                <td>{{ produto.cProd }}</td>
                <td>{{ produto.xProd }}</td>
                <td>{{ produto.qCom }}</td>
                <td>{{ produto.vUnCom }}</td>
                <td>{{ produto.vlrTotal }}</td>
                <td>
                  <input 
                    type="checkbox" 
                    v-model="produto.selecionado"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nenhuma nota fiscal disponível.</p>
    </div>
  </div>
</template>

<script>
import Abas from './Abas.vue';

export default {
  name: 'ProdutosNota',
  components: {
    Abas,
  },
  props: {
    notas: {
      type:Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0, // Inicia com a primeira aba ativa
    };
  },
  computed: {
    tabs() {
      return this.notas.map(nota => `Nota Fiscal ${nota.nNF}`);
    }
  },
};
</script>

<style scoped>
.table-container {
  height: calc(100vh - 20rem);
  overflow-y: auto;
}
.table-container th:nth-child(1),
.table-container td:nth-child(1) {
  width: 12%;
}
.table-container th:nth-child(3),
.table-container td:nth-child(3),
.table-container th:nth-child(6),
.table-container td:nth-child(6) {
  width: 8%;
}
.table-container th:nth-child(4),
.table-container td:nth-child(4),
.table-container th:nth-child(5),
.table-container td:nth-child(5) {
  width: 10%;
}

.table-container td:nth-child(2) {
  text-align: left;
  padding-left: .5rem;
}

input[type="checkbox"] {
  appearance: none; /* Remove o estilo padrão */
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  margin-top: .25rem;
}


/* Estilo do "checkmark" quando o checkbox está marcado */
input[type="checkbox"]:checked::before {
  content: "✓"; /* Símbolo de checkmark */
  color: var(--green1);
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centraliza o checkmark */
  font-weight: bold;
}

/* Estilo adicional para hover */
input[type="checkbox"]:hover {
  border-color: #999; /* Cor da borda ao passar o mouse */
}

/* Estilo para a linha marcada */
.linha-marcada {
  background-color: var(--green3); /* Cor de fundo para a linha marcada */
}
</style>
