<template>
  <div class="teste">
    <ImportarXML @data-loaded="handleDataLoaded" />
    <ProductTest
      :products="products"
      :cUF="cUF"
      :nNF="nNF"
      :formattedDhEmi="formattedDhEmi"

      :xNomeEmit="xNomeEmit"
      :xFantEmit="xFantEmit"
      :CNPJEmit="CNPJEmit"
      :ieEmit="ieEmit"

      :xNomeDest="xNomeDest"
      :CNPJDest="CNPJDest"
      :dataLoaded="dataLoaded"
    />
  </div>
</template>

<script>
import ImportarXML from "@/components/ImportarXML.vue";
import ProductTest from "@/components/ProductTest.vue";

export default {
  name: 'App',
  components: {
    ImportarXML,
    ProductTest
  },
  data() {
    return {
      products: [],
      cUF: '',
      nNF: '',
      dhEmi: '',
      formattedDhEmi: '',
      xNomeEmit: '',
      CNPJEmit: '',
      xNomeDest: '',
      CNPJDest: '',
      dataLoaded: false
    };
  },
  methods: {
    handleDataLoaded({ products, cUF, nNF, dhEmi, 
      xNomeEmit, xFantEmit, CNPJEmit, ieEmit,
      xNomeDest, CNPJDest }) {
      this.products = products;
      this.cUF = cUF;
      this.nNF = nNF;
      this.dhEmi = dhEmi;
      this.formattedDhEmi = this.formatDate(dhEmi);
      // DADOS DO EMITENTE
      this.xNomeEmit = xNomeEmit;
      this.xFantEmit = xFantEmit;
      this.CNPJEmit = CNPJEmit;
      this.ieEmit = ieEmit;
      // DADOS DO DESTINATARIO
      this.xNomeDest = xNomeDest;
      this.CNPJDest = CNPJDest;
      this.dataLoaded = true;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style scoped>
.teste {
  padding-top: 2rem;
}
</style>
