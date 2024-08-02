<template>
    <div class="botao">
      <a class="btn" @click="triggerFileInput">Importar XML</a>
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
        this.activeTab === 0
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
  
        const chNFe = xmlDoc.querySelector("chNFe").textContent;
        const nNF = xmlDoc.querySelector("nNF").textContent;
        const dhEmi = xmlDoc.querySelector("dhEmi").textContent;
        const xNomeEmit = xmlDoc.querySelector("emit > xNome").textContent;
        const xFantEmit = xmlDoc.querySelector("emit > xFant").textContent;
        const CNPJEmit = xmlDoc.querySelector("emit > CNPJ").textContent;
        const ieEmit = xmlDoc.querySelector("emit > IE").textContent;
        const xNomeDest = xmlDoc.querySelector("dest > xNome").textContent;
        const CNPJDest = xmlDoc.querySelector("dest > CNPJ").textContent;
  
        const data = {
          chNFe, nNF, dhEmi, xNomeEmit, xFantEmit, CNPJEmit, ieEmit, xNomeDest, CNPJDest
        };
        
        this.$emit('data-loaded', data);
      }
    }
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
  