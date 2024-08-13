<template>
  <div>
    <input type="file" @change="onFileChange" accept=".xml" multiple />
    <button @click="limparLocalStorage">LIMPAR LOCALSTORAGE</button>
  </div>
</template>

<script>
export default {
  name: "ImportarXML",
  methods: {
    onFileChange(event) {
      const files = event.target.files;
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const xmlContent = e.target.result;
            this.processXML(xmlContent);
          };
          reader.readAsText(files[i]);
        }
      }
    },
    processXML(xmlContent) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "application/xml");

      const nfe = xmlDoc.getElementsByTagName("NFe")[0];
      if (!nfe) {
        console.error("Não foi possível encontrar a tag <NFe>");
        return;
      }

      const emitente = nfe.getElementsByTagName("emit")[0];
      const destinatario = nfe.getElementsByTagName("dest")[0];
      const protNFe =  nfe.getElementsByTagName("protNFe")[0];
      const produtos = nfe.getElementsByTagName("det");

      const notaFiscal = {
        nNF: nfe.getElementsByTagName("nNF")[0]?.textContent || "N/A",
        dhEmi: nfe.getElementsByTagName("dhEmi")[0]?.textContent || "N/A",
        emitente: {
          CNPJ: emitente?.getElementsByTagName("CNPJ")[0]?.textContent || "N/A",
          xNome: emitente?.getElementsByTagName("xNome")[0]?.textContent || "N/A",
        },
        destinatario: {
          CNPJ: destinatario?.getElementsByTagName("CNPJ")[0]?.textContent || "N/A",
          xNome: destinatario?.getElementsByTagName("xNome")[0]?.textContent || "N/A",
        },
        protNFe: protNFe ? {
          chNFe: protNFe.getElementsByTagName("chNFe")[0]?.textContent.trim() || "N/A",
        } : { chNFe: "N/A" },
        produtos: [],
      };

      for (let i = 0; i < produtos.length; i++) {
        const prod = produtos[i].getElementsByTagName("prod")[0];
        if (prod) {
          notaFiscal.produtos.push({
            cProd: prod.getElementsByTagName("cProd")[0]?.textContent || "N/A",
            xProd: prod.getElementsByTagName("xProd")[0]?.textContent || "N/A",
            qCom: prod.getElementsByTagName("qCom")[0]?.textContent || "N/A",
            vUnCom: prod.getElementsByTagName("vUnCom")[0]?.textContent || "N/A",
            vlrTotal: prod.getElementsByTagName("vProd")[0]?.textContent || "N/A",
          });
        }
      }

      // Verifica se a nota fiscal já está no localStorage
      if (this.isNotaFiscalDuplicada(notaFiscal)) {
        console.log(`Nota fiscal ${notaFiscal.nNF} já está importada.`);
        return;
      }

      // Armazena a nota fiscal no localStorage
      this.salvarNotaLocalStorage(notaFiscal);

      // Emite a nova nota fiscal processada
      this.$emit("nota-importada", notaFiscal);
    },
    isNotaFiscalDuplicada(notaFiscal) {
      const notasArmazenadas = JSON.parse(localStorage.getItem("notasFiscais")) || [];
      return notasArmazenadas.some(nota => nota.nNF === notaFiscal.nNF);
    },
    salvarNotaLocalStorage(notaFiscal) {
      const notasArmazenadas = JSON.parse(localStorage.getItem("notasFiscais")) || [];
      notasArmazenadas.push(notaFiscal);
      localStorage.setItem("notasFiscais", JSON.stringify(notasArmazenadas));
    },
    limparLocalStorage() {
      localStorage.removeItem("notasFiscais");
      this.$emit("limpar-notas");
      // Recarrega a página para limpar o estado atual
      location.reload();
    }
  },
};
</script>

<style scoped>
.btn {
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
