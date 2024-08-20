<template>
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
                    :max="quantidadeOriginal[index]"
                />
                </td>
                <td>{{ produto.vUnCom }}</td>
                <td>{{ produto.vDesc }}</td>
                <td>{{ calcularValorTotal(produto) }}</td>
                <td>
                    <a
                        class="btn"
                        @click="reverterQuantidade(index)"
                        :class="{ disabled: quantidadeOriginal[index] === 1 }"
                        :disabled="quantidadeOriginal[index] === 1"
                        :title="quantidadeOriginal[index] === 1 ? '' : 'Voltar à quantidade original'"
                    >
                        <font-awesome-icon :icon="['fa', 'arrow-rotate-left']" />
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    name: 'TabelaProdutoSelecionadoDados',
    props: {
        produtos: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            produtosInternos: [], // Criar uma cópia da prop
            quantidadeOriginal: {}
        };
    },
    mounted() {
        //Armazena a quantidade original de cada produto ao montar a componente
        this.produtosInternos = this.produtos.map(produto => ({ ...produto }))
        this.produtosInternos.forEach((produto, index) => {
            this.quantidadeOriginal[index] = produto.qCom
        })
    },
    watch: {
        produtos: {
            handler(newVal) {
                this.produtosInternos = newVal.map(produto => ({ ...produto })) // Atualizar a cópia quando a prop mudar
                //Atualizar a quantidade origianl ao mudar os produtos
                newVal.forEach((produto, index) => {
                    this.quantidadeOriginal[index] = produto.qCom
                })
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
        reverterQuantidade(index) {
            // Verifique se o índice é valido antes de tentar acessar o produto
            if(this.produtosInternos[index]){
                const quantidadeOriginal = this.quantidadeOriginal[index]; // Valor original a ser restaurado
                if(quantidadeOriginal != undefined) {
                    this.produtosInternos[index].qCom = quantidadeOriginal;
                    this.$emit('update:selectedProducts', this.produtosInternos); // Atualiza os produtos selecionados
                }
            }
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
.table-container td:nth-child(3)
.table-container th:nth-child(6),
.table-container td:nth-child(6){
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
.produtos-tabela input[type="number"] {
    width: 100%;
    height: 100%;
    font-size: 2rem;    
    cursor: pointer;
    text-align: center;
    background: transparent;
}
.produtos-tabela input[type="number"]::-webkit-inner-spin-button,
.produtos-tabela input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.produtos-tabela input[type="number"] {
    -moz-appearance: textfield; /* Remove as setas no Firefox */
}
.produtos-tabela input[type="number"]:disabled{
    cursor: not-allowed;
}
.produtos-tabela .btn {
    margin-top: .25rem;
}
.produtos-tabela .disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
  