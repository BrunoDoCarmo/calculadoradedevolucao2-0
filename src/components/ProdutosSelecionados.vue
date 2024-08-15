<template>
    <div>
        <Abas :abas="tabs" v-model:activeTab="activeTab"/>
        <p>Produtos Selecionados: {{ totalProdutoSelecionados }}</p>
        <p>Valor Total Selecionado: {{ calcularValorTotalSelecionado }}</p>
        <div v-if="activeTab === 0">
            <div class="table-container">
                <table class="produtos-tabela">
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
                    <tr 
                         v-for="(produto, index) in produtosSelecionados" :key="index"
                    >
                        <td>{{ produto.cProd }}</td>
                        <td>{{ produto.xProd }}</td>
                        <td>
                            <input
                            type="text"
                            name="qtdDevolvida"
                            id="qtdDevolvida"
                            :value="produto.qCom"
                            @input="updateQuantidade(produto, $event)"
                            :disabled="produto.qCom === 1">
                        </td>
                        <td>{{ produto.vUnCom }}</td>
                        <td>{{ calcularValorTotal(produto) }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="activeTab === 1">
            <div class="table-container">
                
            </div>
        </div>
    </div>
</template>
<script>
import Abas from './Abas.vue';
export default {
  name: 'ProdutosSelecionados',
    props: {
        produtos: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeTab: 0,
            tabs: [
                'Dados',
                'Impostos'
            ],
        }
    },
    components: {
        Abas
    },
    computed: {
        totalProdutoSelecionados() {
            return this.produtos.length;
        },
        calcularValorTotalSelecionado() {
            return this.produtos.reduce((total, produto) => {
                const quantidade = parseFloat(produto.qCom);
                const valorUnitario = parseFloat(produto.vUnCom.replace(/[^\d,.-]/g, '').replace(",", "."));
                const valorTotalProduto = (!isNaN(quantidade) && !isNaN(valorUnitario) && quantidade >= 0) 
                ? quantidade * valorUnitario 
                : 0;

                return total + valorTotalProduto;
            }, 0).toFixed(2);
        },
    },
    methods: {
        updateQuantidade(produto, event) {
            const novaQuantidade = parseFloat(event.target.value);
            if (!isNaN(novaQuantidade) && novaQuantidade >= 0) {
                produto.qCom = novaQuantidade;
            } else {
                produto.qCom = '0';
            }
            this.salvarProdutosSelecionados(this.produtos);
        },
        calcularValorTotal(produto) {
            const valorUnitario = parseFloat(produto.vUnCom.replace(/[^\d,.-]/g, '').replace(",", "."));
            const quantidade = parseFloat(produto.qCom);

            if (!isNaN(quantidade) && !isNaN(valorUnitario) && quantidade >= 0) {
                return (quantidade * valorUnitario).toFixed(2);
            } else {
                return "0.00";
            }
        },
        salvarProdutosSelecionados(produtos) {
            localStorage.setItem('produtosSelecionados', JSON.stringify(produtos));
        }
    }
}
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
.table-container td:nth-child(3){
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

input[type="text"] {
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
  background: transparent;
}

input[type="text"]:disabled{
    cursor: not-allowed;
}
</style>