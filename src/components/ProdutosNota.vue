<template>
  <div>
    <!-- Componente de abas que mostra as notas -->
    <Abas :abas="tabs" v-model:activeTab="activeTab" />

    <!-- Mostra os produtos da nota fiscal ativa -->
    <div v-if="notas.length">
      <div v-for="(nota, index) in notas" :key="index" v-show="activeTab === index">
        <Abas :abas="subtabs" v-model:activeTab="activeSubTab" />
        <div v-show="activeSubTab === 0">
          <div class="table-container">
            <table class="produtos-tabela">
              <thead>
                <tr>
                  <th>Cod. Prod.</th>
                  <th>Nome Produto</th>
                  <th>QTD</th>
                  <th>VLR Unit.</th>
                  <th>VLR Desc.</th>
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
                  <td>{{ produto.vDesc }}</td>
                  <td>{{ calcularValorTotal(produto) }}</td>
                  <td>
                    <input 
                      type="checkbox" 
                      v-model="produto.selecionado"
                      @change="emitSelectedProducts"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-show="activeSubTab === 1">
          <div class="table-container">
            <table class="imposto-tabela">
              <thead>
                <tr>
                  <th>BC ICMS</th>
                  <th>Alíquota ICMS</th>
                  <th>Valor ICMS</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(produto, prodIndex) in nota.produtos" 
                  :key="prodIndex" 
                  :class="{ 'linha-marcada': produto.selecionado }"
                >
                  <td>{{ calcularDesconto(produto) }}</td>
                  <td>{{ produto.pICMS }}</td>
                  <td>{{ produto.qCom }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0, // Inicia com a primeira aba ativa
      activeSubTab: 0, // Inicia com a primeira aba ativa
      subtabs: [
          'Produtos',
          'Imposto'
      ],
    };
  },
  computed: {
    tabs() {
      return this.notas.map(nota => `Nota Fiscal ${nota.nNF}`);
    },
  },
  mounted() {
    this.carregarSelecaoLocalStorage();
  },
  methods: {
    calcularValorTotal(produto) {
      const valorUnitario = parseFloat(produto.vUnCom.replace(/[^\d,.-]/g, '').replace(",", "."));
      const quantidade = parseFloat(produto.qCom);
      if (!isNaN(quantidade) && !isNaN(valorUnitario) && quantidade >= 0) {
        return (quantidade * valorUnitario).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      } else {
        return "0.00";
      }
    },
    calcularDesconto(produto) {
      const valorTotal = this.calcularValorTotal(produto);
      const valorDesconto = parseFloat(produto.vDesc.replace(/[^\d,.-]/g, '').replace(",", "."));
      const valorComDesconto = valorTotal - valorDesconto;

      if (!isNaN(valorComDesconto) && valorComDesconto >= 0) {
        return valorComDesconto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      } else {
        return "0.00";
      }
    },
    emitSelectedProducts() {
      const selectedProducts = [];
      this.notas.forEach(nota => {
        nota.produtos.forEach(produto => {
          if (produto.selecionado) {
            selectedProducts.push(produto);
          }
        });
      });
      this.salvarSelecaoLocalStorage(); // Salva a seleção no localStorage sempre que for alterada
      this.$emit('update:selectedProducts', selectedProducts);
    },
    salvarSelecaoLocalStorage() {
      const selecao = this.notas.map(nota => ({
        nNF: nota.nNF,
        produtos: nota.produtos.map(produto => ({
          cProd: produto.cProd,
          selecionado: produto.selecionado || false,
        })),
      }));
      localStorage.setItem('selecaoProdutos', JSON.stringify(selecao));
    },
    carregarSelecaoLocalStorage() {
      const selecaoArmazenada = JSON.parse(localStorage.getItem('selecaoProdutos')) || [];
      selecaoArmazenada.forEach(selecao => {
        const notaCorrespondente = this.notas.find(nota => nota.nNF === selecao.nNF);
        if (notaCorrespondente) {
          selecao.produtos.forEach(produtoSelecionado => {
            const produtoCorrespondente = notaCorrespondente.produtos.find(produto => produto.cProd === produtoSelecionado.cProd);
            if (produtoCorrespondente) {
              produtoCorrespondente.selecionado = produtoSelecionado.selecionado;
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped>
.table-container {
  height: calc(100vh - 22.5rem);
  overflow-y: auto;
}
.table-container th:nth-child(1),
.table-container td:nth-child(1) {
  width: 12%;
}
.table-container th:nth-child(3),
.table-container td:nth-child(3) {
  width: 8%;
}
.table-container th:nth-child(7),
.table-container td:nth-child(7) {
  width: 5%;
}
.table-container th:nth-child(4),
.table-container td:nth-child(4),
.table-container th:nth-child(5),
.table-container td:nth-child(5),
.table-container th:nth-child(6),
.table-container td:nth-child(6) {
  width: 10%;
}
.table-container td:nth-child(2) {
  text-align: left;
  padding-left: .5rem;
}
input[type="checkbox"] {
  appearance: none; 
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
input[type="checkbox"]:checked::before {
  content: "✓"; 
  color: var(--green1);
  font-size: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
.linha-marcada {
  background-color: var(--green3);
}
</style>
