<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h4>Confirmação dos Dados</h4>
    <div class="w-100 h-100 p-1 d-flex flex-column flex-grow-1 overflow-scroll">
      <h5 class="bg-primary p-1">Curso</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Nome:</div>
        <div>{{ SelectedCourse.name }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Modalidade:</div>
        <div>{{ SelectedCourse.modality }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Tipo:</div>
        <div>{{ SelectedCourse.type }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Investimento:</div>
        <div>R${{ SelectedCourse.investmentvalue }},00</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Numero de Parcelas:</div>
        <div>{{ SelectedCourse.numberofinstallments }}</div>
      </div>
      <h5 class="bg-primary p-1">Dados Pessoais</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Nome:</div>
        <div>{{ formData.name }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Email:</div>
        <div>{{ formData.email }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Telefone:</div>
        <div>{{ formData.phone }}</div>
      </div>

      <h5 class="bg-primary p-1">Informações Adicionais</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Cidade:</div>
        <div>{{ formData.city }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Estado:</div>
        <div>{{ formData.state }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Cep:</div>
        <div>{{ formData.cep }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Cpf:</div>
        <div>{{ formData.cpf }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Data de Nascimento:</div>
        <div>{{ formData.birthday }}</div>
      </div>
      <h5 class="bg-primary p-1">Documentos</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Frente:</div>
        <p class="textImage">{{ formData.documentfrenteImage?.name }}</p>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Verso:</div>
        <p class="textImage">{{ formData.documentversoImage?.name }}</p>
      </div>
    </div>
    <div></div>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn  mt-auto align-self-start bg-transparent" @click="back()">
        Voltar
      </button>
      <button type="button" class="btn btn-primary mt-auto align-self-end" @click="confirma()">
        Confirmar
      </button>
    </div>

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
        city: "",
        state: "",
        cep: "",
        cpf: "",
        birthday: "",
        documentfrenteImage: null,
        documentversoImage: null
      },
    }
  },
  created() {
    this.formData.name = this.Matricula.name;
    this.formData.email = this.Matricula.email;
    this.formData.phone = this.Matricula.phone;
    this.formData.city = this.Matricula.city;
    this.formData.state = this.Matricula.state;
    this.formData.cep = this.Matricula.cep;
    this.formData.cpf = this.Matricula.cpf;
    this.formData.birthday = this.Matricula.birthday;
    this.formData.documentfrenteImage = this.Matricula.documentfrenteImage;
    this.formData.documentversoImage = this.Matricula.documentversoImage;
  },
  computed: {
    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ["Matricula"]),
    ...mapGetters("courses", ["SelectedCourse"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"]),
    ...mapActions("courses", ["LimparSelectCouse"]),
    ...mapActions("useMatricula", ["LimparMatricula"]),
    back() {
      this.SetStep(this.step - 1);
    },
    showModal() {
      this.modal.showModal();
    },
    async confirma() {

      try {
        // Criar um objeto FormData
        const formData = new FormData();
        // Adicionar campos ao FormData
        formData.append("idcourse", this.SelectedCourse.id);
        formData.append("name", this.Matricula.name);
        formData.append("email", this.Matricula.email);
        formData.append("phone", this.Matricula.phone);
        formData.append("city", this.Matricula.city);
        formData.append("state", this.Matricula.state);
        formData.append("cep", this.Matricula.cep);
        formData.append("cpf", this.Matricula.cpf);
        formData.append("birthday", this.Matricula.birthday);
        formData.append("files", this.Matricula.documentfrenteImage);
        formData.append("files", this.Matricula.documentversoImage);
        //SALVAR OSDADOS DO ACADEMICO
        const responseAcademic = await this.$axios.post(
          process.env.DIGITALMATRICULA_API_URL + "/matricula",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Certifique-se de configurar o cabeçalho correto
            },
          }
        );
        if (responseAcademic.data.success) {
          this.$toast.success('Sucesso, voce foi matriculado')
          this.LimparMatricula();
        } else {
          this.$toast.error(responseAcademic.data.message)

        }
      } catch (error) {
        this.$toast.error(error);

      }
      this.LimparSelectCouse();
      setTimeout(() => {

        this.$router.push('/');
      }, 3000);
    },
  },

};
</script>

<style lang="css" scoped>
.textImage {

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.56rem;
  max-width: 20rem;
}
</style>
