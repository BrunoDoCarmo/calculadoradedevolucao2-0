<template>
    <div>
        <a href="">
            Nota Fiscal Eletronica (NF-e)
            <span>Venda</span>
        </a>
        <a href="?devolucao">Nota Fiscal Eletrônica (NF-e)
            <span>Devolução</span>
        </a>
    </div>

    <div v-if="view === 'devolucao'">
        <NotaFiscalDevolucao />
    </div>
</template>
<script>
import NotaFiscalDevolucao from '@/components/NotaFiscalDevolucao.vue';

export default {
  name: 'TipoNotaFiscal',
  props: {
    view: {
      type: String,
      required: true
    }
  },
  components: {
    NotaFiscalDevolucao,
  },
  data() {
    return {
      currentView: 'venda', // Define a visualização inicial
    };
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
  },
};
</script>