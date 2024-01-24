<template>
  <div class="w-100 h-100 d-flex flex-column">
    <h3>Dados Pessoais</h3>
    <form class="w-100 h-100 d-flex flex-column " @submit.prevent="() => {
      if (validateFields()) {
        SetStep(step + 1);
      }
    }">
      <div class="flex-grow-1">
        <div class="form-group">
          <label for="exampleInputEmail1">Nome</label>
          <input required type="text" class="form-control" id="name" v-model="formData.name" placeholder="e.g sthepen" />

        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Email</label>
          <input required type="email" class="form-control" id="email" v-model="formData.email"
            placeholder="sthepen@gmail.com" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Telefone</label>
          <input required type="text" class="form-control" id="telefone" v-model="formData.phone" @input="validatePhone()"
            placeholder="(44) 99900-0102" />
          <span class="register-first-error" v-if="!isPhoneValid">
            Por favor, insira um número de telefone válido.
          </span>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <button type="button" class="btn btn-primary mt-auto align-self-start bg-transparent" @click="SetStep(step)">
          Voltar
        </button>
        <button type="submit" class="btn btn-primary mt-auto align-self-end">
          Próxima Etapa
        </button>
      </div>
    </form>


  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {

  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
      },
      isPhoneValid: true,
    }
  },
  created() {

  },
  computed: {
    ...mapGetters("step", ['step'])
  },
  methods: {
    ...mapActions("step", ["SetStep"]),

    validateFields() {

      return false;
    },

    validatePhone() {
      // Expressão regular para validar o formato do telefone
      var regexTelefone = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
      this.isPhoneValid = regexTelefone.test(this.formData.phone);
    },
  },
};
</script>

<style lang="css" scoped></style>
