<template>
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
            <tr v-for="(produto, index) in produtosInternos" :key="index">
                <td>{{ produto.cProd }}</td>
                <td>{{ produto.xProd }}</td>
                <td>
                <input 
                    type="number"
                    :value="produto.qCom" 
                    @input="updateQuantidade($event, index)"
                    class="input-quantidade"
                    :disabled="produto.qCom === 1"
                    min="1"
                />
                </td>
                <td>{{ produto.vUnCom }}</td>
                <td>{{ calcularValorTotal(produto) }}</td>
                <td>
                    <font-awesome-icon 
                        :icon="['fa', 'pen-to-square']" 
                        @click="reverterQuantidade(produto, index)"
                        :class="{ disabled: produto.qCom == 1 }"
                        :disabled="produto.qCom == 1"
                    />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    name: 'TabelaProdutoSelecionado',
    props: {
        produtos: {
        type: Array,
        required: true,
        },
    },
    data() {
        return {
        produtosInternos: [...this.produtos], // Criar uma cópia da prop
        };
    },
    watch: {
        produtos: {
            handler(newVal) {
                this.produtosInternos = [...newVal]; // Atualizar a cópia quando a prop mudar
            },
            deep: true,
        },
    },
    methods: {
        updateQuantidade(event, index) {
            const novaQuantidade = parseFloat(event.target.value);
            if (!isNaN(novaQuantidade)) {
                this.produtosInternos[index].qCom = novaQuantidade;
                this.$emit('update:selectedProducts', this.produtosInternos);
            }
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
        reverterQuantidade(produto, index) {
            if (produto.qCom > 1) {
                const quantidadeOriginal = 1; // Valor original a ser restaurado
                this.produtos[index].qCom = quantidadeOriginal;
                this.$emit('update:selectedProducts', this.produtos); // Atualiza os produtos selecionados
            }
        },
    },
};
</script>
<style scoped>
.produtos-tabela input[type="number"] {
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 2rem;
    text-align: center;
    background: transparent;
}
.produtos-tabela input[type="number"]:disabled{
    cursor: not-allowed;
}
</style>
  