<template>
  <a class="btn" @click="triggerFileInput">Importar XML</a>
  <input
    type="file"
    ref="fileInput"
    @change="handleFileUpload"
    style="display: none"
    accept=".xml"
  />
  <Modal
    v-if="showErrorModal"
    :visible="showErrorModal"
    :title="'Erro'"
    :errorMessage="errorMessage"
    @close="closeModal"
  />
  <Modal
    v-if="showAlertModal"
    :visible="showAlertModal"
    :title="'Alerta'"
    :alertMessage="alertMessage"
    @close="closeModal"
  />
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "ImportarXML",
  components: {
    Modal,
  },
  emits: ["data-loaded"],
  data() {
    return {
      showErrorModal: false,
      showAlertModal: false,
      errorMessage: "",
      alertMessage: "",
      cnpj: null,
      importedKeys: [],
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
          try {
            this.processXML(e.target.result);
          } catch (error) {
            this.displayMessage("Erro ao processar o arquivo XML.");
            console.error(error);
          }
        };
        reader.readAsText(file);
      }
    },
    processXML(xmlText) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      const cnpjElement = xmlDoc
        .querySelector("emit > CNPJ")
        ?.textContent.trim();
      const chNFe = xmlDoc.querySelector("chNFe")?.textContent.trim();

      // Verifica se a chave da nota já foi importada
      if (this.importedKeys.includes(chNFe)) {
        this.displayMessage("Essa nota fiscal já foi importada.", false);
        return;
      }

      if (this.cnpj && this.cnpj !== cnpjElement) {
        this.displayMessage(
          "O CNPJ do arquivo selecionado não coincide com o CNPJ do arquivo anterior.",
          false
        );
        return;
      }

      this.cnpj = cnpjElement;

      // Armazena a chave da nota importada
      this.importedKeys.push(chNFe);

      this.emitProcessedData(xmlDoc);
    },
    emitProcessedData(xmlDoc) {
      const data = {
        dadosEmitente: this.extractDadosEmitente(xmlDoc),
        dadosDestinatario: this.extractDadosDestinatario(xmlDoc),
        notasReferenciadas: this.extractNotasReferenciadas(xmlDoc),
        produtosNota: this.extractProdutos(xmlDoc),
      };

      this.$emit("data-loaded", data);
    },
    extractNotasReferenciadas(xmlDoc) {
      const notasReferenciadas = [];
      const refElements = xmlDoc.querySelectorAll("chNFe"); // Certifique-se de que 'refNFe' é o nome correto da tag de referência

      refElements.forEach((ref) => {
        const chNFe = ref.textContent.trim();
        const notaReferenciada = {
          chNFe: chNFe,
          nNF: xmlDoc.querySelector(`nNF`)?.textContent || "",
          dhEmi: this.converterData(
            xmlDoc.querySelector(`dhEmi`)?.textContent || ""
          ),
        };

        notasReferenciadas.push(notaReferenciada);
      });

      return notasReferenciadas;
    },
    extractDadosEmitente(xmlDoc) {
      return {
        CNPJ: xmlDoc.querySelector("emit > CNPJ")?.textContent || "",
        xNome: xmlDoc.querySelector("emit > xNome")?.textContent || "",
        xLgr:
          xmlDoc.querySelector("emit > enderEmit > xLgr")?.textContent || "",
        nro: xmlDoc.querySelector("emit > enderEmit > nro")?.textContent || "",
        xBairro:
          xmlDoc.querySelector("emit > enderEmit > xBairro")?.textContent || "",
        cMun:
          xmlDoc.querySelector("emit > enderEmit > cMun")?.textContent || "",
        xMun:
          xmlDoc.querySelector("emit > enderEmit > xMun")?.textContent || "",
        UF: xmlDoc.querySelector("emit > enderEmit > UF")?.textContent || "",
        CEP: xmlDoc.querySelector("emit > enderEmit > CEP")?.textContent || "",
        IE: xmlDoc.querySelector("emit > IE")?.textContent || "",
      };
    },
    extractDadosDestinatario(xmlDoc) {
      return {
        CNPJ: xmlDoc.querySelector("dest > CNPJ")?.textContent || "",
        xNome: xmlDoc.querySelector("dest > xNome")?.textContent || "",
        xLgr:
          xmlDoc.querySelector("dest > enderDest > xLgr")?.textContent || "",
        nro: xmlDoc.querySelector("dest > enderDest > nro")?.textContent || "",
        xBairro:
          xmlDoc.querySelector("dest > enderDest > xBairro")?.textContent || "",
        cMun:
          xmlDoc.querySelector("dest > enderDest > cMun")?.textContent || "",
        xMun:
          xmlDoc.querySelector("dest > enderDest > xMun")?.textContent || "",
        UF: xmlDoc.querySelector("dest > enderDest > UF")?.textContent || "",
        CEP: xmlDoc.querySelector("dest > enderDest > CEP")?.textContent || "",
        indIEDest: xmlDoc.querySelector("dest > indIEDest")?.textContent || "",
        IE: xmlDoc.querySelector("dest > IE")?.textContent || "",
      };
    },
    extractProdutos(xmlDoc) {
      const items = xmlDoc.getElementsByTagName("det");
      return Array.from(items).map((item) => {
        const cProd = item.querySelector("cProd")?.textContent.trim() || "";
        const xProd = item.querySelector("xProd")?.textContent.trim() || "";
        const qCom = parseFloat(
          item.querySelector("qCom")?.textContent.trim() || 0
        );
        const vUnCom = parseFloat(
          item.querySelector("vUnCom")?.textContent.trim() || 0
        );

        const vlrTotal = qCom * vUnCom;

        return {
          cProd,
          xProd,
          qCom,
          vUnCom: vUnCom.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
          vlrTotal: vlrTotal.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          }),
        };
      });
    },
    converterData(dhEmi) {
      if (!dhEmi) return "";
      const [data] = dhEmi.split("T");
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    },
    closeModal() {
      this.showErrorModal = false;
      this.showAlertModal = false;
    },
    displayMessage(message, isError = true) {
      if (isError) {
        this.errorMessage = message;
        this.showErrorModal = true;
      } else {
        this.alertMessage = message;
        this.showAlertModal = true;
      }
    },
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
