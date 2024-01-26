<template>
  <div class="p-4 d-flex flex-column flex-grow-1">
    <h4>Confirmacao dos Dados</h4>
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
        <div>{{ Matricula.name }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Email:</div>
        <div>{{ Matricula.email }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Telefone:</div>
        <div>{{ Matricula.phone }}</div>
      </div>

      <h5 class="bg-primary p-1">Informações Adicionais</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Cidade:</div>
        <div>{{ Matricula.city }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Estado:</div>
        <div>{{ Matricula.state }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Cep:</div>
        <div>{{ Matricula.cep }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Cpf:</div>
        <div>{{ Matricula.cpf }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Data de Nascimento:</div>
        <div>{{ Matricula.birthday }}</div>
      </div>
      <h5 class="bg-primary p-1">Documentos</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Frente</div>
        <div>{{ Matricula.documentfrenteImage.name }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Verso</div>
        <div>{{ Matricula.documentversoImage.name }}</div>
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

    }
  },
  created() {

  },
  computed: {
    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ["Matricula"]),
    ...mapGetters("courses", ["SelectedCourse"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"], 2),
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
          this.$toast.success('Successfully authenticated')

          setTimeout(() => {

    this.$router.push('/');
  }, 3000);

        } else {
          this.$toast.error(responseAcademic.data.message)
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },

};
</script>

<style lang="css" scoped></style>
