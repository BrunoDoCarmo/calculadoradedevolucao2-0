<template>
    <div>
        <h2>Produtos</h2>
        <p v-if="!produto.length">Nenhum produto disponível.</p>
        <p v-if="produto.length">Quantidade</p>
        <table>
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>Cod. Prod.</th>
                    <th>Nome Produto</th>
                    <th>QTD</th>
                    <th>VLR Unit.</th>
                    <th>VLR Total</th>
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
</template>
<script>
export default {
    name: 'ProdutoS',
    props: ['produto']
}
</script>
<style scoped>
</style>