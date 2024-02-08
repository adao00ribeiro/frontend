<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h3>Informações Adicionais</h3>
    <form class="w-100 h-100 d-flex flex-column" @submit.prevent="OnChangeSubmit()">
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
            placeholder="00000-000" @blur="ConsultarCep" autocomplete="off" />
          <span class="alerterror register-first-error" v-if="!IsCepValid">
            Por favor, insira um CEP válido.
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">CPF</label>
          <input required type="text" class="form-control" id="cpf" v-mask="'###.###.###-##'" v-model="formData.cpf"
            placeholder="000.000.000-00" @blur="ConsultarCpf" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Data de Nascimento</label>
          <input required type="date" class="form-control" id="birthday" v-model="formData.birthday"
            placeholder="01/01/1990" />
        </div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <!-- 
          <button type="button" class="btn mt-auto align-self-start bg-transparent" @click="back()">
            Voltar
          </button>
          -->
        <button type="submit" class="btn btn-primary mt-auto align-self-end">
          Próxima Etapa
        </button>
      </div>
    </form>
  </div>
</template>

<script >
import { mapActions, mapGetters } from "vuex";
import { mask } from "vue-the-mask";
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
      IsCepValid: true,
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
  },
  computed: {
    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ["Matricula"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"]),
    async OnChangeSubmit() {
      try {
        const data = { ...this.formData, enrollmentId: this.Matricula.id };
        let IsPostOrPut = false;

        if (!this.IsCpfValid) {
          const response = await this.$axios.post(
            process.env.DIGITALMATRICULA_API_URL + `/personaldata`,
            data
          );
          if (response.data) {
            IsPostOrPut = true;
          }
        } else {
          const responsePost = await this.$axios.put(
            process.env.DIGITALMATRICULA_API_URL +
            `/personaldata/${this.formData.cpf}`,
            data
          );

          if (responsePost.data) {
            IsPostOrPut = true;
          }
        }

        this.$store.dispatch("useMatricula/setCity", this.formData.city);
        this.$store.dispatch("useMatricula/setState", this.formData.state);
        this.$store.dispatch("useMatricula/setCep", this.formData.cep);
        this.$store.dispatch("useMatricula/setCpf", this.formData.cpf);
        this.$store.dispatch(
          "useMatricula/setBirthday",
          this.formData.birthday
        );
        this.SetStep(this.step + 1);
      } catch (error) {
        console.log(error.response);
      }

      // this.SetStep(this.step + 1);
    },
    async ConsultarCep() {
      try {
        const cepData = await this.$axios.$get(
          `https://opencep.com/v1/${this.formData.cep.replace("-", "")}`
        );
        if (cepData) {
          this.IsCepValid = true;
        }
      } catch (error) {
        this.IsCepValid = false;
      }
    },
    async ConsultarCpf() {
      try {
        const response = await this.$axios.get(
          process.env.DIGITALMATRICULA_API_URL +
          `/personaldata/cpf/${this.formData.cpf}`
        );
        this.IsCpfValid = true;
      } catch (error) {
        this.IsCpfValid = false;
      }
    },
    convertBirthDay() {
      const [year, month, day] = this.formData.birthday.split("-");
      return `${year}-${month}-${day}T00:00:00Z`;
    },
    back() {
      this.SetStep(this.step - 1);
    },
  },
};
</script>
<style lang="css" scoped></style>
