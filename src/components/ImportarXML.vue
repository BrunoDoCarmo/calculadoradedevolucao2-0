<template>
  <div class="botao">
    <a class="btn" @click="triggerFileInput">
      {{ fileImported ? "Importar Novo XML" : "Importar XML" }}
    </a>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      style="display: none"
      accept=".xml"
    />
  </div>
</template>

<script>
export default {
  name: "ImportarXML",
  data() {
    return {
      cnpj: null,
      fileImported: false, // Estado para saber se um arquivo já foi importado
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const xmlText = e.target.result;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");

          // Supondo que o CNPJ esteja dentro de uma tag <CNPJ>
          const cnpjElement = xmlDoc.querySelector("CNPJ");
          if (cnpjElement) {
            const newCnpj = cnpjElement.textContent.trim();

            if (!this.cnpj) {
              // Se ainda não temos um CNPJ, armazene o CNPJ do primeiro XML
              this.cnpj = newCnpj;
              this.fileImported = true; // Marca que um arquivo foi importado
            } else if (this.cnpj !== newCnpj) {
              // Se o CNPJ for diferente, exiba uma mensagem de erro
              alert("O CNPJ do arquivo selecionado não coincide com o CNPJ do arquivo anterior.");
              return;
            }

            // Processa o arquivo XML
            this.processXML(xmlDoc);
          } else {
            alert("O arquivo XML não contém um CNPJ válido.");
          }
        };

        reader.readAsText(file);
      }
    },
    processXML(xmlDoc) {
      const tpNF = xmlDoc.querySelector("tpNF")?.textContent;
      let tpNFTexto = '';
      if (tpNF == 0) {
        tpNFTexto = 'Entrada';
      } else {
        tpNFTexto = 'Saída';
      }
      
      const idDest = xmlDoc.querySelector("idDest")?.textContent;
      let idDestTexto = '';
      if (idDest == 1) {
        idDestTexto = 'Operação Interna';
      } else if (idDest == 2) {
        idDestTexto = 'Operação Interestadual';
      } else {
        idDestTexto = 'Operação com Exterior';
      }

      const tpImp = xmlDoc.querySelector("tpImp")?.textContent;
      let tpImpTexto = '';
      if (tpImp == 1) {
        tpImpTexto = 'DANFE normal, Retrato';
      } else if (tpImp == 2) {
        tpImpTexto = 'DANFE normal, Paisagem';
      } else if (tpImp == 3) {
        tpImpTexto = 'DANFE Simplificado';
      } else if (tpImp == 4) {
        tpImpTexto = 'DANFE NFC-e';
      } else {
        tpImpTexto = 'DANFE NFC-e em mensagem eletrônica';
      }
      
      const tpEmis = xmlDoc.querySelector("tpEmis")?.textContent;
      let tpEmisTexto = '';
      if (tpEmis == 1) {
        tpEmisTexto = 'Emissão normal (não em contingência)';
      } else if (tpEmis == 2) {
        tpEmisTexto = 'Contingência FS-IA, com impressão do DANFE em Formulário de Segurança - Impressor Autônomo';
      } else if (tpEmis == 3) {
        tpEmisTexto = 'Contingência SCAN (Sistema de Contingência do Ambiente Nacional); *Desativado  * NT 2015/002';
      } else if (tpEmis == 4) {
        tpEmisTexto = 'Contingência EPEC (Evento Prévio da Emissão em Contingência)';
      } else if (tpEmis == 5) {
        tpEmisTexto = 'Contingência FS-DA, com impressão do DANFE em Formulário de Segurança - Documento Auxiliar';
      } else if (tpEmis == 6) {
        tpEmisTexto = 'Contingência SVC-AN (SEFAZ Virtual de Contingência do AN)';
      } else if (tpEmis == 7) {
        tpEmisTexto = 'Contingência SVC-RS (SEFAZ Virtual de Contingência do RS)';
      } else {
        tpEmisTexto = 'Contingência off-line da NFC-e;';
      }

      const tpAmb = xmlDoc.querySelector("tpAmb")?.textContent;
      let tpAmbTexto = '';
      if (tpAmb == 1) {
        tpAmbTexto = 'Produção';
      } else {
        tpAmbTexto = 'Homologação';
      }
      
      const finNFe = xmlDoc.querySelector("finNFe")?.textContent;
      let finNFeTexto = '';
      if (finNFe == 1) {
        finNFeTexto = 'NF-e normal';
      } else if (finNFe == 2) {
        finNFeTexto = 'NF-e complementar';
      } else if (finNFe == 3) {
        finNFeTexto = 'NF-e de ajuste';
      } else {
        finNFeTexto = 'Devolução de mercadoria';
      }

      const indFinal = xmlDoc.querySelector("indFinal")?.textContent;
      let indFinalTexto = '';
      if (indFinal == 0) {
        indFinalTexto = 'Não é para consumidor final';
      } else {
        indFinalTexto = 'Para consumidor final';
      }
      
      const dadosNF = {
        mod: xmlDoc.querySelector("mod")?.textContent || '',
        serie: xmlDoc.querySelector("serie")?.textContent || '',
        nNF: xmlDoc.querySelector("nNF")?.textContent || '',
        dhEmi: this.converterData(xmlDoc.querySelector("dhEmi")?.textContent || ''),
        tpNFTexto,
        idDestTexto,
        cMunFG: xmlDoc.querySelector("cMunFG")?.textContent || '',
        tpImpTexto,
        tpEmisTexto,
        tpAmbTexto,
        finNFeTexto,
        indFinalTexto,
        chNFe: xmlDoc.querySelector("chNFe")?.textContent || '',
      };

      const dadosEmitente = {
        CNPJ: xmlDoc.querySelector("emit > CNPJ")?.textContent || '',
        xNome: xmlDoc.querySelector("emit > xNome")?.textContent || '',
        xLgr: xmlDoc.querySelector("emit > enderEmit > xLgr")?.textContent || '',
        nro: xmlDoc.querySelector("emit > enderEmit > nro")?.textContent || '',
        xBairro: xmlDoc.querySelector("emit > enderEmit > xBairro")?.textContent || '',
        cMun: xmlDoc.querySelector("emit > enderEmit > cMun")?.textContent || '',
        xMun: xmlDoc.querySelector("emit > enderEmit > xMun")?.textContent || '',
        UF: xmlDoc.querySelector("emit > enderEmit > UF")?.textContent || '',
        CEP: xmlDoc.querySelector("emit > enderEmit > CEP")?.textContent || '',
        IE: xmlDoc.querySelector("emit > IE")?.textContent || '',
      };

      const dadosDestinatario = {
        CNPJ: xmlDoc.querySelector("dest > CNPJ")?.textContent || '',
        xNome: xmlDoc.querySelector("dest > xNome")?.textContent || '',
        xLgr: xmlDoc.querySelector("dest > enderDest > xLgr")?.textContent || '',
        nro: xmlDoc.querySelector("dest > enderDest > nro")?.textContent || '',
        xBairro1: xmlDoc.querySelector("dest > enderDest > xBairro")?.textContent || '',
        cMun: xmlDoc.querySelector("dest > enderDest > cMun")?.textContent || '',
        xMun: xmlDoc.querySelector("dest > enderDest > xMun")?.textContent || '',
        UF: xmlDoc.querySelector("dest > enderDest > UF")?.textContent || '',
        CEP: xmlDoc.querySelector("dest > enderDest > CEP")?.textContent || '',
        indIEDest: xmlDoc.querySelector("dest > indIEDest")?.textContent || '',
        IE: xmlDoc.querySelector("dest > IE")?.textContent || '',
      };

      // Processa os produtos
      const items = xmlDoc.getElementsByTagName("det");
      const newProducts = [];

      for (let item of items) {
        const cProd = item.querySelector("cProd")?.textContent.trim() || '';
        const xProd = item.querySelector("xProd")?.textContent.trim() || '';
        const qCom = parseFloat(item.querySelector("qCom")?.textContent.trim() || 0);
        const vUnCom = parseFloat(item.querySelector("vUnCom")?.textContent.trim() || 0);
        
        const vlrTotal = qCom * vUnCom;
        
        const produto = {
          cProd,
          xProd, // Nome do produto
          qCom, // Quantidade
          vUnCom: vUnCom.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}), // Valor Unitário
          vlrTotal: vlrTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}) // Valor Total
        };
        newProducts.push(produto);
      }

      // Dados para emissão do evento
      const data = {
        dadosNF,
        dadosEmitente,
        dadosDestinatario,
        produto: newProducts
      };

      this.$emit("data-loaded", data);
    },
    converterData(dataString) {
      if (!dataString) return '';
      const partes = dataString.split(/[-T:]+/); // Divide a string com base em separadores comuns
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      // const hora = partes[3];
      // const minuto = partes[4];
      // const segundo = partes[5];

      // Formato desejado: DD/MM/YYYY
      return `${dia}/${mes}/${ano}`;
    },
  },
};
</script>

<style scoped>
.btn {
  border-color: var(--black);
  background-color: #007bff;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5em 1em;
  border-radius: 4px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
