<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h3>Dados Pessoais</h3>
    <form class=" h-100 d-flex flex-column " @submit.prevent="OnChangeSubmit()">
      <div class="flex-grow-1">
        <div class="form-group">
          <label for="exampleInputEmail1">Nome</label>
          <input required type="text" class="form-control" id="name" v-model="formData.name" placeholder="e.g sthepen" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Email</label>
          <input ref="inputEmail" required type="email" class="form-control" id="email" v-model="formData.email"
            @input="validateEmailRegex()" @blur="validateEmail" placeholder="sthepen@gmail.com" />
          <span class="alerterror register-first-error" v-if="!IsEmailValid">
            Por favor, insira um Email válido.
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Telefone</label>
          <input required type="text" class="form-control" id="telefone" v-mask="'(##)#####-####'"
            v-model="formData.phone" @input="validatePhone()" placeholder="(44) 99900-0102" />
          <span class="alerterror register-first-error" v-if="!isPhoneValid">
            Por favor, insira um número de telefone válido.
          </span>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <button type="button" class="btn mt-auto align-self-start bg-transparent" @click="back()">
          Voltar
        </button>
        <button type="submit" class="buttonprimary btn mt-auto align-self-end">
          Próxima Etapa
        </button>
      </div>


    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
      },
      isPhoneValid: true,
      IsEmailValid: true,
      AcademicExist: false
    }
  },
  created() {

    this.formData.name = this.Matricula.name;
    this.formData.email = this.Matricula.email;
    this.formData.phone = this.Matricula.phone;

  },
  computed: {
    ...mapGetters("step", ['step']),
    ...mapGetters("useMatricula", ['Matricula'])
  },
  methods: {
    ...mapActions("step", ["SetStep"]),

    async OnChangeSubmit() {

      try {
        let IsPostOrPut = false;
        if (!this.AcademicExist) {
          const responsePost = await this.$axios.post(process.env.DIGITALMATRICULA_API_URL + '/enrollment', this.formData);
          if (responsePost.data) {
            IsPostOrPut = true;
          }
        } else {
          const responsePost = await this.$axios.put(process.env.DIGITALMATRICULA_API_URL + `/enrollment/${this.Matricula.id}`, this.formData);
          if (responsePost.data) {
            IsPostOrPut = true;
          }
        }
        if (IsPostOrPut) {
          this.$store.dispatch('useMatricula/setName', this.formData.name);
          this.$store.dispatch('useMatricula/setEmail', this.formData.email);
          this.$store.dispatch('useMatricula/setPhone', this.formData.phone);
          this.SetStep(this.step + 1);
        }
      } catch (error) {
        console.error(error.response, "erer")
      }


      /*
      this.$store.dispatch('useMatricula/setName', this.formData.name);
      this.$store.dispatch('useMatricula/setEmail', this.formData.email);
      this.$store.dispatch('useMatricula/setPhone', this.formData.phone);
      this.SetStep(this.step + 1);
      */
    },

    validatePhone() {
      // Expressão regular para validar o formato do telefone
      var regexTelefone = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/;
      this.isPhoneValid = regexTelefone.test(this.formData.phone);
    },
    validateEmailRegex() {
      var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      this.IsEmailValid = regexEmail.test(this.formData.email);
    },
    async validateEmail() {
      try {
        const response = await this.$axios.get(
          process.env.DIGITALMATRICULA_API_URL + `/enrollment/email/${this.formData.email}`);
        this.$store.dispatch("useMatricula/setId", response.data.id);
        this.AcademicExist = response.data ? true : false;
      } catch (error) {
        this.AcademicExist = false;
      }
    },
    back() {
      this.$router.push('/')
    }
  },
};
</script>

<style lang="css" scoped></style>
