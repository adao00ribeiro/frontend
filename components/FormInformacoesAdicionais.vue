<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h3>Informações Adicionais</h3>
    <form class="w-100 h-100 d-flex flex-column" @submit.prevent="validateFields()">
      <div class="flex-grow-1">
        <div class="row mb-2">
          <div class="col">
            <label for="exampleInputEmail1">Cidade</label>
            <input required type="text" class="form-control" id="city" v-model="formData.city" aria-describedby="city"
              placeholder="e.g sthepen" />
          </div>
          <div class="col">
            <label for="exampleInputEmail1">Estado</label>
            <input required type="text" class="form-control" id="state" v-model="formData.state" aria-describedby="state"
              placeholder="e.g sthepen" />
          </div>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">CEP</label>
          <input required type="text" class="form-control" id="cep" v-mask="'#####-###'" v-model="formData.cep"
            placeholder="00000-000" />

        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">CPF</label>
          <input required type="text" class="form-control" id="cpf" v-mask="'###.###.###-##'" v-model="formData.cpf"
            placeholder="000.000.000-00" />
          <span class="alerterror register-first-error" v-if="!IsCpfValid">
            Por favor, insira um CPF válido.
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Data de Nascimento</label>
          <input required type="date" class="form-control" id="birthday" v-model="formData.birthday"
            placeholder="01/01/1990" />
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <button type="button" class="btn  mt-auto align-self-start bg-transparent" @click="back()">
          Voltar
        </button>
        <button type="submit" class="btn btn-primary mt-auto align-self-end">
          Próxima Etapa
        </button>
      </div>
    </form>
  </div>
</template>

<script >
import { mapActions, mapGetters } from "vuex";
import { mask } from 'vue-the-mask'
export default {

  directives: { mask },

  data() {
    return {
      formData: {
        city: "",
        state: "",
        cep: "",
        cpf: "",
        birthday: "",
      },
      IsCpfValid: true,
      States: [],
    };
  },
  async asyncData({ store }) {
    await store.dispatch("useStates/GetStatesAsync");
  },
  created() {
    this.States = this.$store.getters["useStates/liststates"];
    this.formData.city = this.Matricula.city;
    this.formData.state = this.Matricula.state;
    this.formData.cep = this.Matricula.cep;
    this.formData.cpf = this.Matricula.cpf;
    this.formData.birthday = this.Matricula.birthday;
    console.log(this.formData.birthday)
  },
  computed: {

    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ["Matricula"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"]),
    async validateFields() {

      if (this.IsCpfValid && this.formData.birthday !== "" && await this.validateCep()) {
        this.$store.dispatch("useMatricula/setCity", this.formData.city);
        this.$store.dispatch("useMatricula/setState", this.formData.state);
        this.$store.dispatch("useMatricula/setCep", this.formData.cep);
        this.$store.dispatch("useMatricula/setCpf", this.formData.cpf);
        this.$store.dispatch("useMatricula/setBirthday", this.formData.birthday);
        this.SetStep(this.step + 1);
      }
    }, back() {
      this.SetStep(this.step - 1);
    },
    async validateCep() {
      try {
        const cepData = await this.$axios.$get(`https://opencep.com/v1/${this.formData.cep.replace('-', '')}`);

        if (cepData) {
          return true;
        }
      } catch (error) {
        console.error(error);
        return false
      }

    },
    convertBirthDay() {
      const [year, month, day] = this.formData.birthday.split("-");
      return `${year}-${month}-${day}T00:00:00Z`;
    },
  },
};
</script>
<style lang="css" scoped></style>
