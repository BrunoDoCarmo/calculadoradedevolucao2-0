<template>
    <div>
        <Abas :abas="tabs" v-model:activeTab="activeTab"/>
        <div v-if="activeTab === 0">
            <table>
                <thead>
                    <tr>
                        <th>Cod. Prod.</th>
                        <th>Nome Produto</th>
                        <th>QTD</th>
                        <th>VLR Unit.</th>
                        <th>VLR Unit.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(products, index) in product" :key="index">
                        <td>{{ products.cProd }}</td>
                        <td>{{ products.xProd }}</td>
                        <td>{{ products.qCom }}</td>
                        <td>{{ products.vUnCom }}</td>
                        <td>{{ products.vlrTotal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="activeTab === 1">
            <table>
                <thead>
                    <tr>
                        <th>Cod. Prod.</th>
                        <th>Nome Produto</th>
                        <th>QTD</th>
                        <th>VLR Unit.</th>
                        <th>VLR Unit.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(products, index) in product" :key="index">
                        <td>{{ products.cProd }}</td>
                        <td>{{ products.xProd }}</td>
                        <td>{{ products.qCom }}</td>
                        <td>{{ products.vUnCom }}</td>
                        <td>{{ products.vlrTotal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Abas from './Abas.vue';
export default {
    name: 'ProdutosSelecionados',
    props: ['product'],
    data() {
        return {
            activeTab: 0,
            tabs: [
                'Dados',
                'Impostos'
            ]
        }
    },
    components: {
        Abas
    },
}
</script>
<style scoped>
</style>