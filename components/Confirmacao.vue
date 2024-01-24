<template>
  <div class="w-100 h-100 d-flex flex-column">
    <h4>Confirmacao dos Dados</h4>
    <div class="w-100 h-100 p-1 d-flex flex-column  flex-grow-1 overflow-scroll">
      <h5 class="bg-primary">Curso</h5>
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
      <h5 class="bg-primary">Dados Pessoais</h5>
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

      <h5 class="bg-primary">Informações Adicionais</h5>
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
      <h5 class="bg-primary">Documentos</h5>
      <div class="d-flex flex-row justify-content-between">
        <div>Frente</div>
        <div>{{ Matricula.documentfrenteImage.name }}</div>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <div>Verso</div>
        <div>{{ Matricula.documentfrenteImage.name }}</div>
      </div>
    </div>
    <div></div>
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-primary mt-auto align-self-start bg-transparent" @click="back()">
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
  created() {

  },
  computed: {
    ...mapGetters("step", ["step"]),
    ...mapGetters("useMatricula", ['Matricula']),
    ...mapGetters("courses", ["SelectedCourse"]),
  },
  methods: {
    ...mapActions("step", ["SetStep"], 2),
    back() {
      this.SetStep(this.step - 1);
    },
    async confirma() {
      console.log(process.env.DIGITALMATRICULA_API_URL);
      try {
        const academic = {
          name: this.Matricula.name,
          email: this.Matricula.email,
          phone: this.Matricula.phone,
          city: this.Matricula.city,
          state: this.Matricula.state,
          cep: this.Matricula.cep,
          cpf: this.Matricula.cpf,
          birthdate: this.Matricula.birthday,
        };

        //SALVAR OSDADOS DO ACADEMICO
        const response = await this.$axios.post(process.env.DIGITALMATRICULA_API_URL + "/academic", academic);
        console.log('Resposta da API:', response);
        //SALVAR OSDADOS DO CURSO MATRICULADO (ID DO CURSO E ID DO ACADEMICO)
        //FAZER UPLOAD DAS IMAGENS 
        //SALVAR NO BANCO O ENDEREÇO DA IMAGEM
      } catch (error) {
        console.error('Erro ao fazer a solicitação para a API:', error);
      }

    }
  },

};
</script>

<style lang="css" scoped></style>
