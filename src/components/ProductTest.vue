<template>
  <div class="product-list">
    <div v-if="!dataLoaded" class="alert alert-red">Nenhuma Nota Fiscal Eletrónica (NF-e) importada.</div>
    <div v-else>
      <div class="alert alert-green">Nota Fiscal Eletrónica (NF-e) importada com sucesso.</div>
      <div class="header">Informações da Nota Fiscal</div>
      <div class="emitente">
        <div class="campo">
          <input type="text" name="xFantEmit" :value="xNomeEmit">
          <label for="xFantEmit">Razão Social Emitente</label>
        </div>
        <div class="campo">
          <input type="text" name="xFantEmit" :value="xFantEmit">
          <label for="xFantEmit">Fantasia Emitente</label>
        </div>
        <div class="campo">
          <input type="text" name="cnpjemit" :value="CNPJEmit">
          <label for="cnpjemit">CNPJ Emitente</label>
        </div>
        <div class="campo">
          <input type="text" name="cnpjemit" :value="CNPJEmit">
          <label for="cnpjemit">CNPJ Emitente</label>
        </div>
        <div class="campo">
          <input type="text" name="cnpjemit" :value="ieEmit">
          <label for="cnpjemit">I.E. Emitente</label>
        </div>
      </div>
      <table>
        <tr>
          <th>Código UF</th>
          <td>{{ cUF }}</td>
        </tr>
        <tr>
          <th>Número da Nota</th>
          <td>{{ nNF }}</td>
        </tr>
        <tr>
          <th>Data de Emissão</th>
          <td>{{ formattedDhEmi }}</td>
        </tr>
        <tr>
          <th>Razão Social (Emitente)</th>
          <td>{{ xNomeEmit }}</td>
        </tr>
        <tr>
          <th>Razão Social (Destinatário)</th>
          <td>{{ xNomeDest }}</td>
        </tr>
        <tr>
          <th>CNPJ (Destinatário)</th>
          <td>{{ CNPJDest }}</td>
        </tr>
      </table>

      <div class="header">Detalhes dos Produtos</div>
      <table>
        <thead>
          <tr>
            <th>Código do Produto</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.cProd }}</td>
            <td>{{ product.xProd }}</td>
            <td>{{ product.qCom }}</td>
            <td>{{ product.vUnCom }}</td>
            <td>{{ product.vProd }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductTest",
  props: {
    products: {
      type: Array,
      required: true
    },
    dataLoaded: {
      type: Boolean,
      required: true
    },
    cUF: String,
    nNF: String,
    formattedDhEmi: String,
    // DADOS DO EMITENTE
    xNomeEmit: String,
    xFantEmit: String,
    CNPJEmit: String,
    ieEmit: String,

    xNomeDest: String,
    CNPJDest: String
  }
};
</script>

<style scoped>
.product-list {
  padding: 2rem;
}
.alert {
  font-size: 2rem;
  padding: 2rem;
  border-radius: 2rem;
  color: #fff;
  font-weight: bold;
  border: 0.3rem solid;
  text-transform: uppercase;
  text-align: center;
}

.alert-red {
  background: rgba(255, 129, 129, 0.597);
  border-color: red;
}

.alert-green {
  background: rgba(129, 255, 129, 0.597);
  border-color: green;
}
.emitente {
  display: flex;
  width: 100%;
  gap: 1rem;
}
.campo {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 1.5rem;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input[type="text"]:focus {
  border-color: #219150;
  outline: none;
}

label {
  position: absolute;
  /* top: 50%; */
  /* transform: translateY(-50%); */
  /* background: white; */
  font-size: 16px;
  padding: 0 .5rem;
  transition: all 0.3s ease;
}

input[type="text"]:focus + label,
input[type="text"]:not(:placeholder-shown) + label {
  top: -1rem;
  left: 1rem;
  border: 1px solid #000;
  border-radius: .5rem;
  background: white;
  font-size: 1.4rem;
}

.header {
  font-weight: bold;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
