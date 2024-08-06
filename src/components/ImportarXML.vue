<template>
  <a class="btn" @click="triggerFileInput">
    {{ fileImported ? "Importar Novo XML" : "Importar XML" }}
  </a>
  <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" accept=".xml" />
  <Modal 
    :visible="showErrorModal" 
    :title="'Erro'" 
    :errorMessage="errorMessage" 
    @close="closeErrorModal"
  />
  <!-- Modal para Alertas -->
  <Modal 
    :visible="showAlertModal" 
    :title="'Alerta'" 
    :alertMessage="alertMessage" 
    @close="closeAlertModal"
  />
  <!-- Botão para remover nota importada -->
  <button v-if="fileImported" @click="removeImportedNote" class="btn-remove">Remover Nota Importada</button>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "ImportarXML",
  components: {
    Modal,
  },
  data() {
    return {
      showErrorModal: false,
      showAlertModal: false,
      errorMessage: "",
      alertMessage: "",
      importedNotes: [],
      cnpj: null,
      fileImported: false,
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

          const chNFe = xmlDoc.querySelector("chNFe")?.textContent.trim();
          const cnpjElement = xmlDoc.querySelector("emit > CNPJ")?.textContent.trim();

          if (!chNFe || !cnpjElement) {
            this.errorMessage = "O arquivo XML não contém dados válidos.";
            this.showErrorModal = true;
            return;
          }

          if (this.cnpj && this.cnpj !== cnpjElement) {
            this.alertMessage = "O CNPJ do arquivo selecionado não coincide com o CNPJ do arquivo anterior.";
            this.showAlertModal = true;
            return;
          }

          if (this.importedNotes.includes(chNFe)) {
            this.alertMessage = "Essa nota já foi importada anteriormente.";
            this.showAlertModal = true;
            return;
          }

          this.importedNotes.push(chNFe);
          this.fileImported = true;
          this.cnpj = cnpjElement;

          this.processXML(xmlDoc);
        };
        reader.readAsText(file);
      }
    },
    removeImportedNote() {
      const lastChNFe = this.importedNotes.pop();
      if (this.importedNotes.length === 0) {
        this.fileImported = false;
        this.cnpj = null;
      }
      this.$emit("note-removed", lastChNFe);
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
    closeAlertModal() {
      this.showAlertModal = false;
    },
    processXML(xmlDoc) {
      const tpNF = xmlDoc.querySelector("tpNF")?.textContent;
      const tpNFTexto = tpNF === '0' ? 'Entrada' : 'Saída';

      const idDest = xmlDoc.querySelector("idDest")?.textContent;
      const idDestTexto = this.getIdDestTexto(idDest);

      const tpImp = xmlDoc.querySelector("tpImp")?.textContent;
      const tpImpTexto = this.getTpImpTexto(tpImp);

      const dadosNF = {
        mod: xmlDoc.querySelector("mod")?.textContent || '',
        serie: xmlDoc.querySelector("serie")?.textContent || '',
        nNF: xmlDoc.querySelector("nNF")?.textContent || '',
        dhEmi: this.converterData(xmlDoc.querySelector("dhEmi")?.textContent || ''),
        tpNFTexto,
        idDestTexto,
        cMunFG: xmlDoc.querySelector("cMunFG")?.textContent || '',
        tpImpTexto,
        tpEmisTexto: this.getTpEmisTexto(xmlDoc),
        tpAmbTexto: this.getTpAmbTexto(xmlDoc),
        finNFeTexto: this.getFinNFeTexto(xmlDoc),
        indFinalTexto: this.getIndFinalTexto(xmlDoc),
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

      const items = xmlDoc.getElementsByTagName("det");
      const newProducts = Array.from(items).map(item => {
        const cProd = item.querySelector("cProd")?.textContent.trim() || '';
        const xProd = item.querySelector("xProd")?.textContent.trim() || '';
        const qCom = parseFloat(item.querySelector("qCom")?.textContent.trim() || 0);
        const vUnCom = parseFloat(item.querySelector("vUnCom")?.textContent.trim() || 0);
        
        const vlrTotal = qCom * vUnCom;

        return {
          cProd,
          xProd,
          qCom,
          vUnCom: vUnCom.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'}),
          vlrTotal: vlrTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'})
        };
      });

      const data = {
        dadosNF,
        dadosEmitente,
        dadosDestinatario,
        produto: newProducts
      };

      this.$emit("data-loaded", data);
    },
    getIdDestTexto(idDest) {
      switch(idDest) {
        case '1': return 'Operação Interna';
        case '2': return 'Operação Interestadual';
        case '3': return 'Operação com Exterior';
        default: return 'Desconhecido';
      }
    },
    getTpImpTexto(tpImp) {
      switch(tpImp) {
        case '1': return 'DANFE normal, Retrato';
        case '2': return 'DANFE normal, Paisagem';
        case '3': return 'DANFE Simplificado';
        case '4': return 'DANFE NFC-e';
        case '5': return 'DANFE NFC-e em mensagem eletrônica';
        default: return 'Desconhecido';
      }
    },
    getTpEmisTexto(xmlDoc) {
      const tpEmis = xmlDoc.querySelector("tpEmis")?.textContent;
      switch(tpEmis) {
        case '1': return 'Emissão normal (não em contingência)';
        case '2': return 'Contingência FS-IA, com impressão do DANFE em Formulário de Segurança - Impressor Autônomo';
        case '3': return 'Contingência SCAN (Sistema de Contingência do Ambiente Nacional); *Desativado a partir de 29/04/2016*';
        case '4': return 'Contingência DPEC (Declaração Prévia da Emissão em Contingência)';
        case '5': return 'Contingência FS-DA, com impressão do DANFE em Formulário de Segurança - Documento Auxiliar';
        case '6': return 'Contingência SVC-AN (SEFAZ Virtual de Contingência do AN)';
        case '7': return 'Contingência SVC-RS (SEFAZ Virtual de Contingência do RS)';
        case '9': return 'Contingência off-line da NFC-e (as demais opções de contingência são válidas também para a NFC-e)';
        default: return 'Desconhecido';
      }
    },
    getTpAmbTexto(xmlDoc) {
      const tpAmb = xmlDoc.querySelector("tpAmb")?.textContent;
      switch(tpAmb) {
        case '1': return 'Produção';
        case '2': return 'Homologação';
        default: return 'Desconhecido';
      }
    },
    getFinNFeTexto(xmlDoc) {
      const finNFe = xmlDoc.querySelector("finNFe")?.textContent;
      switch(finNFe) {
        case '1': return 'NFe normal';
        case '2': return 'NFe complementar';
        case '3': return 'NFe de ajuste';
        case '4': return 'Devolução de mercadoria';
        default: return 'Desconhecido';
      }
    },
    getIndFinalTexto(xmlDoc) {
      const indFinal = xmlDoc.querySelector("indFinal")?.textContent;
      switch(indFinal) {
        case '0': return 'Normal';
        case '1': return 'Consumidor final';
        default: return 'Desconhecido';
      }
    },
    converterData(dhEmi) {
      if (!dhEmi) return '';
      const [data, hora] = dhEmi.split('T');
      const [ano, mes, dia] = data.split('-');
      const [horaPart, minutoPart] = hora.split(':');
      return `${dia}/${mes}/${ano} ${horaPart}:${minutoPart}`;
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
  padding: 0.8rem 0.5rem;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-remove {
  border-color: var(--black);
  background-color: #dc3545;
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem 0.5rem;
}

.btn-remove:hover {
  background-color: #c82333;
}
</style>
