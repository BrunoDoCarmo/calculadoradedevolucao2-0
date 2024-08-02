<template>
  <div>
      <TipoNotaFiscal :view="view"/>
  </div>
</template>
<script>
import TipoNotaFiscal from "@/components/TipoNotaFiscal.vue";

export default {
  name: 'NotaFiscalView',
  components: {
    TipoNotaFiscal
  },
  computed: {
    view() {
      // Se o parâmetro `devolucao` estiver presente, definir a visualização para devolução
      return this.$route.query.devolucao ? 'devolucao' : 'venda';
    }
  }
}
</script>
<style scoped>
    
</style>