<template>
  <div class="botao">
    <a class="btn" @click="triggerFileInput">Carregar XML</a>
    <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" accept=".xml" />
  </div>
</template>
<script>
export default {
    name: "ImportarXML",
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const xmlString = e.target.result;
                    this.processXML(xmlString);
                };
                reader.readAsText(file);
            }
        },
        processXML(xmlString) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");

            // Extract values from XML
            const chNFe = xmlDoc.querySelector("chNFe").textContent;
            const nNF = xmlDoc.querySelector("nNF").textContent;
            const dhEmi = xmlDoc.querySelector("dhEmi").textContent;

            const xNomeEmit = xmlDoc.querySelector("emit > xNome").textContent;
            const xFantEmit = xmlDoc.querySelector("emit > xFant").textContent;
            const CNPJEmit = xmlDoc.querySelector("emit > CNPJ").textContent;
            const ieEmit = xmlDoc.querySelector("emit > IE").textContent;
            
            const xNomeDest = xmlDoc.querySelector("dest > xNome").textContent;
            const CNPJDest = xmlDoc.querySelector("dest > CNPJ").textContent;

            // Format the date
            const formattedDhEmi = this.formatDate(dhEmi);

            // Populate products table
            const items = xmlDoc.getElementsByTagName("det");
            const newProducts = [];

            for (let item of items) {
                const prod = item.getElementsByTagName("prod")[0];
                const qCom = parseFloat(prod.getElementsByTagName("qCom")[0]?.textContent.trim() || 0);
                const vUnCom = parseFloat(prod.getElementsByTagName("vUnCom")[0]?.textContent.trim() || 0);
                const vProd = qCom * vUnCom;

                const product = {
                    cProd:prod.getElementsByTagName("cProd")[0]?.textContent.trim() || "",
                    xProd: prod.getElementsByTagName("xProd")[0]?.textContent.trim() || "",
                    qCom: qCom,
                    vUnCom: vUnCom.toLocaleString("pt-BR", { style: "currency", currency: "BRL", }),
                    vProd: vProd.toLocaleString("pt-BR", { style: "currency", currency: "BRL", }),
                };
                newProducts.push(product);
            }
            this.products = newProducts;
            this.$emit("data-loaded", { chNFe, nNF, dhEmi: formattedDhEmi, 
                xNomeEmit, xFantEmit, CNPJEmit, ieEmit,
                xNomeDest, CNPJDest, products: newProducts, });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getUTCDate()).padStart(2, "0");
            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
            const year = date.getUTCFullYear();
            return `${day}/${month}/${year}`;
        },
    },
};
</script>
<style scoped>
.botao {
    width: 100%;
    text-align: center;
}

.btn {
    background-color: #219150;
    color: white;
    border: none;
    padding: 10px 20px;
    text-decoration: none;
    cursor: pointer;
}

.btn:hover {
    background-color: #176f3b;
}
</style>
