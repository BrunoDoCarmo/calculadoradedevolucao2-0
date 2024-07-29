<template>
  <div class="product-list">
    <div v-if="!dataLoaded" class="alert alert-red">Nenhuma Nota Fiscal Eletrónica (NF-e) importada.</div>
    <div v-else>
      <div class="alert alert-green">Nota Fiscal Eletrónica (NF-e) importada com sucesso.</div>
      <div class="header">Informações da Nota Fiscal</div>
      <fieldset>
        <legend>
          <h3>Dados da Nota Fiscal</h3>
          <hr>
          <span><font-awesome-icon :icon="['fas', 'caret-down']" /></span>
        </legend>
        <div class="dados">
          <div class="campo">
            <input type="text" name="xFantEmit" :value="nNF">
            <label for="xFantEmit">Nº Nota Fiscal</label>
          </div>
          <div class="campo">
            <input type="text" name="xFantEmit" :value="formattedDhEmi">
            <label for="xFantEmit">Nº Nota Fiscal</label>
          </div>
          <div class="campo">
            <input type="text" name="xFantEmit" :value="chNFe">
            <label for="xFantEmit">Chave NF-e</label>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          <h3>Dados do Emitente</h3>
          <hr>
          <span><font-awesome-icon :icon="['fas', 'caret-down']" /></span>
        </legend>
        <div class="dados">
          <div class="campo">
            <input type="text" name="xFantEmit" :value="xNomeEmit">
            <label for="xFantEmit">Razão Social Emitente</label>
          </div>
          <div class="campo">
            <input type="text" name="xFantEmit" :value="xFantEmit">
            <label for="xFantEmit">Fantasia Emitente</label>
          </div>
        </div>
        <div class="dados">
          <div class="campo">
            <input type="text" name="cnpjemit" :value="CNPJEmit">
            <label for="cnpjemit">CNPJ Emitente</label>
          </div>
          <div class="campo">
            <input type="text" name="cnpjemit" :value="ieEmit">
            <label for="cnpjemit">I.E. Emitente</label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
      <table>
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
    chNFe: String,
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
    font-family: Arial, sans-serif;
}

.alert {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 16px;
    text-align: center;
}

.alert-red {
    background-color: #f8d7da;
    color: #721c24;
}

.alert-green {
    background-color: #d4edda;
    color: #155724;
}

.header {
    font-size: 2rem;
    font-weight: bold;
}

fieldset {
    background-color: #f9f9f9;
    border: .15rem solid #000;
    padding: 0 2rem;
    border-radius: 1rem;
}

fieldset legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  width: 100%;
}

fieldset hr {
  width: 100%;
  border-top: .15rem solid #000;
}

fieldset h3 {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.5rem;
  white-space: nowrap;
  padding: 0 .5rem;
}
  
fieldset span {
  padding: 0 .5rem;
  font-size: 3rem;
}

.dados {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.campo {
    flex: 1 1 45%;
    margin-bottom: 1.5rem;
    position: relative;
}

.campo input {
    width: 100%;
    padding: 1rem;
    border: .1rem solid #ccc;
    border-radius: .5rem;
    font-size: 1.6rem;
    box-sizing: border-box;
}

.campo label {
    position: absolute;
    top: -1rem;
    left: 1rem;
    background-color: #f9f9f9;
    padding: 0 .5rem;
    font-size: 1.4rem;
    color: #666;
}

</style>
