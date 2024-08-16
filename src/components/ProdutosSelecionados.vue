<template>
    <div>
        <Abas :abas="tabs" v-model:activeTab="activeTab" />
        <p>Produtos Selecionados: {{ totalProdutoSelecionados }}</p>
        <p>Valor Total Selecionado: {{ calcularValorTotalSelecionado }}</p>
        <div v-if="activeTab === 0">
        <TabelaProdutoSelecionado
            :produtos="produtosSelecionados"
            :total-produto="totalProdutoSelecionados"
            @update:selectedProducts="handleUpdateSelectedProducts, atualizarProdutosSelecionados"
        />
        </div>
    </div>
</template>
  
<script>
import Abas from './Abas.vue';
import TabelaProdutoSelecionado from './TabelaProdutoSelecionado.vue';
  
export default {
    name: 'ProdutosSelecionados',
    components: {
        Abas,
        TabelaProdutoSelecionado,
    },
    props: {
        produtos: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            activeTab: 0, // Inicia com a primeira aba ativa
            tabs: [
                'Produtos',
                'Imposto'
            ],
            produtosSelecionados: this.produtos,
        };
    },
    computed: {
        totalProdutoSelecionados() {
            return this.produtosSelecionados.length;
        },
        calcularValorTotalSelecionado() {
            let valorTotal = 0;
            this.produtosSelecionados.forEach(produto => {
            const valorUnitario = parseFloat(produto.vUnCom.replace(/[^\d,.-]/g, '').replace(",", "."));
            const quantidade = parseFloat(produto.qCom);
            if (!isNaN(quantidade) && !isNaN(valorUnitario) && quantidade >= 0) {
                valorTotal += quantidade * valorUnitario;
            }
            });
            return valorTotal.toFixed(2);
        },
    },
    methods: {
        handleUpdateSelectedProducts(produtos) {
            this.produtosSelecionados = produtos;
            this.salvarProdutosSelecionados();
        },
        salvarProdutosSelecionados() {
            localStorage.setItem('produtosSelecionados', JSON.stringify(this.produtosSelecionados));
        },
        atualizarProdutosSelecionados(produtosAtualizados) {
            // Lógica para atualizar os produtos no componente pai
            this.produtosSelecionados = produtosAtualizados;
        },
    },
  };
</script> 
<style scoped>
.table-container {
    height: calc(100vh - 26rem);
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
</style>
