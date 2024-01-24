<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div class="container p-3 flex-grow-1">
      <h5 class="bg-primary">Dados Pessoais</h5>
      <div>blabla</div>
      <div>blabla</div>
      <div>blabla</div>
      <h5 class="bg-primary">Informações Adicionais</h5>
      <div>blabla</div>
      <div>blabla</div>
      <div>blabla</div>
      <h5 class="bg-primary">Documentos</h5>
      <div>blabla</div>
      <div>blabla</div>
      <div>blabla</div>
    </div>
    <div></div>
    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-primary mt-auto align-self-start bg-transparent"
        @click="SetStep(step - 1)"
      >
        Voltar
      </button>
      <button
        type="submit"
        class="btn btn-primary mt-auto align-self-end"
        @click="confirma"
      >
        Confirmar
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("step", ["step"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"], 2),
  },
};
</script>

<style lang="css" scoped>
</style>
