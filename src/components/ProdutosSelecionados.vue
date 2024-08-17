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
</style>
