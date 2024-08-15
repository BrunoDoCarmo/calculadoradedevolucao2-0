<template>
  <div>
    <a class="btn" @click="triggerFileInput">Importar XML</a>
    <input type="file" ref="fileInput" @change="onFileChange" style="display: none" accept=".xml" multiple />
    <button @click="limparLocalStorage">LIMPAR LOCALSTORAGE</button>
  </div>
</template>

<script>
export default {
  name: "ImportarXML",
  emits: ['nota-importada', 'limpar-notas'],
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
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

      const nfe = xmlDoc.querySelector("NFe");
      if (!nfe) {
        console.error("Não foi possível encontrar a tag <NFe>");
        return;
      }

      const emitente = nfe.querySelector("emit");
      const destinatario = nfe.querySelector("dest");
      const protNFe = xmlDoc.querySelector("protNFe");
      const produtos = nfe.querySelectorAll("det");

      const notaFiscal = {
        nNF: nfe.querySelector("nNF")?.textContent || "N/A",
        dhEmi: nfe.querySelector("dhEmi")?.textContent || "N/A",
        emitente: {
          CNPJ: emitente?.querySelector("CNPJ")?.textContent || "N/A",
          xNome: emitente?.querySelector("xNome")?.textContent || "N/A",
          xLgr: emitente?.querySelector("xLgr")?.textContent || "N/A",
          nro: emitente?.querySelector("nro")?.textContent || "N/A",
          xBairro: emitente?.querySelector("xBairro")?.textContent || "N/A",
          cMun: emitente?.querySelector("cMun")?.textContent || "N/A",
          xMun: emitente?.querySelector("xMun")?.textContent || "N/A",
          UF: emitente?.querySelector("UF")?.textContent || "N/A",
          CEP: emitente?.querySelector("CEP")?.textContent || "N/A",
          IE: emitente?.querySelector("IE")?.textContent || "N/A",
        },
        destinatario: {
          CNPJ: destinatario?.querySelector("CNPJ")?.textContent || "N/A",
          xNome: destinatario?.querySelector("xNome")?.textContent || "N/A",
          xLgr: destinatario?.querySelector("xLgr")?.textContent || "N/A",
          nro: destinatario?.querySelector("nro")?.textContent || "N/A",
          xBairro: destinatario?.querySelector("xBairro")?.textContent || "N/A",
          cMun: destinatario?.querySelector("cMun")?.textContent || "N/A",
          xMun: destinatario?.querySelector("xMun")?.textContent || "N/A",
          UF: destinatario?.querySelector("UF")?.textContent || "N/A",
          CEP: destinatario?.querySelector("CEP")?.textContent || "N/A",
          IE: destinatario?.querySelector("IE")?.textContent || "N/A",
        },
        protNFe: {
          chNFe: protNFe?.querySelector("chNFe")?.textContent || "N/A",
        },
        produtos: [],
      };

      produtos.forEach(produto => {
        const prod = produto.querySelector("prod");
        if (prod) {
          const cProd = prod.querySelector("cProd")?.textContent.trim() || '';
          const xProd = prod.querySelector("xProd")?.textContent.trim() || '';
          const qCom = parseFloat(prod.querySelector("qCom")?.textContent.trim() || 0);
          const vUnCom = parseFloat(prod.querySelector("vUnCom")?.textContent.trim() || 0);
          const vlrTotal = qCom * vUnCom;

          notaFiscal.produtos.push({
            cProd,
            xProd,
            qCom,
            vUnCom: vUnCom.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            vlrTotal: vlrTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
          });
        }
      });

      if (this.isNotaFiscalDuplicada(notaFiscal)) {
        console.log(`Nota fiscal ${notaFiscal.nNF} já está importada.`);
        return;
      }

      this.salvarNotaLocalStorage(notaFiscal);
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
      localStorage.removeItem("produtosSelecionados");
      this.$emit("limpar-notas");
      location.reload(); // Recarrega a página para limpar o estado atual
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
