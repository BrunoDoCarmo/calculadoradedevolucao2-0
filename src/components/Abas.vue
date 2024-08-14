<template>
    <div class="tabs">
      <button
        v-for="(tab, index) in abas"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="changeTab(index)"
        v-html="tab"
      >
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AbaS',
    props: {
      abas: {
        type: Array,
        required: true
      },
      activeTab: {
        type: Number,
        required: true
      }
    },
    methods: {
      changeTab(index) {
        this.$emit('update:activeTab', index); // Emite evento para o pai
      }
    }
  };
  </script>
<style scoped>
.tabs {
  display: flex;
  height: 6rem;
}

.tabs button {
  flex: 1;
  background-color: #d4d4d4;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  margin: 0 .1rem;
  margin-top: .5rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.tabs button.active {
  box-shadow: 0 .1rem .5rem #000;
  background-color: rgb(255, 241, 241);
}

.tabs button.active:hover {
  background-color: rgb(255, 241, 241);
}
.tabs button:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .tabs {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .tabs button {
    box-shadow: 0 .1rem .5rem #000;
    margin: .5rem 0;
    border-radius: 1rem;
  }
}</style>
