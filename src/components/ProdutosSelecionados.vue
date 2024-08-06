<template>
    <div>
        <Abas :abas="tabs" v-model:activeTab="activeTab"/>
        <div v-if="activeTab === 0">
            <table>
                <thead>
                    <tr>
                        <th>Ação</th>
                        <th>Cod. Prod.</th>
                        <th>Nome Produto</th>
                        <th>QTD</th>
                        <th>VLR Unit.</th>
                        <th>VLR Unit.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in produto" :key="index">
                        <td><input type="checkbox" name="" id=""></td>
                        <td>{{ product.cProd }}</td>
                        <td>{{ product.xProd }}</td>
                        <td>{{ product.qCom }}</td>
                        <td>{{ product.vUnCom }}</td>
                        <td>{{ product.vlrTotal }}</td>
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
                    <tr v-for="(product, index) in produto" :key="index">
                        <td>{{ product.cProd }}</td>
                        <td>{{ product.xProd }}</td>
                        <td>{{ product.qCom }}</td>
                        <td>{{ product.vUnCom }}</td>
                        <td>{{ product.vlrTotal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Abas from './Abas.vue';
export default {
    name: 'ProdutoS',
    props: ['produto'],
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