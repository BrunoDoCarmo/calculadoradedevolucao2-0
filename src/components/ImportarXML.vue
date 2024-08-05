<template>
  <div class="botao">
    <a class="btn" @click="triggerFileInput">Importar XML</a>
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
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlString, "application/xml")
      
      const tpNF = xmlDoc.querySelector("tpNF").textContent
      let tpNFTexto = ''
      if (tpNF == 0){
        tpNFTexto = 'Entrada'
      } else {
        tpNFTexto = 'Saída'
      }
      
      const idDest = xmlDoc.querySelector("idDest").textContent
      let idDestTexto = ''
      if(idDest == 1) {
        idDestTexto = 'Operação Interna'
      } else if (idDest == 2) {
        idDestTexto = 'Operação Interestadual'
      } else {
        idDestTexto = 'Operação com Exterior'
      }

      const tpImp =  xmlDoc.querySelector("tpImp").textContent
      let tpImpTexto = ''
      if(tpImp == 1) {
        tpImpTexto = 'DANFE normal, Retrato'
      } else if(tpImp == 2) {
        tpImpTexto = 'DANFE normal, Paisagem'
      } else if(tpImp == 3) {
        tpImpTexto = 'DANFE Simplificado'
      } else if(tpImp == 4) {
        tpImpTexto = 'DANFE NFC-e'
      } else {
        tpImpTexto = 'DANFE NFC-e em mensagem eletrônica'
      }
      
      const tpEmis = xmlDoc.querySelector("tpEmis").textContent
      let tpEmisTexto = ''
      if(tpEmis == 1){
        tpEmisTexto = 'Emissão normal (não em contingência)'
      } else if(tpEmis == 2){
        tpEmisTexto = 'Contingência FS-IA, com impressão do DANFE em Formulário de Segurança - Impressor Autônomo'
      } else if(tpEmis == 3){
        tpEmisTexto = 'Contingência SCAN (Sistema de Contingência do Ambiente Nacional); *Desativado  * NT 2015/002'
      } else if(tpEmis == 4){
        tpEmisTexto = 'Contingência EPEC (Evento Prévio da Emissão em Contingência)'
      } else if(tpEmis == 5){
        tpEmisTexto = 'Contingência FS-DA, com impressão do DANFE em Formulário de Segurança - Documento Auxiliar'
      } else if(tpEmis == 6){
        tpEmisTexto = 'Contingência SVC-AN (SEFAZ Virtual de Contingência do AN)'
      } else if(tpEmis == 7){
        tpEmisTexto = 'Contingência SVC-RS (SEFAZ Virtual de Contingência do RS)'
      } else {
        tpEmisTexto = 'Contingência off-line da NFC-e;'
      }

      const tpAmb = xmlDoc.querySelector("tpAmb").textContent
      let tpAmbTexto = ''
      if (tpAmb == 1){
        tpAmbTexto = 'Produção'
      } else {
        tpAmbTexto = 'Homologação'
      }
      
      const finNFe =  xmlDoc.querySelector("finNFe").textContent
      let finNFeTexto = ''
      if(finNFe == 1) {
        finNFeTexto = 'NF-e normal'
      } else if(finNFe == 2) {
        finNFeTexto = 'NF-e complementar'
      } else if(finNFe == 3) {
        finNFeTexto = 'NF-e de ajuste'
      } else {
        finNFeTexto = 'Devolução de mercadoria'
      }

      const indFinal = xmlDoc.querySelector("indFinal").textContent
      let indFinalTexto = ''
      if(indFinal == 0){
        indFinalTexto = 'Não é para consumidor final'
      } else {
        indFinalTexto = 'Para consumidor final'
      }
      
      const dadosNF = {
        mod: xmlDoc.querySelector("mod").textContent,
        serie: xmlDoc.querySelector("serie").textContent,
        nNF: xmlDoc.querySelector("nNF").textContent,
        dhEmi: this.converterData(xmlDoc.querySelector("dhEmi").textContent),
        dhSaiEnt: this.converterData(xmlDoc.querySelector("dhSaiEnt").textContent),
        tpNFTexto: tpNFTexto,
        idDestTexto: idDestTexto,
        cMunFG: xmlDoc.querySelector("cMunFG").textContent,
        tpImpTexto: tpImpTexto,
        tpEmisTexto: tpEmisTexto,
        tpAmbTexto: tpAmbTexto,
        finNFeTexto: finNFeTexto,
        indFinalTexto: indFinalTexto,
        
        chNFe: xmlDoc.querySelector("chNFe").textContent,
      }

      const xNomeEmit = xmlDoc.querySelector("emit > xNome").textContent
      const xFantEmit = xmlDoc.querySelector("emit > xFant").textContent
      const CNPJEmit = xmlDoc.querySelector("emit > CNPJ").textContent
      const ieEmit = xmlDoc.querySelector("emit > IE").textContent
      const xNomeDest = xmlDoc.querySelector("dest > xNome").textContent
      const CNPJDest = xmlDoc.querySelector("dest > CNPJ").textContent

      const data = {
        dadosNF,
        xNomeEmit,
        xFantEmit,
        CNPJEmit,
        ieEmit,
        xNomeDest,
        CNPJDest,
      };

      this.$emit("data-loaded", data);
    },
    converterData(dataString) {
      const partes = dataString.split(/[-T:]+/); // Divide a string com base em separadores comuns
      const ano = partes[0];
      const mes = partes[1];
      const dia = partes[2];
      // const hora = partes[3];
      // const minuto = partes[4];
      // const segundo = partes[5];

      // Formato desejado: DD/MM/YYYY HH:mm:ss
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
}

.btn:hover {
  background-color: #0056b3;
}
</style>
