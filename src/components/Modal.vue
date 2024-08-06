<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="close">×</button>
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
    errorMessage: String,
    alertMessage: String,
  },
  methods: {
    close() {
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 50%;
  max-width: 80%;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
}
.close-button {
  background: none;
  border: none;
  font-size: 4rem;
  cursor: pointer;
}
.alert {
  padding: 15px;
  border-radius: 0.25rem;
  margin-top: 1rem;
}

.alert-danger {
  background-color: #f44336;
  color: white;
  font-size: 2rem;
}

.alert-warning {
  background-color: #ff9800;
  color: white;
  font-size: 2rem;
}
</style>
