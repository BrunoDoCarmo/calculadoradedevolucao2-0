<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      <div class="modal-body">
        <slot></slot>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <div v-if="alertMessage" class="alert alert-warning">
          {{ alertMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModaL',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    errorMessage: {
      type: String,
      required: false, // Mude para false se você quiser que seja opcional
      default: '' // Você pode definir um valor padrão
    },
    alertMessage: {
      type: String,
      required: false, // Mude para false se você quiser que seja opcional
      default: '' // Você pode definir um valor padrão
    }
  },
  data() {
    return {
      selectedNota: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que o modal fique acima de outros elementos */
}

.modal {
  background: white;
  padding: 1rem 2rem; /* Aumenta o padding para uma margem interna maior */
  border-radius: 0.5rem; /* Bordas arredondadas */
  min-width: 30%; /* Ajusta o tamanho mínimo do modal */
  max-width: 50%; /* Limita o tamanho máximo do modal */
  max-height: 50%; /* Limita o tamanho máximo do modal */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Adiciona uma sombra ao redor do modal */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  text-align: center;
  width: 100%;
  font-size: 2.5rem;
  color: #333; /* Cor do título */
}

.close-button {
  background: none;
  border: none;
  font-size: 4rem;
  color: #333; /* Cor do botão fechar */
  cursor: pointer;
}

.modal-body {
  font-size: 1.6rem;
  color: #555; /* Cor do texto do corpo */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem; /* Espaço entre os botões */
}

.alert {
  padding: 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  font-size: 1.4rem;
}

.alert-danger {
  background-color: #f44336;
  color: white;
}

.alert-warning {
  background-color: #ff9800;
  color: white;
}
</style>
