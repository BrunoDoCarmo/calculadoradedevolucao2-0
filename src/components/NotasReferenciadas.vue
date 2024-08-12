<template>
  <div>
    <table v-if="notasFiscais && notasFiscais.length">
      <thead>
        <tr>
          <th>Nro N.F.</th>
          <th>Chave de Acesso</th>
          <th>Data Emissão</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nota, index) in notasFiscais" :key="index">
          <td>{{ nota.nNF }}</td>
          <td>{{ nota.chNFe }}</td>
          <td>{{ nota.dhEmi }}</td>
          <td>
            <button class="btn" @click="confirmDelete(nota.chNFe)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Nenhuma nota fiscal referenciada disponível.</p>
  </div>
</template>

<script>
export default {
  name: "NotasReferenciadas",
  props: {
    notasReferenciadas: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      notasFiscais: [],
    };
  },
  watch: {
    notasReferenciadas: {
      immediate: true,
      handler(newNotas) {
        this.notasFiscais = Array.isArray(newNotas) ? newNotas : [newNotas];
      },
    },
  },
  methods: {
    confirmDelete(chNFe) {
      console.log(`Excluir nota com chave de acesso: ${chNFe}`);
      this.notasFiscais = this.notasFiscais.filter(nota => nota.chNFe !== chNFe);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #007bff;
  color: white;
  text-align: center;
}

th, td {
  text-transform: uppercase;
  padding: 1.2rem 1.5rem;
  border: .1rem solid #000;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

td .btn {
  background-color: #dc3545;
  color: white;
  font-size: 1.5rem;
}

td .btn:hover {
  background-color: #c82333;
}

td .btn:focus {
  outline: none;
}
</style>
