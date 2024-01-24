<template>
  <div class="w-100 h-100 d-flex flex-column">
    <h3>Dados Pessoais</h3>
    <form class="flex-grow-1">
      <div class="form-group">
        <label for="exampleInputEmail1">Nome</label>
        <input
          type="Nome"
          class="form-control"
          id="name"
          aria-describedby="emailHelp"
          placeholder="e.g sthepen"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="sthepen@gmail.com"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Telefone</label>
        <input
          type="password"
          class="form-control"
          id="telefone"
          placeholder="999009922"
        />
      </div>
    </form>

    <div class="d-flex justify-content-between">
      <button
        type="button"
        class="btn btn-primary mt-auto align-self-start bg-transparent"
        @click="SetStep(step )"
      >
        Voltar
      </button>
      <button
        type="submit"
        class="btn btn-primary mt-auto align-self-end"
        @click="SetStep(step + 1)"
      >
        Próxima Etapa
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
    ...mapActions("step", ["SetStep"]),
  },
};
</script>

<style lang="css" scoped></style>
