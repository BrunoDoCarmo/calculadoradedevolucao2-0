<template>
  <div class="container">
    <h3>Nota Fiscal Eletronica (NF-e)</h3>
    <div class="modolos">
      <a @click.prevent="openVendaModal">
        <font-awesome-icon class="icon" :icon="['fas', 'dollar-sign']" />
        <span>Venda</span>
      </a>
      <a @click.prevent="openDevolucaoModal">
        <font-awesome-icon class="icon" :icon="['fas', 'hands-holding-child']" />
        <span>Devolução</span>
      </a>
    </div>
    
    <Modal :visible="isVendaModalVisible" title="Venda" @close="isVendaModalVisible = false">
      <NotaFiscalVenda />
    </Modal>
    <Modal :visible="isDevolucaoModalVisible" title="Devolução" @close="isDevolucaoModalVisible = false">
    <div class="modal-content">
      <p>Por qual método deseja iniciar a sua Nota Fiscal de Devolução Eletrônica (NFD-e)?</p>
      <div class="modal-actions">
        <a href="" class="modal-button">Buscar no banco de dados</a>
        <a href="" class="modal-button">Importar XML</a>
      </div>
    </div>
  </Modal>
  </div>
</template>

<script>
import NotaFiscalVenda from "@/components/NotaFiscalVenda.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "TipoNotaFiscal",
  props: {
    view: {
      type: String,
      required: true,
    },
  },
  components: {
    NotaFiscalVenda,
    Modal,
  },
  data() {
    return {
      currentView: "venda",
      isVendaModalVisible: false, // Estado para controlar a visibilidade do modal
      isDevolucaoModalVisible: false, // Estado para controlar a visibilidade do modal
    };
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    openVendaModal() {
      this.isVendaModalVisible = true;
    },
    openDevolucaoModal() {
      this.isDevolucaoModalVisible = true;
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 5rem);
  background: #f5f5f5;
}

h3 {
  text-transform: uppercase;
  position: absolute;
  top: 0;
  font-size: 3rem;
  color: #333;
}

.modolos {
  display: flex;
  width: 100%;
  gap: 2rem;
  padding: 0 2rem;
}

.modolos a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30vh;
  background: #007bff;
  color: white;
  border-radius: 1.5rem;
  text-decoration: none;
  transition: background 0.3s ease;
}

.modolos a:hover {
  background: #0056b3;
}

.icon {
  font-size: 7rem;
}

span {
  font-size: 3rem;
  font-weight: bold;
}

.modal-content {
  padding: 20px;
  text-align: center;
}

.modal-content p {
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.modal-button:hover {
  background-color: #0056b3;
}

.modal-button:active {
  background-color: #004085;
}
</style>